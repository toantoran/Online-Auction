const db = require('../utils/db');

module.exports = {
    getUserByEmail: (email) => db.load(`select * from users where email = '${email}'`),
    getUserById: (id) => db.load(`select * from users where userID = '${id}'`),
    newUser: (user) => db.add('users', user),
    editUser: entity => {
        const condition = { userID: entity.userID };
        delete entity.userID;
        return db.patch('users', entity, condition);
    }
};