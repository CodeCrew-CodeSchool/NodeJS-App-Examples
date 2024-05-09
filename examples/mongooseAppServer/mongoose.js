const express = require('express');
const cors = require('cors');
require('dotenv').config();
//Mongo DB Connection
const mongoose = require('mongoose'); //ORM and DB Connector

const connectionString = process.env.DBConnectionString;

const app = express();
app.use(cors());
app.use(express.json());

//create our schema
const reviewSchema = mongoose.Schema({
    topic: String,
    question: String,
    id: Number
});

const Review = mongoose.model('review', reviewSchema);

async function saveToDB() {
    try {
        await mongoose.connect(connectionString);

        /*
        'Javascript', 'What is Node', 1
        */
        let question1 = new Review({
            topic: 'Javascript',
            question: 'What is Express',
            id: 2
        });

        await question1.save().then(()=> {
            console.log('question saved');
        });

        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
    
}

async function queryDB() {
    try {
        await mongoose.connect(connectionString);

        let results = await Review.find();
    
        console.log(results);
    
        await mongoose.disconnect();
        return results;
    } catch (error) {
        console.log(error);
    }
   
}

async function callDB() {
    await saveToDB();
    
    await queryDB();
}

async function newQuestion(data) {
    console.log(data);
    console.log(typeof data);
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
    try {
        await mongoose.connect(connectionString);

        let userQuestion = new Review(data);

        if (userQuestion.id == undefined) {
            let currentCollection = await Review.find();
            let newID = currentCollection.length + 1
            userQuestion.id = newID;
        }

        await userQuestion.save().then(()=> {
            console.log('users question has been saved');
        });

        await mongoose.disconnect();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}
//localhost:3001/?variable=value&variable1=value
//google.com/?q=Paradiso+Movie+Times&newVariable=test
//google.com/?q=dogs+or+cats
app.get('/', async (req, res)=> {
    console.log('Request Query Parameters', req.query);
    console.log('Request Body Parameters', req.body);

    //await callDB();
    let results = await queryDB();

    res.json(results);
});

app.post('/', async (req, res)=> {
    console.log('Request Query Parameters', req.query);
    console.log('Request Body Parameters', req.body);

    let data = req.query.data || req.body.data;

    let result = await newQuestion(data);

    if (result) {
        res.json({data: "Your Question has been saved"});
    } else {
        res.sendStatus(500);
        res.json({data: "Your Questions wasn't saved"});
    }
});

app.listen(3001, ()=> {
    console.log('the app is live at http://localhost:3001');
});