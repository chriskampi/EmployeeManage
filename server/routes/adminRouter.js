const express = require('express');
const router = express.Router();
const Admin = require('../models/mySQL/admin');


router.get('/login', (req, res) => {
    const { email, password } = req.query;
    const admin = new Admin(null, null, null, email, password);
    admin.validateUser()
    .then(result => {
        if (result.length > 0) {
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    id: result[0][0].id,
                    firstname: result[0][0].firstname,
                    lastname: result[0][0].lastname,
                    email: result[0][0].email,
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;
