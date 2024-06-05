import React, { Fragment, useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { signIn } from "./utils";
import { API_URL } from "../../../constants";
import SignInImg from "../../../img/cat.png";
import "./style.css";

const SignIn = () => {
  const [user, setUser] = useState({});

  const handleFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));

    signIn({ formData, setUser });
  });

  return user._id ? (
    <Navigate push to={`/home`} />
  ) : (
    <Fragment>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__block">
        <form
          className="auth__form"
          action={API_URL}
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <label className="auth__label" htmlFor="username">
            Введите логин
          </label>
          <input
            className="auth__input"
            name="username"
            id="username"
            placeholder="Login"
            type="text"
            required={true}
          />
          <label className="auth__label" htmlFor="password">
            Введите пароль
          </label>
          <input
            className="auth__input"
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            required={true}
          />
          <button className="auth__button" type="submit">
            Войти
          </button>

          <Link className="auth__link" to="/signup">
            Нет аккаунта? зарегистрироваться
          </Link>
        </form>
        <img className="auth__img" src={SignInImg} alt="auth" />
      </div>
    </Fragment>
  );
};

export default SignIn;
