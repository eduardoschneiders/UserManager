const express = require('express');
var request = require('request');
const path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/', (req,res) => {
	request('https://demo.vnda.com.br/api/v2/users',
		{ 
			'headers': { 'Authorization': 'Token 7cCDNkSrMjz1vfdhm7XxenXL' }
		},
		function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		  }
		})
})

app.post('/', (req,res) => {
	request('https://demo.vnda.com.br/api/v2/users',
		{ 
			'headers': { 'Authorization': 'Token 7cCDNkSrMjz1vfdhm7XxenXL' },
			'method': 'POST',
			'json': req.body
		},
		function (error, response, body) {
		  if (!error && response.statusCode == 201) {
			res.json(body);
		  }
		})
})

app.put('/:id', (req,res) => {
	console.log("herererere");
	console.log(req.params.id)
	request('https://demo.vnda.com.br/api/v2/users/' + req.params.id,
		{ 
			'headers': { 'Authorization': 'Token 7cCDNkSrMjz1vfdhm7XxenXL' },
			'method': 'PUT',
			'json': req.body
		},
		function (error, response, body) {
		  console.log(error);
		  console.log(body);
		  if (!error && response.statusCode == 204) {
			res.json(body);
		  }
		})
})

app.delete('/:id', (req,res) => {
	request('https://demo.vnda.com.br/api/v2/users/' + req.params.id,
		{ 
			'headers': { 'Authorization': 'Token 7cCDNkSrMjz1vfdhm7XxenXL' },
			'method': 'DELETE',
		},
		function (error, response, body) {
		  if (!error && response.statusCode == 204) {
			res.json(body);
			res.status(response.statusCode);
		  }
		})
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);