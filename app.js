const express =require('express');
const mysql = require('mysql');
const expHandleBars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');


const app=express();

// setting up connection
const db=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		database:'node_mysql_app'
	});

// connecting to mysql
db.connect(function(err) {
		if(err){
			throw err;
		}else{
			console.log('We are now connected to MySQL');
		} 
	});


// setting up the view engine
app.engine('handlebars',expHandleBars({defaultLayout:'main'}));
app.set('view engine','handlebars');

// defining routes external front end modules placed local
// path.join normalizes url,paths
app.use('/',express.static(path.join(__dirname + '/views/includes')));
app.use('/post/add', express.static(path.join(__dirname + '/views/includes')));



console.log(__dirname + '/views/includes');
console.log(path.join(__dirname + '/views/includes'));

app.get('/',function (req,res,next) {
	res.render('index');
});

app.get('/post/add',function (req,res,next) {
	res.render('add_post');
});

// process add post
app.post('/post/add',function (req,res,next) {

	res.render('add_post');
});



app.listen(8080,function () {
	console.log('Server started!');
});