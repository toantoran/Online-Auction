const db = require('../utils/db');

module.exports = {
    getUserByEmail: (email) => db.load(`select * from users where email = '${email}'`),
    getUserById: (id) => db.load(`select * from users where userID = '${id}'`),
    getNameById: async (id) => {
        const rows = await db.load(`select * from users where userID = '${id}'`);
        return rows[0].name;
    },
    newUser: (user) => db.add('users', user),
    editUser: entity => {
        const condition = {
            userID: entity.userID
        };
        delete entity.userID;
        return db.patch('users', entity, condition);
    },

    addUserEvaluation: entity => db.add('user_evaluation', entity),
    getPointEvaluation: userID => {
        const countGood = db.load(`{
            select count(*) from user_valuation where userID = ${userID} and isGood = 1
        }`);
        const countSum = db.load(`{
            select count(*) from user_valuation where userID = ${userID}
        }`);
        return countGood/countSum;
    },
    getEvaluationById: userID =>(`select * from user_valuation where userID = ${userID}`),
};