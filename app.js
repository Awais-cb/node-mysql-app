const express=require('express');
const mysql= require('mysql');
const expHandleBars= require('express-handlebars');
const path= require('path');


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

// defining route external front end modules placed local
app.use(express.static(__dirname + '/views/includes'));


app.get('/',function (req,res,next) {
	res.render('index');
});



app.listen(8080,function () {
	console.log('Server started!');
});