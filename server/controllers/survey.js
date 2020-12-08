/*
Author: Iksang Yoo
Team: Everyday Survey
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(SurveyList);

            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "title": req.body.title,
        "description": req.body.description,
        "published": req.body.published
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayTakePage = (req, res, next) => {
    res.render('survey/take', {title: 'Take Survey', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "title": req.body.title,
        "description": req.body.description,
        "published": req.body.published
    });

    
    /*module.exports.displayTakePage = (req, res, next) => {
        let id = req.params.id;
    
        Survey.findById(id, (err, surveyToTake) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                
                res.render('survey/take', {title: 'Take Survey', survey: surveyToTake, 
                displayName: req.user ? req.user.displayName : ''})
            }
        });
    }*/

   /* module.exports.processTakePage = (req, res, next) => {
        let id = req.params.id
    
        let updatedSurvey = Survey({
            "_id": id,
            "name": req.body.name,
            "title": req.body.title,
            "description": req.body.description,
            "published": req.body.published
        });
    }*/

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             res.redirect('/survey-list');
        }
    });
}