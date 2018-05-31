var express = require('express');
var app = express();

// -----------------------------------------------
// Chance - Random generator helper for JavaScript
// https://www.npmjs.com/package/chance
var Chance = require('chance');
var chance = new Chance();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var mongoClient = require('mongodb').MongoClient;
var server = 'mongodb://localhost:27017/';
var db, client;

const PORT = 8081;
app.listen(PORT, () => console.log(`server listing to port ${PORT} `));

// Collection / Table in mongo DB
/*******************************/

const QUESTIONS = 'questions';
const CANDIDATE = 'candidate';

/*******************************/

mongoClient.connect(server, function (error, client) {
    if (error) {
        console.log('error connecting mongo db : ', error);
    } else {
        console.log('Connection established succesfully.');
        client = client;
        db = client.db('OnlineTest');
    }
})

app.get('/', (req, res) => res.send('Response from node server'))

app.get('/api/user', (req, res) => {
    db.collection('candidate', function (err, collection) {
        collection.find().toArray(function (err, items) {
            if (err) throw err;
            res.json(items);
        });
    });
})

app.get('/api/question', (req, res) => {

    var qno = req.query.qno || "1";

    db.collection(QUESTIONS, function (err, collection) {

        collection.find({ "qno": qno }).toArray(function (err, items) {
            if (err) throw err;
            res.json(items[0]);
        });
    });
})

app.post('/api/question/save', (req, res) => {
    console.log('req reached : msg from server! ');
    var body = req.body;
    console.log(body);

    var questions = db.collection(QUESTIONS);
    questions.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, doc) {

        //add qno + 1
        var qno = (parseInt(doc[0].qno) + 1).toString();

        db.collection(QUESTIONS, function (err, collection) {
            collection.insert({ qno: qno, question: body.question, options: body.options, answer: body.answer });
            if (err) throw err;
        })

    });
})

app.post('/api/user/save', (req, res) => {
    var body = req.body;

    var isAdmin = body.email.split('@')[1] == "suyati.com" ? true : false;

    db.collection('candidate', function (err, collection) {
        if (err)
            throw err;

        collection.insert({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            college: 0,
            questionSet: isAdmin == false ? chance.unique(chance.integer, 5, { min: 1, max: 10 }) : [],
            admin: isAdmin
        });
    })
})

app.post('/api/user/signin', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.collection(CANDIDATE, function (err, collection) {

        if (err) {
            res.status(500).send(err);
            return;
        }

        collection.findOne({ $and: [{ email: email.toLowerCase() }] }, (err, doc) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (!doc) {
                data = {
                    "meta": {
                        "status": "fail",
                        "message": "Login Failure: Invalid username or password"
                    }
                };
                res.status(401).send(data);
            } else {
                data = {
                    "meta": {
                        "status": "success",
                        "message": "Login success",
                        "firstname" :doc.firstName,
                        "lastname" :doc.lastName,
                        "questions" : doc.questionSet
                    }
                };
                res.json(data);
            }

        })
    })
})
