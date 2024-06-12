import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Footer from "../../common/Footer";

import "./style.css";
import { API_URL, POPUP_OVERLAY_CLASSNAME } from "../../../constants";
import Cards from "react-credit-cards-2";
import Modal from "../../common/Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const SavedPage = () => {
  const [user, setUser] = useState();
  const [cartData, setCartData] = useState();
  const [saved, setSaved] = useState();

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

  let idsDoods = JSON.parse(localStorage.getItem(user?._id));

  useEffect(() => {
    const userCart =
      cartData &&
      cartData.filter((value) => idsDoods && idsDoods?.includes(value._id));

    setSaved(userCart);
  }, [cartData]);

  const handleAddFavourite = (evt, goodsId) => {
    evt.stopPropagation();
    let idsDoods = JSON.parse(localStorage.getItem(user._id));
    console.log("idsDoods: ", idsDoods);
    if (!idsDoods?.includes(goodsId)) {
      localStorage.setItem(user._id, JSON.stringify([...idsDoods, goodsId]));
    } else {
      localStorage.setItem(
        user._id,
        JSON.stringify(idsDoods.filter((item) => item != goodsId))
      );
    }

    setSaved((prev) => prev.filter((item) => item._id !== goodsId));
  };

  return (
    <>
      <main className="cart">
        <div className="cart__container">
          <h2 className="cart__title">Ваши избранные</h2>
          <div className="cart__content">
            {saved?.length ? (
              saved.map((item) => (
                <div className="cart__item">
                  <img
                    className="cart__image"
                    src={`${API_URL}/getImage/${item.avatar}`}
                    alt="cart"
                  />
                  <p className="cart__price">цена: {item.price}BYN</p>
                  <button
                    className="cart__delete"
                    onClick={(evt) => {
                      handleAddFavourite(evt, item._id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))
            ) : (
              <p className="empty">Здесь пусто</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SavedPage;
