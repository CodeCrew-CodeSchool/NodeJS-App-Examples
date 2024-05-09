//Mongo DB Connection
const mongoose = require('mongoose'); //ORM and DB Connector

//create our schema
const reviewSchema = mongoose.Schema({
    topic: String,
    question: String,
    id: Number
});

const Review = mongoose.model('review', reviewSchema);

async function saveToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/reviewDB');

        /*
        'Javascript', 'What is Node', 1
        */
        let question1 = new Review({
            topic: 'Javascript',
            question: 'What is Node',
            id: 1
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
        await mongoose.connect('mongodb://localhost:27017/reviewDB');

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

callDB();