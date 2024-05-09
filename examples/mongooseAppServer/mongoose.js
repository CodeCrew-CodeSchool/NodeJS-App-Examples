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
    } catch (error) {
        console.log(error);
    }
   
}

async function callDB() {
    await saveToDB();
    
    await queryDB();
}
//localhost:3001/?variable=value&variable1=value
//google.com/?q=Paradiso+Movie+Times&newVariable=test
//google.com/?q=dogs+or+cats
app.get('/', async (req, res)=> {
    console.log('Request Query Parameters', req.query);
    console.log('Request Body Parameters', req.body);

    await callDB();

    res.json({data: "Hello, Class!"});
});

app.listen(3001, ()=> {
    console.log('the app is live at http://localhost:3001');
});