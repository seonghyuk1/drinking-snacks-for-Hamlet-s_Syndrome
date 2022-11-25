import React, { useState } from "react";
import _ from "lodash";

const button = {
  background: "rgb(59, 42, 57)",
  color: "#fff",
  fontweight: "bold",
};

export default function UserLogin({ setUser, chatOn, setChatOn }) {
  const [user, setAUser] = useState("");

  // 로그인 버튼 클릭시
  function handleSetUser() {
    // Props로 받아온 변수에 유저 정보에 담아주고 localStorage에 저장
    // localStorage.setItem("user", user);
    setUser(sessionStorage.getItem("Nickname"));
    setChatOn(true);
  }

  return (
    <div class="container col-8 m-1 p-3 bg-light rounded shadow-lg mx-auto">
      <h4 class="text-center m-2 p-2">
        <strong>술덕후 모임</strong>
      </h4>

      <div>
        <button
          class=" btn btn-lg col-8 mx-auto"
          onClick={() => {
            handleSetUser();
          }}
          style={button}
        >
          채팅하기
        </button>
      </div>
    </div>
  );
}
