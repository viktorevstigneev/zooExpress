import React, { useEffect, useState } from 'react';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider';

import './style.css';

// import { sliderData } from './data';
import axios from 'axios';
import { API_URL } from '../../../constants';

const MainPage = () => {
	const [bannerData, setBannerData] = useState();


	useEffect(() => {
		const getBenners = async () => {
			const responseData = await axios
				.get(`${API_URL}/banner`, { withCredentials: true })
				.then((response) => setBannerData(response.data));
		};
		getBenners();
	}, []);
	return (
		<>
			<main className="home__main">
				<Slider data={bannerData} />
			</main>
			<Footer />
		</>
	);
};

export default MainPage;
