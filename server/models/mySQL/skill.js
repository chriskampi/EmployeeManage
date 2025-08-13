const db = require('../../config/mySQL');

class Skill {
    constructor(id = null, title = null) {

        this.table = 'skills';

        this.id = id;
        this.title = title;
    }

    async fetchAllSkills(search = null) {
        let query = `SELECT id, title 
                     FROM ${this.table}`;

        if (search) {
            query += ` WHERE title LIKE '%${search}%'`;
        }

        return db.execute(query);
    }

    async save() {
        const query = `INSERT INTO ${this.table} (title) VALUES (?)`;
        return db.execute(query, [this.title]);
    }

    async updateByID(title) {
        const query = `UPDATE ${this.table} SET title = '${title}' WHERE id = ${this.id}`;
        return db.execute(query);
    }

    async deleteByID() {
        const query = `DELETE FROM ${this.table} WHERE id = ${this.id}`;
        return db.execute(query);
    }

}

module.exports = Skill;









