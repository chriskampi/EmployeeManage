const express = require('express');
const router = express.Router();
const Employee = require('../models/mySQL/employee');

router.get('/getEmployees', (req, res) => {
    const { search } = req.query;
    const employee = new Employee();
    employee.fetchAllEmployees(search)
    .then((result) => {
        const employees = result[0].map(emp => {
            // Parse skills data from the GROUP_CONCAT result
            let skills = [];
            if (emp.skills_data) {
                skills = emp.skills_data.split('|').map(skillStr => {
                    const [id, title] = skillStr.split(':');
                    return { id: parseInt(id), title: title };
                });
            }

            return {
                id: emp.id,
                firstname: emp.firstname,
                lastname: emp.lastname,
                email: emp.email,
                skills: skills
            };
        });

        res.json({
            success: true,
            message: 'Employees fetched successfully',
            data: employees
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.post('/createEmployee', (req, res) => {
    const { firstname, lastname, email } = req.body;
    const employee = new Employee(null, firstname, lastname, email);
    employee.save()
    .then(result => {
        res.json({
            success: true,
            message: 'Employee created successfully',
            data: {
                id: result[0].insertId,
                firstname: firstname,
                lastname: lastname,
                email: email
            }
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.put('/updateEmployee', (req, res) => {
    const { id, firstname, lastname, email } = req.body;

    const fields_to_update = {
        firstname,
        lastname,
        email
    };

    const employee = new Employee(id, null, null, null);
    employee.updateByID(fields_to_update)
    .then(result => {
        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email
            }
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.delete('/deleteEmployee', (req, res) => {
    const { id } = req.query;
    const employee = new Employee(id, null, null, null);
    employee.deleteByID()
    .then(result => {
        res.json({
            success: true,
            message: 'Employee deleted successfully',
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.post('/addSkill', (req, res) => {
    const { employee_id, skill_id } = req.body;
    const employee = new Employee();
    employee.addSkill(employee_id, skill_id)
    .then(result => {
        res.json({
            success: true,
            message: 'Skill added to employee successfully',
            data: {
                employee_id: employee_id,
                skill_id: skill_id
            }
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.delete('/removeSkill', (req, res) => {
    const { employee_id, skill_id } = req.query;
    const employee = new Employee();
    employee.removeSkill(employee_id, skill_id)
    .then(result => {
        res.json({
            success: true,
            message: 'Skill removed from employee successfully',
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;
