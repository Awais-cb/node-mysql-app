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

// setting up body parser for forms 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));

// defining routes external front end modules placed local
// path.join normalizes paths
app.use('/',express.static(path.join(__dirname + '/views/includes/')));
// 'post/add' is virtual path prefix
app.use('/post/add', express.static(path.join(__dirname + '/views/includes/')));
// setting up favicon
app.use('/favicon.png', express.static(path.join('/view/includes/')));


// Creating DB from application just for practice
/*
app.get('/createdb',function(req,res) {
	let sql='CREATE DATABASE nodemysql';
	db.query(sql,function(err,result) {
		if(err){ 
			throw err;
		}else{
			console.log(result);
			res.send('Database has been created!');
		}

	});
});
*/

// Creating table for our selected db
/*
app.get('/createpoststable',function(req,res) {
	let sql='CREATE TABLE posts(post_id int AUTO_INCREMENT, post_title varchar(100), post_text varchar(255), post_date datetime, post_author varchar(255), PRIMARY KEY (post_id))';
	db.query(sql,function(err,result) {
		if(err){
			throw err;
		}else{
			console.log(result);
			res.send('Posts table created!');
		}
	});

});
*/

app.get('/',function (req,res,next) {
	res.render('index');
});

app.get('/addpost',function (req,res,next) {
	res.render('add_post');
});


app.get('/about',function (req,res,next) {

	res.render('about');
});

app.get('/contact',function (req,res,next) {

	res.render('contact');
});

// process contact form
app.post('/contact',function (req,res,next) {
	let user_email = req.body.user_email;
	let email_subject = req.body.email_subject;
	let email_text = req.body.email_text;
	console.log(user_email);
	console.log(email_subject);
	console.log(email_text);
	res.render('contact');


});
// process add post
app.post('/addpost',function (req,res,next) {
	let post_title = req.body.post_title;
	let post_text = req.body.post_text;
	let post_date = Date.now();
	let post_author = req.body.post_author;
	console.log(post_title);
	console.log(post_text);
	console.log(post_date);
	console.log(post_author);
	res.render('add_post');


});

app.listen(8080,function () {
	console.log('Server started!');
});