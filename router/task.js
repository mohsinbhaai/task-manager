const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


require('../models/Idea');
const Task = mongoose.model('task');

//Task route
router.get('/addtask', (req, res) => {
    res.render('task/addtask');
});


router.get('/', (req, res) => {
    Task.find({}).sort({date: 'desc'})
        .then(task => {
            res.render('task/task', {
                task:task
            });
        });
});

//Edit Task
router.get('/edit/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }).then(task => {
        res.render('task/edit', {
            task: task
        })
    });
});

// Add task
router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({text: 'Please enter title....'});
    }

    if (!req.body.details) {
        errors.push({text: 'Please enter details...'});
    }

    if (errors.length > 0) {
        res.render('task/addtask', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        };
        new Task(newUser).save().then(task => {
            req.flash('success_msg', 'Your task is added!');
            res.redirect('/task');
        }).catch(errors => {
            console.log(errors);
        })
    }
});


//Edit form process
router.put('/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }).then(task => {
        task.title = req.body.title;
        task.details = req.body.details;

        task.save().then(task => {
            req.flash('success_msg', 'Your task is updated!');
            res.redirect('/task')
        })
    })
});

router.delete('/:id', (req, res) => {
    Task.remove({ _id: req.params.id}).then(() => {
        req.flash('success_msg', 'Your task is deleted!');
        res.redirect('/task');
    });
});

module.exports = router;