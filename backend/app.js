var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors(
	{
		origin: '*'
	}
))
// connection configurations
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'hackathon_2022'
});
// connect to database
db.connect();
// default route
app.get('/', function (req, res) {
	return res.send({ error: true, message: 'hello' })
});

app.post('/register', function(req, res) {
	console.log("primio sam: ", req.body)
	const {user_id, name, password} = req.body
	db.query(
	`INSERT INTO users
	(user_id, name, password)
	VALUES
	(${user_id},'${name}','${password}')
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			res.json({message: "Registration success."})
		}
	})
})

app.post('/login', function(req, res) {
	console.log("primio sam: ", req.body)
	const {user_id, name, password} = req.body
	db.query(
	`SELECT user_id, name
	FROM users
	WHERE user_id = ${user_id}
	AND password = '${password}'
	LIMIT 1
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
				res.json({message: "Login success.", userInfo: result[0]})
			}
			else {
				res.json({message: "Login failed. Incorrect user ID or password"})
			}
		}
	})
})


// set port
app.listen(3001, function () {
	console.log('Node MySQL REST API app is running on port 3001');
});
module.exports = app;