const { HttpStatusCode } = require('../constants');
const { createBanner, getBannerData, deleteBanner, updateBanner, getBannerOne, Banner } = require('../models/Banner');
const {User} = require("../models/User");
const nodemailer = require('nodemailer');

// const handleOrderTeam = async (req, res) => {
// 	try {
// 		let transporter = nodemailer.createTransport({
// 			host: 'smtp.mail.ru',
// 			port: 587,
// 			secure: false,
// 			auth: {
// 				user: 'afanasiy1950@mail.ru',
// 				pass: 'rX8Q2LzNKP2LjE1eiepX',
// 			},
// 		});
	

// 		const tttt = req.body.gotedData.map((item) => {
// 			return `${item.name}  ${item.price} BYN`;
// 		});


// 		const textMsg = `
// 			${req.body.user} хочет сделать заказ \n
// 			${tttt} 
// 		`;

// 		let result = await transporter.sendMail({
// 			from: 'afanasiy1950@mail.ru',
// 			to: 'afanasiy1950@mail.ru',
// 			subject: 'Новый заказ',
// 			text: textMsg,
// 		});

// 		await User.updateOne({ _id: req.body.userID }, {userCart: null});
// 		res.status(HttpStatusCode.OK).send(result);
// 	} catch (error) {
// 		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
// 	}
// };

const handleAddBanner = async (req, res) => {
	try {
		console.log('req: ', req.body);
		const result = await createBanner({ avatar: req.file.filename });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetBanner = async (req, res) => {
	try {
		let result;
		result = await getBannerData();
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};



const handleDeleteBanner = async (req, res) => {
	try {
		const result = await deleteBanner(req.body.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};






module.exports = {
	handleAddBanner,
	handleGetBanner,
	handleDeleteBanner,
};
