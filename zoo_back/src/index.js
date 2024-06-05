const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const expressSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const initPassport = require('./passport/init');

const { APP_PORT } = require('./config');
const router = require('./routes/index');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		preflightContinue: true,
		optionsSuccessStatus: 200,
		credentials: true,
		methods: 'GET,PUT,PATCH,POST,DELETE',
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.raw());
app.use('/getImage', express.static(path.join(__dirname, 'uploads')));
app.use('/getAudio', express.static(path.join(__dirname, 'sounds')));

app.get('/', (req, res)=>{
	res.send("hellooo");
})


// auth

app.use(cookieParser());
app.use(
	expressSession({
		secret: 'top_secret',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

initPassport(passport);

app.use(router);

const startServer = async () => {
	try {
		mongoose.connect(
			'mongodb+srv://Alina:qawsed@cluster0.qiau54u.mongodb.net/',
			{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
			(error) => {
				if (error) {
					console.log('some error happened', error);
				}
				console.log('mongoDB has been connected successfully');
			}
		);

		app.listen(APP_PORT, () => {
			console.info(`server started on port ${APP_PORT}!`);
		});
	} catch (error) {
		console.log(`the ${error} happend with server`);
		console.log(`it means ${error.message}`);
	}
};

startServer();
