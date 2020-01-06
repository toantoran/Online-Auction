const db = require("../utils/db");
const fs = require("fs-extra");

module.exports = {
	getAllBidder: () =>
		db.load(`select * from users where isSeller = 0 and isAdmin = 0`),
	getAllSeller: () => db.load(`select * from users where isSeller = 1`),
	getAllRegis: () => db.load(`select * from users where sellRegis = 1`),
	getAllAdmin: () => db.load(`select * from users where isAdmin = 1`),
	getUserByEmail: email =>
		db.load(`select * from users where email = '${email}'`),
	getUserById: id => db.load(`select * from users where userID = '${id}'`),
	getNameById: async id => {
		const rows = await db.load(`select * from users where userID = '${id}'`);
		return rows[0].name;
	},
	newUser: user => db.add("users", user),
	editUser: entity => {
		const condition = {
			userID: entity.userID
		};
		delete entity.userID;
		return db.patch("users", entity, condition);
	},

	addUserEvaluation: entity => db.add("user_evaluation", entity),
	getPointEvaluation: async userID => {
		let rows = await db.load(
			`select count(*) as good from user_evaluation where receiver = ${userID} and isGood = 1`
		);
		const countGood = rows[0].good;
		rows = await db.load(
			`select count(*) as sum from user_evaluation where receiver = ${userID}`
		);
		const countSum = rows[0].sum;
		if (countSum == 0) return 0;
		const countBad = countSum - countGood;
		if (countBad - countGood > 0)
			return ((countBad - countGood) * 100) / countSum;
		return (countGood * 100) / countSum;
	},
	getEvaluationById: userID =>
		db.load(
			`select * from user_evaluation where receiver = ${userID} order by time desc`
		),
	checkExitsEvaluation: async (sender, receiver, productID) => {
		const rows = await db.load(`select * from user_evaluation where sender = ${sender} 
        and receiver = ${receiver} and productID = "${productID}"`);
		if (rows.length > 0) return true;
		return false;
	},
	registerSeller: id =>
		db.load(`update users set sellRegis = 1 where userID = '${id}'`),
	upgradeUser: id =>
		db.load(
			`update users set isSeller = 1, sellRegis = 0 where userID = '${id}'`
		),
	changePassword: (id, newPass) =>
		db.load(`update users set password = "${newPass}" where userID = '${id}'`),
	downgradeUser: id =>
		db.load(`update users set isSeller = 0 where userID = '${id}'`),
	refuseUser: id =>
		db.load(
			`update users set isSeller = 0, sellRegis = 0 where userID = '${id}'`
		),
	deleteUser: async id => {
		console.log("vao day" + id);
		await Promise.all([
			db.load(
				`delete from user_evaluation where sender = '${id}' or receiver = '${id}'`
			),
			db.del("product_ban_bid", {
				bidderID: id
			}),
			db.del("product_bid", {
				bidderID: id
			}),
			db.del("wish_list", {
				userID: id
			})
		]);

		const rows = await db.load(
			`select * from product_single where seller = '${id}'`
		);
		for (const product of rows) {
			await Promise.all([
				db.del("wish_list", {
					productID: product.productID
				}),
				db.del("product_img", {
					productID: product.productID
				}),
				db.del("product_bid", {
					productID: product.productID
				}),
				db.del("product_description", {
					productID: product.productID
				}),
				db.del("product_ban_bid", {
					productID: product.productID
				}),
				db.del("user_evaluation", {
					productID: product.productID
				})
			]);
			await db.del("product_single", {
				productID: product.productID
			});

			const dir = `./public/img/product/${product.productID}`;
			fs.exists(dir, exist => {
				if (exist) {
					fs.remove(dir, error => {
						if (error) console.log(error.message);
					});
				}
			});
		}

		await db.del("users", {
			userID: id
		});
	}
};
