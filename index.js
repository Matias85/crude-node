
//
const path = require('path');
const express = require ('express'); 
const hbs = require ('hbs');
const mysql = require ('mysql');
const app = express();

app.use (express.json());
app.use(express.urlencoded({extended: false}));

//Conexión a la base de datos

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'crude_node'
});

//Manejo de errores

conn.connect((err)=>{
	if (err) throw err;
	console.log ('conexión establecida...')
	});

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'hbs');    

//Leer información en formato Json



app.use('/assets', express.static (__dirname + '/public'));


//Select
app.get('/', (req,res)=>{
    let sql = "SELECT * FROM producto"           
    let query = conn.query (sql, (err, results)=>{
     if (err) throw err;
     res.render ('productos',{
         results: results
        })
    })
})    

//Insertar

app.post('/save', (req,res) =>{              
	let data = {producto_nombre: req.body.producto_nombre, producto_precio: req.body.producto_precio};
	let sql = "INSERT INTO producto SET ?";
	let query = conn.query (sql, data, (err, results)=>{
		if (err) throw err;
		res.redirect('/');
	}) 	
})

//Update

app.post('/update', (req,res) =>{              
	let sql = "UPDATE producto SET producto_nombre='"+ req.body.producto_nombre +"' producto_precio = '"+ req.body.producto_precio+"' WHERE producto:_id ="+ req.body.id;
	let query = conn.query (sql, (err, results)=>{
		if (err) throw err;
		res.redirect('/');
	}) 	
})

//Delete

app.post('/delete', (req,res)=>{
	let sql = "DELETE FROM producto WHERE producto_id="+req.body.producto_id+"";
	let query = conn.query (sql, (err, results)=>{
		if (err) throw err;
		res.redirect('/');
	}) 	

});



//server listening
app.listen(8000, () =>{
    console.log('Server is running at port 8000');
});