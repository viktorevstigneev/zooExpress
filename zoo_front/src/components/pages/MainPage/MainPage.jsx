import React, { useEffect, useState } from "react";
import Footer from "../../common/Footer";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "./style.css";

// import { sliderData } from './data';
import axios from "axios";
import { API_URL } from "../../../constants";
import catenergy from "../../../img/cat-enegry.webp";

import img1 from "../../../img/slider/1.png";
import img2 from "../../../img/slider/2.png";
import img3 from "../../../img/slider/3.png";
import img4 from "../../../img/slider/4.png";
import img5 from "../../../img/slider/5.png";
import img6 from "../../../img/slider/6.png";
import img7 from "../../../img/slider/7.png";
import img8 from "../../../img/slider/8.png";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [cardData, setCardData] = useState();
  console.log("cd", cardData);
  const [swiperIn, setSwiperIn] = useState();

  useEffect(() => {
    const getClothes = async () => {
      const responseData = await axios
        .get(`${API_URL}/team`, { withCredentials: true })
        .then((response) => {
          setCardData(response.data.slice(0, 5));
        });
    };
    getClothes();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <main className="home__main">
        <div className="main__head">
          <div className="main_wrap">
            <h1 className="main_title">
              Зоо-экспресс <br /> интернет магазин зоо товаров
            </h1>
            <h2 className="main_subtitle">
              у нас вы найдете все для своих питомцев
            </h2>
          </div>

          <img src={catenergy} alt="" srcset="" />
        </div>

        <hr className="delimentr" />

        <h3 className="main_news">Наши новости!</h3>
        <div className="slider">
          <div
            className="btn_prev-next"
            onClick={() => swiperIn?.slidePrev()}
          >{`<`}</div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            onSwiper={(swiper) => setSwiperIn(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <img className="sl_img" src={img1} alt="" srcset="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="sl_img" src={img2} alt="" srcset="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="sl_img" src={img3} alt="" srcset="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="sl_img" src={img4} alt="" srcset="" />
            </SwiperSlide>
          </Swiper>
          <div
            onClick={() => swiperIn.slideNext()}
            className="btn_prev-next"
          >{`>`}</div>
        </div>

        <div className="main_cont">
          <p className="main_actual_title"> Актуальные товары:</p>

          <div className="main_slider">
            {cardData &&
              cardData.map((item) => (
                <div className="main_card">
                  <img
                    className="main_card__img"
                    src={`${API_URL}/getImage/${item.avatar}`}
                    alt=""
                  />
                  <div className="main_card__bottom">
                    <p className="main_card__price">
                      Цена за шт: {item.price} BYN
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="show_more"
            onClick={() => {
              navigate("/clothes");
            }}
          >
            Подробнее
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
