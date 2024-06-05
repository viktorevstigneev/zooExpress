import React, { useCallback, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import Header from "../../common/Header";

import "./style.css";

import { API_URL } from "../../../constants";
import { clothesType, sexType } from "../ClothesPage/data";

const AdminPanel = () => {
  const [file, setFile] = useState("");

  return (
    <section className="admin">
      <h1 className="admin__title">Добавте новый товар здесь</h1>
      <form
        className="admin__person"
        encType="multipart/form-data"
        // method="POST"
        onSubmit={async (evt) => {
          evt.preventDefault();

          const formData = new FormData(evt.target);

          const responseData = await axios({
            method: "POST",
            url: `${API_URL}/team`,
            data: formData,
            withCredentials: true,
          });
          window.location.reload();
        }}
      >
        <div className="admin__block">
          <label className="admin__label" htmlFor="avatar">
            <img
              className="admin__avatar"
              src={
                file
                  ? URL.createObjectURL(file)
                  : `${API_URL}/getImage/default.jpeg`
              }
              alt="menu_picture"
            />
            <div className="admin__icon">+</div>
          </label>
          <input
            className="admin__input"
            id="avatar"
            name="avatar"
            type="file"
            onChange={(evt) => setFile(evt.target.files[0])}
          />
        </div>

        <div className="admin__right">
          <label className="music__label" htmlFor="type">
            Выберите тип товара:
          </label>
          <select className="admin__text-input" name="typeClothes" id="type">
            {clothesType.map(({ id, translate }) => (
              <option className="option__item" data-value={id} key={id}>
                {translate}
              </option>
            ))}
          </select>

          <label className="music__label" htmlFor="sex">
            Выберите вид животного
          </label>
          <select className="admin__text-input" name="sexThing" id="sex">
            {sexType.map(({ id, translate }) => (
              <option className="option__item" data-value={id} key={id}>
                {translate}
              </option>
            ))}
          </select>

          <label className="music__label" htmlFor="name">
            Описание товара:
          </label>
          <input
            className="admin__text-input"
            type="text"
            name="name"
            id="name"
            multiple
          />

          <label className="music__label" htmlFor="decript">
            Название товара:
          </label>
          <input
            className="admin__text-input"
            type="text"
            name="description"
            id="descript"
          />

          <label className="music__label" htmlFor="price">
            Цена:
          </label>
          <input
            className="admin__text-input"
            type="number"
            name="price"
            id="price"
          />
          <button className="admin__button" type="submit">
            Добавить новый товар
          </button>
        </div>
      </form>
    </section>
  );
};

AdminPanel.propTypes = {
  team: PropTypes.object,
  loadTeamData: PropTypes.func,
};

AdminPanel.defaultProps = {
  team: {},
  loadTeamData: () => {},
};
export default AdminPanel;
