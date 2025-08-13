const db = require('../../config/mySQL');

class Admin {
    constructor(id = null, firstname = null, lastname = null, email = null, password = null) {

        this.table = 'admins';

        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    async validateUser() {
        const query = `SELECT id, firstname, lastname, email
                       FROM ${this.table}
                       WHERE email = '${this.email}'
                       AND password = '${this.password}'`;

        return db.execute(query);
    }

}

module.exports = Admin;









