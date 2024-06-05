const { Schema, model } = require('mongoose');

const BannerSchema = new Schema({
	avatar: {
		type: String,
		default: 'default.png',
	},

});

const Banner = model('Banner', BannerSchema);

const createBanner = (data) => {
	return Banner.create(data);
};

const getBannerData = () => {
	return Banner.find();
};

const getBannerOne = (id) => {
	return Banner.findOne({ _id: id });
};

const deleteBanner = (id) => {
	return Banner.deleteOne({ _id: id });
};

const updateBanner = (id, data) => {
	return Banner.updateOne({ _id: id }, { ...data });
};

module.exports = {
	createBanner,
	getBannerData,
	deleteBanner,
	updateBanner,
	getBannerOne,
	Banner,
};
