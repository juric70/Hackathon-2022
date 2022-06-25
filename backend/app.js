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


//Registracija usera:
app.post('/registerUser', function(req, res) {

	const { user_name,birth_date, adress, imp,email, username, pasword } = req.body
	//Provjera postojanja Useranme-a:
	const selectUsername = db.query("SELECT Username FROM users WHERE Username= ?"+ username, function (err, row){
        if (row && row.length) {
				//username postoji
				alert("UserName već postoji! pokušajte opet!")
        } else {
			//username ne postoji
			db.query(
				`INSERT INTO users ( user_name,birth_date, adress , imp, email, username ,pasword)
				VALUES ('${user_name}','${birth_date}', '${adress}' ,'${imp}', '${email}', '${username}', '${pasword}')
				`, 
			
				(error, result) => {
					if(error) {
						console.log(error)
						res.json({error: "SQL Error"})
					}
					else {
						
					//	window.location.href = "";//IME LOKACIJE NA KOJU SE IDE NAKON USPJESne registracije admina
						res.json({userinfo:result[0]})

					}
				})
        }
      })

})
//Registracija Admina:
app.post('/registerAdmin', function(req, res){
	const {admin_name,birth_date, adress, imp,email, username, pasword } = req.body
	//Provjera postojanja Useranme-a:
	const selectUsername = db.query("SELECT Username FROM admins WHERE Username= "+ username, function (err, row){
        if (row && row.length) {
				//username postoji
				alert("UserName već postoji! pokušajte opet!")
        } else {
			//username ne postoji
			db.query(
				`INSERT INTO admins ( admin_name,birth_date, adress , imp, email, username ,pasword)
				VALUES ('${admin_name}','${birth_date}', '${adress}' ,'${imp}', '${email}', '${username}', '${pasword}')
				`, 
			
				(error, result) => {
					if(error) {
						console.log(error)
						res.json({error: "SQL Error"})
					}
					else {
						res.json({userinfo:result[0]})
						//window.location.href = "";//IME LOKACIJE NA KOJU SE IDE NAKON USPJESne registracije admina
					}
				})
        }
      })

})
//Login USER:
app.post('/loginUser', function(req, res) {
	
	const {username, pasword} = req.body
	db.query(
	`SELECT username
	FROM users
	WHERE username = '${username}'
	AND pasword = '${pasword}'
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
			//	alert("Uspješna prijava")
				res.json({userinfo:result[0]})
			//	window.location.href = "";//IME LOKACIJE NA KOJU SE IDE NAKON USPJESNOG LOGINA usera
			//	return 1;
			}
			else {
				res.json({userinfo:result[0]})
				res.json({message: "Login failed. Incorrect user ID or password"})
				return 0;
			}
		}
	})
})
//Login ADMIN:
app.post('/loginAdmins', function(req, res) {
	
	const {admin_id, admin_name,birth_date, adress, imp,email, username, pasword } = req.body
	db.query(
	`SELECT admin_id, username
	FROM admins
	WHERE username = '${username}'
	AND pasword = '${pasword}'
	LIMIT 1
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
				alert("Uspješna prijava")
				window.location.href = "";//IME LOKACIJE NA KOJU SE IDE NAKON USPJESNOG LOGINA admina
				return 1;
			}
			else {
				res.json({message: "Login failed. Incorrect user ID or password"})
				return 0;
			}
		}
	})
})
//Pohrana svakog novog posta
app.post('/newPost', function(req, res) {
	
	const {Title, Category_ID, Subcat_ID, Img, Vid, Coment, Solution, Location_ID, User_ID} = req.body
	db.query(
	`INSERT INTO Posts (Title, Category_ID, Subcat_ID, Img, Vid, Coment, Solution, Location_ID, User_ID, adminACC)
	 VALUES ('${Title}', ${Category_ID}, ${Subcat_ID}, '${Img}', '${Vid}', '${Coment}', '${Solution}', ${Location_ID}, ${User_ID},  '${0}')
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
				alert("Uspjeno dodavanje")
				window.location.href = "";//IME LOKACIJE NA KOJU SE IDE NAKON USPJESNOG LOGINA admina
				return 1;
			}
			else {
				res.json({message: "Login failed. Incorrect user ID or password"})
				return 0;
			}
		}
	})
})
//ODABIR POSTOVA
app.post('/adminPosts', function(req, res) {
	
	const { adminACC, post_id} = req.body
	db.query(
	`insert into selected_posts sp(sp.post_id)
	SELECT post_id 
	from posts p
	where '${post_id}' like p.post_id
	 `, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
				alert("Uspjeno dodavanje")
				res.json({postInfo: result[0]});//samo ucitati inf u  home
				return 1;
			}
			else {
				res.json({message: "Login failed. Incorrect user ID or password"})
				return 0;
			}
		}
	})
})



app.post('/', function(req, res) {
	
	const {Admin_acc, Post_ID} = req.body
	db.query(
	`SELECT  Admin_acc
	FROM Posts
	WHERE Post_ID=${Post_ID}
	LIMIT 1
	`, 
	(error, result) => {
		if(error) {
			console.log(error)
			res.json({error: "SQL Error"})
		}
		else {
			if(result.length > 0){
				if(result[0]==1){
					
				}
			
			}
			else {
				res.json({message: "Login failed. Incorrect user ID or password"})
				return 0;
			}
		}
	})
})



const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app;