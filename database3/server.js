/**
 * Created by airmac on 6/5/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs290_macabuha',
    password        : '3547',
    database        : 'cs290_macabuha'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 37458);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));


app.get('/reset-table', function(req,res) {
    pool.query("DROP TABLE IF EXISTS workouts", function(err) {
        var createString = "CREATE TABLE workouts("+
            "id INT PRIMARY KEY AUTO_INCREMENT,"+
            "name VARCHAR(255) NOT NULL,"+
            "reps INT,"+
            "weight INT,"+
            "date DATE,"+
            "unit BOOLEAN)";
        pool.query(createString, function(err){
            if(err){
                console.log(err);
            }
            console.log("workouts table created");
            res.render('forms')
        })
    });
});

app.get('/', function(req,res) {
    res.render('forms');
});

//selection
app.get('/work', function(req,res) {
    var context = {};
    if(!req.query.id) {
        pool.query('SELECT * FROM workouts', function(err,rows,fields) {
            if(err) {
                console.log(err);
                return;
            }
            context.results = JSON.stringify(rows);
            res.send(context);
        })
    }else {
        pool.query('SELECT * FROM workouts WHERE id = ' + req.query.id, function(err,rows,fields) {
            if(err) {
                console.log(err);
                return;
            }
            context.results = JSON.stringify(rows);
            res.send(context);
        })
    }
});

//insert
app.post('/work', function(req,res) {

    pool.query('INSERT INTO workouts (`name`, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit], function(err, rows, fields) {
        if(err) {
            console.log(err);
            return;
        }
        var data = JSON.stringify(rows);
        res.send(data);
    })
});

//update
app.put('/work', function(req, res) {
    pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=?', [req.query.name, req.query.reps, req.query.weight,
    req.query.date, req.query.unit, req.query.id], function(err, result) {
        if(err){
            console.log(err);
            return;
        }
        res.render('forms');
    });
});


app.post('/', function(req,res){
    res.render('forms');
});

//delete
app.delete('/work', function(req,res){
    var context = {};

    pool.query('DELETE FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields) {
        if(err){
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.send(context);
    });
});

app.use(function(req,res) {
    res.status(404);
    res.render('404');
});

app.use(function(err,req,res,next){
    console.log(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});