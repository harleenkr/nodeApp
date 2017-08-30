// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
// connect to our database
mongoose.connect('mongodb://localhost/nodeApp');
var Schema = require('./app/model/schema');
// set our port
var port = process.env.PORT || 8080;

// get an instance of the express Router
var router = express.Router();

router.use(function (req, res, next) {
    console.log("Something is happening...!!!");
    next();
})

router.route('/schData')

    // post/save the schema Data
    .post(function (req, res) {
        console.log('req', req.body);
        var schema = new Schema();
        schema.name = req.body.name;
        schema.address = req.body.address;
        schema.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Data is added by using post API!' });
        })
    })

    // get the all schema Data
    .get(function (req, res) {
        Schema.find(function (err, sch) {
            if (err)
                res.send(err);
            res.json(sch);
        })
    })

router.route('/schData/:schData_id')

    // get the schema Data with that id
    .get(function (req, res) {
        console.log('req.params', req.params);
        Schema.findById(req.params.schData_id, function (err, schid) {
            if (err)
                res.send(err);
            res.json(schid);
        })
    })

    // update the schema Data with that id
    .put(function (req, res) {
        Schema.findById(req.params.schData_id, function (err, schid) {
            if (err)
                res.send(err);
            // update the schema info
            var schema = new Schema();
            schema.name = req.body.name;
            schema.address = req.body.address;
            // save the schema
            schema.save(function (err) {
                if (err)
                    res.send(err);
                console.log('res', res);
                res.json({ message: 'Data is updated by using put API!' });
            })
        })
    })

    // delete the schema Data with that id
    .delete(function (req, res) {
        Schema.remove({
            _id: req.params.schData_id
        }, function (err, schid) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        })
    })

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/data', function (req, res) {
    res.json({ message: 'hooray! welcome to our data route api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);