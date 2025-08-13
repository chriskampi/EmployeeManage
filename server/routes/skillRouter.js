const express = require('express');
const router = express.Router();
const Skill = require('../models/mySQL/skill');

router.get('/getSkills', (req, res) => {

    const { search } = req.query;

    const skill = new Skill();
    skill.fetchAllSkills(search)
    .then(result => {
        const skills = result[0].map(skill => {
            return {
                id: skill.id,
                title: skill.title
            }
        });

        res.json({
            success: true,
            message: 'Skills fetched successfully',
            data: skills
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.post('/createSkill', (req, res) => {
    const { title } = req.body;
    const skill = new Skill(null, title);
    skill.save()
    .then(result => {
        res.json({
            success: true,
            message: 'Skill created successfully',
            data: {
                id: result[0].insertId,
                title: title
            }
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.put('/updateSkill', (req, res) => {
    const { id, title } = req.body;
    const skill = new Skill(id, title);
    skill.updateByID(title)
    .then(result => {
        res.json({
            success: true,
            message: 'Skill updated successfully',
            data: {
                id: id,
                title: title
            }
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.delete('/deleteSkill', (req, res) => {
    const { id } = req.query;
    const skill = new Skill(id, null);
    skill.deleteByID()
    .then(result => {
        res.json({
            success: true,
            message: 'Skill deleted successfully',
        });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;
