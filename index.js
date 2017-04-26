//set up 
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//configuration 
mongoose.connect('mongodb://admin:password@ds111441.mlab.com:11441/annasdb');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('public'));

//listen (start app)
app.listen(3000);

// model
var Todo = mongoose.model('Todo', {
	text : String
});

//api

app.get('/api/todos',function(req, res){
	Todo.find(function(err, todos){
		res.json(todos);
	})
});

app.post('/api/todos', function(req, res){
 	Todo.create({
 		text: req.body.text
 	}, function(err, todo){
 		Todo.find(function(err, todos){
			res.json(todos);
		})
 	});
});

app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		Todo.find(function(err, todos){
			res.json(todos);
		})
	})
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html')
})


console.log("App listening on port 3000");
