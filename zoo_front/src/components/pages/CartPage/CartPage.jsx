import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Footer from "../../common/Footer";

import "./style.css";
import { API_URL, POPUP_OVERLAY_CLASSNAME } from "../../../constants";
import Cards from "react-credit-cards-2";
import Modal from "../../common/Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CartPage = () => {
  const [user, setUser] = useState();
  const [cartData, setCartData] = useState();
  const [sum, setSum] = useState();
  const [pay, setPay] = useState(false);

  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

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

  useEffect(() => {
    const userCart =
      cartData &&
      cartData.filter(
        (value) => user?.userCart && user?.userCart.includes(value._id)
      );

    const summa =
      userCart &&
      userCart.reduce((sum, elem) => {
        return sum + +elem.price;
      }, 0);

    setSum(summa);
  }, [cartData]);

  const handleModalWindowCloseButtonClick = useCallback((evt) => {
    evt.preventDefault();
    setPay(false);
  }, []);

  const handleModalWindowOverlayClick = useCallback((evt) => {
    if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
      setPay(false);
    }
  }, []);

  const userCart =
    cartData &&
    cartData.filter(
      (value) => user?.userCart && user?.userCart.includes(value._id)
    );

  return (
    <>
      <main className="cart">
        <div className="cart__container">
          <h2 className="cart__title">Корзина пользователя {user?.username}</h2>
          <div className="cart__content">
            {userCart?.length ? (
              userCart.map((item) => (
                <div className="cart__item">
                  <img
                    className="cart__image"
                    src={`${API_URL}/getImage/${item.avatar}`}
                    alt="cart"
                  />
                  <p className="cart__price">цена: {item.price}BYN</p>
                  <button
                    className="cart__delete"
                    onClick={async () => {
                      await axios.patch(`${API_URL}/profileDeleteFromCart`, {
                        productID: item._id,
                        userID: user._id,
                      });
                      window.location.reload();
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
          <div className="cart__bottom">
            <p className="cart__summary">Общая стоимость: {sum} BYN</p>
            {userCart?.length ? (
              <button className="cart__button" onClick={() => setPay(true)}>
                перейти к оплате
              </button>
            ) : null}
          </div>
        </div>
      </main>

      {pay && (
        <Modal
          title={"Введите данные карты"}
          onCloseButtonClick={handleModalWindowCloseButtonClick}
          onOverlayClick={handleModalWindowOverlayClick}
        >
          <div className="pay__wrapper">
            <Cards
              number={number}
              expiry={expiry}
              cvc={cvc}
              name={name}
              focused={focus}
            />
            <form
              className="par__form"
              encType="multipart/form-data"
              // method="POST"
              onSubmit={async (evt) => {
                evt.preventDefault();

                const formData = new FormData(evt.target);

                // formData.append('userID', user._id);

                const responseData = await axios({
                  method: "PATCH",
                  url: `${API_URL}/profileAddOrder?userId=${user._id}`,
                  data: formData,
                  withCredentials: true,
                });
                window.location.reload();
              }}
            >
              <input
                className="pay__credit"
                type="tel"
                name="number"
                placeholder="Card Number"
                maxLength={16}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setNumber(value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />

              <input
                className="pay__credit"
                type="tel"
                name="name"
                placeholder="Card name"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setName(value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />

              <div className="pay__wrapper-b">
                <input
                  className="pay__credit-b"
                  type="tel"
                  name="expiry"
                  placeholder="expiry"
                  maxLength={4}
                  onChange={(e) => {
                    const { value } = e.target;
                    setExpiry(value);
                  }}
                  onFocus={(e) => setFocus(e.target.name)}
                />

                <input
                  className="pay__credit-b"
                  type="tel"
                  name="cvc"
                  placeholder="cvc"
                  maxLength={3}
                  onChange={(e) => {
                    const { value } = e.target;
                    setCvc(value);
                  }}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </div>
              <button className="pay__button">оплатить</button>
            </form>
          </div>
          <p className="pay__info">
            ¿ Оплата банковской картой VISA, MasterCard и БЕЛКАРТ через систему
            Assist Belarus 1. Оплата производится через интернет в режиме
            реального времени непосредственно после оформления заказа. 2. Для
            совершения финансовой операции подходят карточки международных
            платежных систем VISA (всех видов), MasterCard (в том числе
            Maestro), эмитированные любым банком мира, а также карты платежной
            системы БЕЛКАРТ. При выборе оплаты заказа с помощью банковской
            карты, обработка платежа (включая ввод номера банковской карты)
            производится ООО «Компанией электронных платежей «АССИСТ» с
            использованием программно-аппаратного комплекса системы электронных
            платежей Assist Belarus, которая прошла международную сертификацию.
          </p>
          <p className="pay__info">
            ¿ настоятельно рекомендуем Вам проверить модель, характеристики,
            комплектацию товара до подписания бланка доставки, претензии к
            внешнему виду и комплектации изделия после подписания бланка
            доставки и отъезда курьера не принимаются. - При авансовой оплате
            заказа (по безналичному расчету, с помощью электронных платежных
            систем и пр.) покупатель обязан предъявить удостоверяющий личность
            документ, а также (если покупателем выступает юридическое лицо)
            доверенность от организации-плательщика. - В обязанности курьеров не
            входят консультации по эксплуатации товаров, услуг по их сборке,
            установке и подключению. За консультациями просьба обращаться к
            менеджерам call-центра. Обращаем ваше внимание, что включение
            бытовых устройств при температуре, значительно ниже комнатной, может
            негативно сказаться на их дальнейшей эксплуатации.
          </p>
        </Modal>
      )}
      <Footer />
    </>
  );
};

export default CartPage;
