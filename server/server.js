const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { name: String, password: String, score: Number });


app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser

// If you had to handle requests on the server side, this is where that would occur
app.get('/user', (req, res) => {
	User.create({
		name: 'req.body.body.id,',
		password: 'getIndexBelowMaxForKey(req.body.body.pass, 5000000)',
		score: 0
	})
		.then(() => {
			console.log('created');
			res.send('created')
		})
});

// Listening for requests on the PORT
app.listen(PORT, () => {
	console.log('Serving up now at ' + JSON.stringify(PORT))
});