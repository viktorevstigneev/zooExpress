import React, { useCallback, useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../../common/Header";
import "./style.css";

import { API_URL } from "../../../constants";

const Music = ({ loadTeamData, team, match }) => (
  <div className="contact">
    <div className="music_container">
      <h1 className="music__title">contatc</h1>
      <form
        className="music__form"
        onSubmit={async (evt) => {
          evt.preventDefault();

          const formData = new FormData(evt.target);
          axios.post(`https://formspree.io/f/xbjevzoo`, formData);

          window.location.reload();
        }}
      >
        <label className="music__label" htmlFor="name" required="true">
          name
        </label>
        <input
          className="music__input"
          id="name"
          type="text"
          name="name"
          required="true"
        />
        <label className="music__label" htmlFor="name">
          email
        </label>
        <input
          className="music__input"
          type="email"
          name="email"
          required="true"
        />
        <label className="music__label" htmlFor="name">
          subjects
        </label>
        <input
          className="music__input"
          type="text"
          name="subject"
          required="true"
        />
        <label className="music__label" htmlFor="name">
          message
        </label>
        <textarea
          className="music__message"
          name="message"
          required="true"
        ></textarea>
        <button className="music__btn" type="submit">
          submit
        </button>
      </form>
    </div>
  </div>
);

export default Music;
