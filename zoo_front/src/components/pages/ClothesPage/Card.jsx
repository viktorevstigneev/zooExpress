import React, { useCallback, useEffect, useState } from "react";

import "./style.css";
import { API_URL } from "../../../constants";

import axios from "axios";

const Card = ({
  setActiveCard,
  setCardPrice,
  setCardDesc,
  setCardName,
  setShowCard,
  item,
  user,
  handleAddFavourite,
  activeCard,
}) => {
  const [isInFavorite, setIsInFavorite] = useState(
    JSON.parse(localStorage.getItem(user?._id))?.includes(item?._id)
  );

  let idsDoods = JSON.parse(localStorage.getItem(user?._id));

  useEffect(() => {
    if (!idsDoods?.includes(item?._id)) {
      setIsInFavorite(false);
    } else {
      setIsInFavorite(true);
    }
  }, [item]);

  console.log("tttt", user);

  return (
    <div
      className="clothes__card"
      onClick={() => {
        setActiveCard(item);
        setCardPrice(item.price);
        setCardDesc(item.description);
        setCardName(item?.name);
        setShowCard(true);
      }}
    >
      {user && user.isAdmin && (
        <span
          className="clothes_card--delete"
          onClick={async (event) => {
            event.stopPropagation();
            await axios.delete(`${API_URL}/team/${item._id}`, {
              withCredentials: true,
            });
          }}
        >
          &times;
        </span>
      )}
      <img
        className="clothes__img"
        src={`${API_URL}/getImage/${item.avatar}`}
        alt=""
      />
      <div className="clothes__bottom">
        <p className="clothes__name">{item.description}</p>
        <div className="clothes_category_wrap">
          <p className="clothes__category">{item.typeClothes}</p>
          <svg
            onClick={(evt) => {
              handleAddFavourite(evt, item._id);
              setIsInFavorite((prev) => !prev);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill={
              isInFavorite ||
              JSON.parse(localStorage.getItem(user?._id))?.includes(item?._id)
                ? "#f5c842"
                : "none"
            }
            stroke="#000"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
          </svg>
        </div>

        <p className="clothes__price">Цена за шт: {item.price} BYN</p>
        {user && user ? (
          <p
            className="clothes__add_to_Cart"
            onClick={async (evt) => {
              evt.stopPropagation();
              await axios.patch(`${API_URL}/profile`, {
                productID: activeCard?._id,
                userID: user?._id,
              });
              window.location.reload();
            }}
          >
            В корзину &#128722;
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
