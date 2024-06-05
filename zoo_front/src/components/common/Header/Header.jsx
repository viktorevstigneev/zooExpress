import React, { useEffect, useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "../Modal";

import logo from "../../../img/logo.png";
import inst from "../../../img/inst_icon.png";
import tg from "../../../img/tg_icon.png";
import viber from "../../../img/viber_icon.png";
import profile from "../../../img/profile_icon.png";
import authDefault from "../../../img/user_default.png";

import { POPUP_OVERLAY_CLASSNAME } from "../../../constants";
import "./style.css";

import { API_URL } from "../../../constants";

import { signUp } from "../../pages/Signup/utils";
import { signIn } from "../../pages/SignIn/utils";

const Header = ({ handleChange, currentLocale }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  console.log("user: ", user);
  const [isPopupRegistrOpen, setPopupRegistrOpen] = useState(false);
  const [isPopupAuthOpen, setPopupAuthOpen] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const responseData = await axios
        .get(`${API_URL}/profile`, { withCredentials: true })
        .then((response) => setUser(response.data))
        .catch(() => {
          console.log("ddddd");
        });
    };
    getCurrentUser();
  }, []);

  const handleModalWindowCloseButtonClick = useCallback((evt) => {
    evt.preventDefault();
    setPopupRegistrOpen(false);
    setPopupAuthOpen(false);
  }, []);

  const handleModalWindowOverlayClick = useCallback((evt) => {
    if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
      setPopupRegistrOpen(false);
      setPopupAuthOpen(false);
    }
  }, []);

  const handleFormSubmitRegistr = useCallback((evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));

    signUp({ formData, setUser });
    setPopupRegistrOpen(false);
  });

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));

    signIn({ formData, setUser });
    setPopupAuthOpen(false);
  });

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="logo" />

        <div className="header__nav-left">
          <Link className="header__link" to="/home">
            Главная •
          </Link>

          <Link className="header__link" to="/clothes">
            Каталог товаров •
          </Link>
          {/* 
          <Link className="header__link" to="/contact">
            Связаться •
          </Link> */}
          {user && user.isAdmin ? (
            <Link className="header__link" to="/admin">
              Администрирование •
            </Link>
          ) : null}
          {user && user ? (
            <Link
              className="header__link"
              to="/"
              onClick={async (evt) => {
                const response = await axios.post(
                  `${API_URL}/logout`,
                  {},
                  { withCredentials: true }
                );
                if (response.status == 200) {
                  window.location.reload();
                }
              }}
            >
              Выйти •
            </Link>
          ) : null}
        </div>
        <div className="header__nav-right">
          {/* <a
            className="header__link"
            rel="noreferrer"
            target="_blank"
            href="https://www.instagram.com/thrn.bonheur"
          >
            <img src={inst} alt="inst" />
          </a>
          <a
            className="header__link"
            rel="noreferrer"
            target="_blank"
            href="https://t.me/boonheeur"
          >
            <img src={tg} alt="inst" />
          </a>
          <a
            className="header__link"
            rel="noreferrer"
            target="_blank"
            href="https://invite.viber.com/?g2=AQBaDJFGsoMsZ1Bbz7%2BextJ%2F3JDwt7iiSUBvrGHbsnOv1Y9SXM%2F%2FskksGrVFrOcJ"
          >
            <img src={viber} alt="inst" />
          </a> */}

          <div
            className="header__link"
            // href={user && Object.keys(user).length !== 0 ? '/profile' : '#'}
            onClick={() => {
              !user ? navigate("/") : navigate("/profile");
            }}
          >
            <img className="header__img-profile" src={profile} alt="inst" />{" "}
            профиль
          </div>

          {user ? (
            <Link className="header__link cart__link" to="/cart">
              &#128722;корзина
              <i className="cart__amount">{user?.userCart?.length}</i>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
