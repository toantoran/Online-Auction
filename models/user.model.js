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
    }
};