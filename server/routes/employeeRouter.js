const express = require('express');
const router = express.Router();
const Employee = require('../models/mySQL/employee');

router.get('/getEmployees', (req, res) => {
    const { search } = req.query;
    const employee = new Employee();
    employee.fetchAllEmployees(search)
    .then(result => {
        const employees = result[0].map(employee => {
            return {
                id: employee.id,
                firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email,
                skill_title: employee.skill_title
            }
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
        firstname: firstname,
        lastname: lastname,
        email: email
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
