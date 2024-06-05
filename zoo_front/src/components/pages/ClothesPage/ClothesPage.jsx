import React, { useCallback, useEffect, useState } from "react";

// import Footer from '../../common/Footer';

import { clothesType, sexType } from "./data";
import "./style.css";
import { API_URL, POPUP_OVERLAY_CLASSNAME } from "../../../constants";
import Modal from "../../common/Modal";
import axios from "axios";

const ClothesPage = () => {
  const [user, setUser] = useState();
  const [isFiltersModalOpen, setFilterModalOpen] = useState(false);
  const [sliderMin, setMin] = useState(0);
  const [sliderMax, setMax] = useState(500);
  const [activeCard, setActiveCard] = useState();
  const [showCard, setShowCard] = useState(false);
  const [showCardEdit, setShowCardEdit] = useState(false);
  const [cardData, setCardData] = useState();

  const [filteredCards, setFilteredCards] = useState();

  const [filter, setFilter] = useState({
    maxPrice: 500,
    minPrice: 0,
    sex: [],
    type: [],
  });

  console.log("filter: ", filter);

  const [cardPrice, setCardPrice] = useState(activeCard && activeCard?.price);
  const [cardName, setCardName] = useState(activeCard && activeCard?.name);
  const [cardDesc, setCardDesc] = useState(
    activeCard && activeCard?.description
  );
  const [file, setFile] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      const responseData = await axios
        .get(`${API_URL}/profile`, { withCredentials: true })
        .then((response) => setUser(response.data))
        .catch(() => {});
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getClothes = async () => {
      const responseData = await axios
        .get(`${API_URL}/team`, { withCredentials: true })
        .then((response) => {
          setCardData(response.data);
          setFilteredCards(response.data);
        });
    };
    getClothes();
  }, []);

  const handleModalWindowCloseButtonClick = useCallback((evt) => {
    evt.preventDefault();
    setFilterModalOpen(false);
    setShowCard(false);
    setShowCardEdit(false);
  }, []);

  const handleModalWindowOverlayClick = useCallback((evt) => {
    if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
      setFilterModalOpen(false);
      setShowCard(false);
      setShowCardEdit(false);
    }
  }, []);

  const filterArray = (arr) => {
    let newArr =
      arr &&
      arr.filter(
        (item) => item.price >= filter.minPrice && item.price <= filter.maxPrice
      );

    newArr = newArr.filter((item) =>
      filter.type.length == 0 ? item : filter.type.includes(item.typeClothes)
    );

    newArr = newArr.filter((item) =>
      filter.sex.length == 0 ? item : filter.sex.includes(item.sexThing)
    );

    return newArr;
  };

  const handleApplyFilters = (evt) => {
    evt.preventDefault();

    setFilteredCards(filterArray(cardData));
  };
  console.log("cardData: ", cardData);

  console.log("filteredCards: ", filteredCards);

  return (
    <>
      <main className="clothes">
        <div className="clothes__container">
          <div className="Clothes__top">
            <p
              className="clothes__filter"
              onClick={() => {
                setFilterModalOpen(true);
              }}
            >
              Фильтры
            </p>
            <div
              className="filter_clear"
              onClick={() => {
                setFilteredCards(cardData);
              }}
            >
              Сбросить фильтры
            </div>
            <p className="clothes__title">Все товары:</p>
          </div>

          <div className="clothes__content">
            {filteredCards &&
              filteredCards.map((item) => (
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
                    <p className="clothes__price">
                      Цена за шт: {item.price} BYN
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
      <Modal
        style={{
          with: !isFiltersModalOpen && "0",
          height: !isFiltersModalOpen && "0",
        }}
        title={"Фильтровать товары"}
        onCloseButtonClick={handleModalWindowCloseButtonClick}
        onOverlayClick={handleModalWindowOverlayClick}
      >
        <form action="" onSubmit={handleApplyFilters}>
          <div className="filter__block">
            <h2 className="filter__title">Диапазон цены</h2>

            <div className="filter__price">
              от
              <input
                type="number"
                name=""
                id=""
                onChange={(evt) => {
                  setFilter({
                    ...filter,
                    minPrice: evt.target.value,
                  });
                }}
              />
              BYN до
              <input
                type="number"
                name=""
                id=""
                onChange={(evt) => {
                  setFilter({
                    ...filter,
                    maxPrice: evt.target.value,
                  });
                }}
              />
              BYN
            </div>
          </div>
          <div className="filter__block">
            <h2 className="filter__title">Тип товара</h2>
            <div className="filter__wrapper">
              {clothesType.map(({ id, translate }) => (
                <div className="filter__item">
                  <input
                    className="filter__checkbox"
                    onChange={(evt) => {
                      const newArr = filter.type;

                      if (evt.target.checked) {
                        newArr.push(evt.target.name);
                        let set = new Set(newArr);

                        setFilter({
                          ...filter,
                          type: Array.from(set),
                        });
                      } else {
                        newArr.pop(evt.target.name);
                        let set = new Set(newArr);

                        setFilter({
                          ...filter,
                          type: Array.from(set),
                        });
                      }

                      // if (filter.type.length == 0) {
                      // 	setFilter({
                      // 		...filter,
                      // 		type: ['Blouses', 'Shirts', 'Pants', 'Dresses', 'Skirts', 'Outerwear'],
                      // 	});
                      // }
                    }}
                    type="checkbox"
                    id={translate}
                    name={translate}
                  />
                  <label htmlFor={id}>{translate}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter__block">
            <h2 className="filter__title">Вид животного</h2>
            <div className="filter__wrapper">
              {sexType.map(({ id, translate }) => (
                <div className="filter__item">
                  <input
                    className="filter__checkbox"
                    onChange={(evt) => {
                      const newArr = filter.sex;

                      if (evt.target.checked) {
                        newArr.push(evt.target.name);
                        let set = new Set(newArr);

                        setFilter({
                          ...filter,
                          sex: Array.from(set),
                        });
                      } else {
                        newArr.pop(evt.target.name);
                        let set = new Set(newArr);

                        setFilter({
                          ...filter,
                          sex: Array.from(set),
                        });
                      }
                      // if (filter.type.length == 0) {
                      // 	setFilter({
                      // 		...filter,
                      // 		sex: ['Female', 'Male'],
                      // 	});
                      // }
                    }}
                    type="checkbox"
                    id={translate}
                    name={translate}
                  />
                  <label htmlFor={id}>{translate}</label>
                </div>
              ))}
            </div>
          </div>

          <button className="filter__apply">Применить фильтры</button>
        </form>
      </Modal>

      {showCard && (
        <Modal
          onCloseButtonClick={handleModalWindowCloseButtonClick}
          onOverlayClick={handleModalWindowOverlayClick}
        >
          <div className="open__block">
            {user && user.isAdmin && (
              <p
                className="open__edit__card"
                onClick={() => {
                  setShowCard(false);
                  setShowCardEdit(true);
                }}
              >
                Редактировать &#9998;
              </p>
            )}
            <div className="open__container">
              <img
                className="open__img"
                src={`${API_URL}/getImage/${activeCard.avatar}`}
                alt=""
              />
              <div className="descr_wrap">
                <p className="open__description"> {activeCard?.description}</p>
                <p className="open__description"> {activeCard?.name}</p>
              </div>
            </div>
            <div className="open__bottom">
              <p className="open__price">Цена товара: {activeCard.price}BYN</p>
              {user && user ? (
                <p
                  className="open__cart"
                  onClick={async () => {
                    await axios.patch(`${API_URL}/profile`, {
                      productID: activeCard._id,
                      userID: user._id,
                    });
                    window.location.reload();
                  }}
                >
                  Добавить в корзину &#128722;
                </p>
              ) : (
                <p className="open__cart-no">
                  Необходимо войти чтобы добавить в корзину
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}

      {showCardEdit && (
        <Modal
          onCloseButtonClick={handleModalWindowCloseButtonClick}
          onOverlayClick={handleModalWindowOverlayClick}
        >
          <form
            className="open__block"
            encType="multipart/form-data"
            method="POST"
            onSubmit={async (evt) => {
              evt.preventDefault();

              const formData = new FormData(evt.target);

              const responseData = await axios({
                method: "PATCH",
                url: `${API_URL}/team/${activeCard._id}`,
                data: formData,
                withCredentials: true,
              });
              window.location.reload();
            }}
          >
            <div className="open__container">
              <div className="e__block">
                <label className="e__label" htmlFor="avatar">
                  <img
                    className="e__avatar"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : `${API_URL}/getImage/${activeCard.avatar}`
                    }
                    alt="menu_picture"
                  />
                  <div className="e__icon">&#128449;</div>
                </label>
                <input
                  className="e__input"
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(evt) => setFile(evt.target.files[0])}
                />
              </div>
              <div className="">
                <input
                  style={{ marginBottom: "20px", width: "100%" }}
                  type="text"
                  name="name"
                  value={cardName}
                  onChange={(evt) => {
                    setCardName(evt.target.value);
                  }}
                />
                <textarea
                  className="open__description"
                  style={{ resize: "none", width: "100%" }}
                  type="text"
                  name="description"
                  rows={5}
                  onChange={(evt) => {
                    setCardDesc(evt.target.value);
                  }}
                  value={cardDesc}
                ></textarea>
              </div>
            </div>
            <div className="open__bottom">
              <p className="open__price">
                Введите Цену:{" "}
                <input
                  type="text"
                  name="price"
                  onChange={(evt) => {
                    setCardPrice(evt.target.value);
                  }}
                  value={cardPrice}
                />
                BYN{" "}
              </p>
            </div>

            <button className="edit__button" type="submit">
              Сохранить изменения
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ClothesPage;
