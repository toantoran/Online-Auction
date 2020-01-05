const express = require("express");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const cateModel = require("../models/category.model");
const checkUser = require("../middlewares/user.mdw");
const moment = require("moment");
const config = require("../config/default.json");
const querystring = require("querystring");
const upload = require("../middlewares/uploadSubCateImg.mdw");
const fs = require("fs-extra");
const router = express.Router();

//Require

router.get("/category", async (req, res) => {
	res.render("vwAdmin/category", {
		title: "Quản lý danh mục",
		user: req.user,
		notShowBreadcumb: true,
		message: req.query.message,
		status: req.query.status
	});

	req.session.lastUrl = req.originalUrl;
});

router.get("/getSubcateTable/:cateID", async (req, res) => {
	const rs = Array.from(res.locals.lcCateList).find(
		a => a.cateID === parseInt(req.params.cateID)
	);
	const data = rs.subCate;
	const cateName = rs.cateName;
	for (let sub of data) {
		sub.productsCount = await productModel.countBySubCat(
			sub.cateID,
			sub.subcateID
		);
		sub.button = `<a href='/admin/category-sub-detail/${sub.cateID}/${sub.subcateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>
        <button type='button' cateID='${sub.cateID}' subcateID='${sub.subcateID}' cateName='${cateName}' subcateName='${sub.subcateName}' class='primary-btn delete-subcate-btn' onclick='deleteSubcate(event)'><i class='fas fa-trash-alt'></i></button>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.get("/getCateTable", (req, res) => {
	const data = res.locals.lcCateList;
	for (let sub of data) {
		sub.cateIcon = `<i class='fas fa-${sub.cateIcon}'></i> : ${sub.cateIcon}`;
		sub.button = `<a href='/admin/category-detail/${sub.cateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>
        <button type='button' cateID='${sub.cateID}' cateName='${sub.cateName}' class='primary-btn delete-cate-btn' onclick='deleteCate(event)'><i class='fas fa-trash-alt'></i></button>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.post("/category/delete/:cateID", async (req, res) => {
	const cateID = req.params.cateID;
	const rows = await productModel.allByCate(cateID);
	const check = rows.length > 0;
	if (check) {
		res.json("0");
	} else {
		try {
			await cateModel.deleteCateByID(cateID);
			const cateList = await cateModel.getCate();
			for (cate of cateList) {
				cate.subCate = await cateModel.getSubCate(cate.cateID);
			}
			res.locals.lcCateList = cateList;
			res.json("1");
		} catch (e) {
			console.log(e);
			res.json("-1");
		}
	}
});

router.post("/category/sub/delete/:cateID/:subcateID", async (req, res) => {
	const cateID = req.params.cateID;
	const subcateID = req.params.subcateID;
	const rows = await productModel.allBySubCate(cateID, subcateID);
	const check = rows.length > 0;
	if (check) {
		res.json("0");
	} else {
		try {
			await cateModel.deleteSubCateByID(cateID, subcateID);
			const dir = `./public/img/subcate/${cateID}-${subcateID}.jpg`;
			fs.exists(dir, exist => {
				if (exist) {
					fs.remove(dir, error => {
						if (error) console.log(error.message);
					});
				}
			});
			const cateList = await cateModel.getCate();
			for (cate of cateList) {
				cate.subCate = await cateModel.getSubCate(cate.cateID);
			}
			res.locals.lcCateList = cateList;
			res.json("1");
		} catch (e) {
			console.log(e);
			res.json("-1");
		}
	}
});

router.post("/category/edit/:cateID", async (req, res) => {
	const cateID = req.params.cateID;
	const cateName = req.body.cateName;
	const cateIcon = req.body.cateIcon;
	try {
		// console.log(cateModel.editCate);
		// console.log(cateID);
		// console.log(cateName);
		// console.log(cateIcon);
		await cateModel.editCate(cateID, cateName, cateIcon);
		// const cateList = await cateModel.getCate();
		// for (cate of cateList) {
		// 	cate.subCate = await cateModel.getSubCate(cate.cateID);
		// }
		// res.locals.lcCateList = cateList;
		res.json("1");
	} catch (e) {
		res.json("0");
	}
});

router.post(
	"/category/sub/edit/:cateID/:subcateID",
	upload.single("subcate-img"),
	async (req, res) => {
		const cateID = req.params.cateID;
		const subcateID = req.params.subcateID;
		const entity = {
			cateID: cateID,
			subcateID: subcateID,
			subcateName: req.body.subcateName
		};
		let message = "";
		let status;
		try {
			await cateModel.editSubCate(entity);
			message = "Đã lưu các thay đổi";
			status = 1;
			res.redirect(
				`/admin/category-sub-detail/${cateID}/${subcateID}/?message=${message}&status=${status}`
			);
		} catch (e) {
			console.log(e);
			message = "Có lỗi xảy ra";
			status = 0;
			res.redirect(
				`/admin/category-sub-detail/${cateID}/${subcateID}/?message=${message}&status=${status}`
			);
		}
	}
);

router.get("/users", (req, res, next) => {
	res.render("vwAdmin/users", {
		title: "Quản lý người dùng",
		user: req.user,
		notShowBreadcumb: true,
		message: req.query.message,
		status: req.query.status
	});

	req.session.lastUrl = req.originalUrl;
});

router.get("/users/getAllBidder", async (req, res) => {
	const data = await userModel.getAllBidder();
	for (let user of data) {
		user.point = (await userModel.getPointEvaluation(user.userID)) + "%";
		if (user.birthDay)
			user.birthDay = moment(user.birthDay).format("DD/MM/YYYY");
		user.button = `<a href='/admin/user-detail/${user.userID}' target='_blank' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>
        <button type='button' userID="${user.userID}" class='primary-btn delete-user-btn' onclick="deleteUserClick(event)"><i class='fas fa-trash-alt'></i></button>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.get("/users/getAllSeller", async (req, res) => {
	const data = await userModel.getAllSeller();
	for (let user of data) {
		user.point = (await userModel.getPointEvaluation(user.userID)) + "%";
		if (user.birthDay)
			user.birthDay = moment(user.birthDay).format("DD/MM/YYYY");
		user.button = `<a href='/admin/user-detail/${user.userID}' target='_blank' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>
            <button type='button' userID="${user.userID}" class='main-btn downgrade-user-btn' onclick="downgradeUserClick(event)"><i class="fas fa-angle-double-down"></i></button>
            <button type='button' userID="${user.userID}" class='primary-btn delete-user-btn' onclick="deleteUserClick(event)"><i class='fas fa-trash-alt'></i></button>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.get("/users/getAllRegis", async (req, res) => {
	const data = await userModel.getAllRegis();
	for (let user of data) {
		user.point = (await userModel.getPointEvaluation(user.userID)) + "%";
		if (user.birthDay)
			user.birthDay = moment(user.birthDay).format("DD/MM/YYYY");
		user.button = `<a href='/admin/user-detail/${user.userID}' target='_blank' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>
        <button type='button' userID="${user.userID}" class='main-btn upgrade-user-btn' onclick="upgradeUserClick(event)"><i class="fas fa-angle-double-up"></i></button>
        <button type='button' userID="${user.userID}" class='primary-btn delete-user-btn' onclick="deleteUserClick(event)"><i class='fas fa-trash-alt'></i></button>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.get("/users/getAllAdmin", async (req, res) => {
	const data = await userModel.getAllAdmin();
	for (let user of data) {
		user.point = (await userModel.getPointEvaluation(user.userID)) + "%";
		if (user.birthDay)
			user.birthDay = moment(user.birthDay).format("DD/MM/YYYY");
		user.button = `<a href='/admin/user-detail/${user.userID}' target='_blank' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>`;
	}
	res.send({
		draw: 1,
		recordsTotal: data.length,
		recordsFiltered: data.length,
		data: data
	});
});

router.get("/category-detail/:cateID", async (req, res, next) => {
	const arr = Array.from(res.locals.lcCateList);
	const cate = arr.find(a => a.cateID === parseInt(req.params.cateID));
	let count = 0;
	for (let sub of cate.subCate) {
		count += await productModel.countBySubCat(sub.cateID, sub.subcateID);
	}

	cate.productsCount = count;
	res.render("vwAdmin/category-detail", {
		title: "Chi tiết danh mục",
		user: req.user,
		notShowBreadcumb: true,
		message: req.query.message,
		status: req.query.status,
		cate
	});

	req.session.lastUrl = req.originalUrl;
});

router.get("/add-category", async (req, res, next) => {
	res.render("vwAdmin/add-category", {
		title: "Thêm danh mục",
		user: req.user,
		notShowBreadcumb: true
	});

	req.session.lastUrl = req.originalUrl;
});

router.post("/add-category", async (req, res, next) => {
	await cateModel.addCate(req.body);
	res.redirect("/admin/category");
});

router.post(
	"/add-category-sub/:cateID",
	upload.single("subcate-img"),
	async (req, res, next) => {
		const rs = await cateModel.getSubCate(req.params.cateID);
		let max = 0;
		for (const i of rs) {
			if (max < i.subcateID) max = i.subcateID;
		}
		const entity = {
			cateID: req.params.cateID,
			subcateName: req.body.subcateName,
			subcateID: max + 1
		};
		await cateModel.addSubcate(entity);
		res.redirect(`/admin/category#sub-${entity.cateID}`);
	}
);

router.get("/add-category-sub/:cateID", async (req, res, next) => {
	const rs = await cateModel.getCateFromId(req.params.cateID);
	if (rs.length === 0) {
		res.render("vwUser/not-found", {
			user: req.user,
			title: "Không tìm thấy trang",
			notShowBreadcumb: true
		});
	} else {
		const parent = rs[0];
		parent.subCate = await cateModel.getSubCate(parent.cateID);
		let max = 0;
		for (const i of parent.subCate) {
			if (max < i.subcateID) max = i.subcateID;
		}
		res.render("vwAdmin/add-category-sub", {
			title: "Thêm danh mục con",
			user: req.user,
			notShowBreadcumb: true,
			subCateIDAdd: max + 1,
			parent
		});
	}

	req.session.lastUrl = req.originalUrl;
});

router.get(
	"/category-sub-detail/:cateID/:subcateID",
	async (req, res, next) => {
		// const subcate = res.locals.lcCateList[req.params.cateID - 1].subCate[req.params.subcateID - 1];
		// subcate.productsCount = await productModel.countBySubCat(subcate.cateID, subcate.subcateID)
		// const parent = res.locals.lcCateList[req.params.cateID - 1]
		let rows = await cateModel.getSingleSubCate(
			req.params.cateID,
			req.params.subcateID
		);
		const subcate = rows[0];
		subcate.productsCount = await productModel.countBySubCat(
			subcate.cateID,
			subcate.subcateID
		);
		rows = await cateModel.getSingleCate(req.params.cateID);
		const parent = rows[0];
		parent.subCate = await cateModel.getSubCate(req.params.cateID);
		// console.log(object);
		res.render("vwAdmin/category-sub-detail", {
			title: "Chi tiết danh mục con",
			user: req.user,
			notShowBreadcumb: true,
			message: req.query.message,
			status: req.query.status,
			subcate,
			parent
		});

		req.session.lastUrl = req.originalUrl;
	}
);

router.get("/user-detail/:userID", async (req, res, next) => {
	const userID = req.params.userID;
	const rs = await userModel.getUserById(userID);
	let target = rs[0];

	[
		target.point,
		target.evaluation,
		target.history,
		target.productSell
	] = await Promise.all([
		userModel.getPointEvaluation(target.userID),
		userModel.getEvaluationById(target.userID),
		productModel.productsHistoryBid(target.userID),
		productModel.productsSell(target.userID)
	]);

	for (const product of target.history) {
		[
			product.mainImgSrc,
			product.countBid,
			product.isEndBid,
			product.isWinner
		] = await Promise.all([
			productModel.singleMainImgSrcByProduct(product.productID),
			productModel.countBidProduct(product.productID),
			(product.isEndBid = moment(product.endDate).valueOf() < Date.now()),
			(await productModel.getWinnerOfBidByProduct(product.productID)).userID ===
				target.userID
		]);
	}

	for (const product of target.history) {
		product.isHot = product.countBid >= config.product.countBidIsHot;
		const temp = moment(product.beginDate, "YYYY-MM-DD HH:mm:ss");
		const minutes = moment().diff(temp, "minutes");
		product.isNew = minutes <= config.product.minutesIsNew;
		product.resultBid = product.isEndBid && product.isWinner;
	}

	for (const product of target.productSell) {
		[product.mainImgSrc, product.countBid] = await Promise.all([
			productModel.singleMainImgSrcByProduct(product.productID),
			productModel.countBidProduct(product.productID)
		]);
	}

	for (const product of target.productSell) {
		product.isHot = product.countBid >= config.product.countBidIsHot;
		const temp = moment(product.beginDate, "YYYY-MM-DD HH:mm:ss");
		const minutes = moment().diff(temp, "minutes");
		product.isNew = minutes <= config.product.minutesIsNew;
		if (product.countBid > 0) {
			product.isBided = true;
			product.winner = await productModel.getWinnerOfBidByProduct(
				product.productID
			);
		} else {
			product.isBided = false;
		}
		product.isEndBid = moment(product.endDate).valueOf() < Date.now();
	}

	for (const e of target.evaluation) {
		e.senderName = await userModel.getNameById(e.sender);
	}

	res.render("vwAdmin/user-detail", {
		title: "Chi tiết User",
		user: req.user,
		notShowBreadcumb: true,
		message: req.query.message,
		status: req.query.status,
		target
	});

	req.session.lastUrl = req.originalUrl;
});

router.post("/user/delete/:userID", async (req, res) => {
	try {
		await userModel.deleteUser(req.params.userID);
		res.json("1");
	} catch (e) {
		console.log(e);
		res.json("0");
	}
});
router.post("/user/upgrade/:userID", async (req, res) => {
	try {
		userModel.upgradeUser(req.params.userID);
		res.json("1");
	} catch {
		res.json("0");
	}
});
router.post("/user/downgrade/:userID", async (req, res) => {
	try {
		userModel.downgradeUser(req.params.userID);
		res.json("1");
	} catch {
		res.json("0");
	}
});

module.exports = router;
