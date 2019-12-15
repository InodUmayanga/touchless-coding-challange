const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const EntranceActivity = require('./models/entrance-activity');
const Session = require('./models/session');

const app = express();

mongoose.connect('mongodb+srv://inod:'
    + process.env.MONGO_ATLAS_PW
    + '@cluster0-oeodj.mongodb.net/touchless-db-6?retryWrites=true&w=majority')
    .then(() => {
        console.log('successfully connected to DB!');
    })
    .catch(() => {
        console.log('Connection faliure');
    });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');

    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, POTIONS');

    next();
});

app.post('/api/enter', (req, res, next) => {

    const session = new Session({
        Type: 'session',
        SessionID: req.body.Activity.Entrance.SessionID,
        INAgentMACID: req.body.Activity.Entrance.INAgentMACID,
        Platenumber: req.body.Activity.Entrance.PlateNumber.Number,
        Intime: req.body.Activity.Entrance.PlateNumber.TimeStamp,
        Outtime: 0,
        OUTAgentMACID: "",
        Status: "ongoing"
    });

    const entranceActivity = new EntranceActivity({
        Type: 'entrnace-activity',
        SessionID: req.body.Activity.Entrance.SessionID,
        INAgentMACID: req.body.Activity.Entrance.INAgentMACID,
        Image: req.body.Activity.Entrance.PlateNumber.Image,
        Platenumber: req.body.Activity.Entrance.PlateNumber.Number,
        Intime: req.body.Activity.Entrance.PlateNumber.TimeStamp,
    });

    //have to check this
    entranceActivity.save();
    session.save();

    res.status(201).json({
        record: entranceActivity
    });

});

app.post('/api/exit', (req, res, next) => {

    Session.findOneAndUpdate(
        { Platenumber: req.body.Activity.Exit.PlateNumber.Number, Status: "ongoing" },
        {
            Status: "ended",
            OUTAgentMACID: req.body.Activity.Exit.OUTAgentMACID,
            Outtime: req.body.Activity.Exit.PlateNumber.TimeStamp
        }
    ).then(document => {

        res.status(201).json({
            UpdatedSession: document
        });
    });
});

app.get('/api/getActivity', (req, res, next) => {
    Session.find()
        .then(documents => {
            res.status(200).json({
                message: 'activity fetched successfully',
                Session: documents
            });
        });
});

module.exports = app;
