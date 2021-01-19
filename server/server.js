const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { name: String, password: String, score: Number });

var getIndexBelowMaxForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser

// If you had to handle requests on the server side, this is where that would occur
app.post('/login', (req, res) => {
	User.findOne({
		name: req.body.userName,
		password: getIndexBelowMaxForKey(req.body.password, 5000000),
	})
		.then((data) => {
			if(data !== null) {
				res.send('logged')
			} else {
				res.send('existError')
			}
		})
});

app.post('/create', (req, res) => {
	if (req.body.password !== req.body.passTwo) {
		res.send('passMatchError')
	} else if (req.body.password.length < 8) {
		res.send('passLengthError')
	} else {
		User.findOne({ name: req.body.userName })
		.then((data) => {
			if (data !== null) {
				res.send('userError')
			} else {
				User.create({
					name: req.body.userName,
					password: getIndexBelowMaxForKey(req.body.password, 5000000),
					score: 0
				})
				.then(() => {
					console.log('created');
					res.send('created')
				})
			}
		})
	}
});

// Listening for requests on the PORT
app.listen(PORT, () => {
	console.log('Serving up now at ' + JSON.stringify(PORT))
});