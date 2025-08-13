const db = require('../../config/mySQL');

class Employee {
    constructor(id = null, firstname = null, lastname = null, email = null) {

        this.table = 'employees';

        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    async fetchAllEmployees(search = null) {
        let query = `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.email,
                       GROUP_CONCAT(DISTINCT CONCAT(skills.id, ':', skills.title) SEPARATOR '|') as skills_data
                       FROM ${this.table}
                       LEFT JOIN employee_rel_skills ON employee_rel_skills.employee_id = ${this.table}.id
                       LEFT JOIN skills ON skills.id = employee_rel_skills.skill_id`;

        if (search) {
            query += ` WHERE ${this.table}.firstname LIKE '%${search}%'
                       OR ${this.table}.lastname LIKE '%${search}%'
                       OR ${this.table}.email LIKE '%${search}%'
                       OR skills.title LIKE '%${search}%'`;
        }

        query += ` GROUP BY ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.email`;

        return db.execute(query);
    }

    async save() {
        const query = `INSERT INTO ${this.table} (firstname, lastname, email) VALUES (?, ?, ?)`;
        return db.execute(query, [this.firstname, this.lastname, this.email]);
    }

    async updateByID(fields_to_update) {
        let set_values = '';

        for (var key in fields_to_update) {
            set_values += `${key} = '${fields_to_update[key]}', `;
        }
        // Remove the last comma and space
        set_values = set_values.slice(0, -2);

        const query = `UPDATE ${this.table} SET ${set_values}
                       WHERE id = ${this.id}`;
        console.log(query);
        return db.execute(query);
    }

    async deleteByID() {
        const query = `DELETE FROM ${this.table} WHERE id = ${this.id}`;
        return db.execute(query);
    }

    async addSkill(employee_id, skill_id) {
        const query = `INSERT INTO employee_rel_skills (employee_id, skill_id) VALUES (?, ?)`;
        return db.execute(query, [employee_id, skill_id]);
    }

    async removeSkill(employee_id, skill_id) {
        const query = `DELETE FROM employee_rel_skills WHERE employee_id = ? AND skill_id = ?`;
        return db.execute(query, [employee_id, skill_id]);
    }

}

module.exports = Employee;









