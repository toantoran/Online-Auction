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
    getPointEvaluation: async userID => {
        let rows = await db.load(`select count(*) as good from user_evaluation where receiver = ${userID} and isGood = 1`);
        const countGood = rows[0].good;
        rows = await db.load(`select count(*) as sum from user_evaluation where receiver = ${userID}`);
        const countSum = rows[0].sum;
        if(countSum==0) return 0;
        return countGood*100 / countSum;
    },
    getEvaluationById: userID => db.load(`select * from user_evaluation where receiver = ${userID} order by time desc`),
    checkExitsEvaluation: async (sender, receiver, productID) => {
        const rows = await db.load(`select * from user_evaluation where sender = ${sender} 
        and receiver = ${receiver} and productID = "${productID}"`);
        if (rows.length > 0) return true;
        return false;
    }
};