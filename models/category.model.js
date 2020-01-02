const db = require("../utils/db");

module.exports = {
	getCate: () => db.load("select * from category order by cateID"),
	getSubCate: cateID =>
		db.load(
			`select * from category_sub where cateID = ${cateID} order by subcateID`
		),
	getSingleSubCate: (cateID, subcateID) =>
		db.load(
			`select * from category_sub where cateID = ${cateID} and subcateID = ${subcateID} order by subcateID`
		),
	getFromName: subcateName =>
		db.load(`select * from category_sub where subcateName = "${subcateName}"`),
	getCateFromId: cateID =>
		db.load(`select * from category where cateID = "${cateID}"`),
	getSubCateFromId: (cateID, subcateID) =>
		db.load(
			`select * from category where cateID = "${cateID}" and subcateID = "${subcateID}"`
		),
	deleteCateByID: async cateID => {
		await db.load(`delete from category_sub where cateID = ${cateID}`);
		await db.load(`delete from category where cateID = ${cateID}`);
	},
	deleteSubCateByID: (cateID, subcateID) =>
		db.load(
			`delete from category_sub where cateID = ${cateID} and subcateID=${subcateID}`
		),

	addCate: entity => db.add("category", entity),
	addSubcate: entity => db.add("category_sub", entity),

	editCate: (id, name, icon) =>
		db.load(
			`update category set cateName='${name}', cateIcon='${icon}' where cateID='${id}'`
		),
	editSubCate: entity => {
		return db.load(
			`update category_sub set subcateName = "${entity.subcateName}" where cateID= ${entity.cateID} and subCateID = ${entity.subcateID}`
		);
	}
};
