import React, { useEffect, useState } from "react";

import Footer from "../../common/Footer";

import { COLORS_FILTER, TYPE_FILTER } from "./data";
import "./style.css";
import { API_URL } from "../../../constants";
import { profileData } from "./data";
import defaultImg from "../../../img/default.png";
import axios from "axios";

const orders = [
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
  {
    name: "Smt by the way to know",
    status: "is proceed",
  },
];

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [cartData, setCartData] = useState();
  useEffect(() => {
    const getCurrentUser = async () => {
      const responseData = await axios
        .get(`${API_URL}/profile`, { withCredentials: true })
        .then((response) => setUser(response.data));
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getClothes = async () => {
      const responseData = await axios
        .get(`${API_URL}/team`, { withCredentials: true })
        .then((response) => {
          setCartData(response.data);
        });
    };
    getClothes();
  }, []);

  const userOrder =
    cartData &&
    cartData.filter((value) => user?.order && user?.order.includes(value._id));
  console.log("userOrder: ", userOrder);

  const [orderSt, setOrderSt] = useState({
    part1: true,
    part2: false,
    part3: false,
  });

  const checkStatus = (orderSt) => {
    console.log("orderSt: ", orderSt);
    if (orderSt == 1) return "заказ принят";
    if (orderSt == 2) return "Начата комплектовка";
    // if (orderSt == 3) return 'заказ готов';
  };

  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  return (
    <>
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Личный кабинет</h1>
          <div className="profile__wrapper">
            <img className="profile__avatar" src={defaultImg} alt="" />
            <div className="profile__block">
              <p className="profile__cred">Пользователь : {user?.username}</p>
              {/* <p className="profile__cred">Email: gdjfdfsfs</p> */}
            </div>
          </div>
        </div>
        <div className="profile__bottom">
          <div className="bottom__head">
            <p className="bottom__title">Ваши заказы:</p>
            <p className="bottom__title">Статус:</p>
          </div>
          {userOrder ? (
            userOrder.map((order) => (
              <div className="bottom__order">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p className="bottom__order-name">{order?.typeClothes}</p>
                  <img
                    width={50}
                    src={`${API_URL}/getImage/${order?.avatar}`}
                    alt="pict"
                  />
                </div>
                <p className="bottom__order-name">
                  {checkStatus(randomInteger(1, 2))}
                </p>
              </div>
            ))
          ) : (
            <div className="bottom__order">ничего нет.пусто </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
