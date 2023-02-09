/* eslint-disable */
import React, { useState } from "react";
import _ from "lodash";
import "../styles/chat.css";

const button = {
  background: "rgb(59, 42, 57)",
  color: "#fff",
  fontweight: "bold",
};

export default function UserLogin({ setUser, setChatOn }) {
  // 로그인 버튼 클릭시
  function handleSetUser() {
    setUser(sessionStorage.getItem("Nickname"));
    setChatOn(true);
  }

  return (
    <div class="container col-9 m-1 p-3 bg-light rounded shadow-lg mx-auto  chat_container_login  ">
      <div class=" container">
        <div class="container ">
          <button
            class=" btn btn-lg press_btn mt-2 d-grid gap-2 col-11 mx-auto"
            onClick={() => {
              handleSetUser();
            }}
            style={button}
          >
            입장하기
          </button>
        </div>
      </div>
    </div>
  );
}
