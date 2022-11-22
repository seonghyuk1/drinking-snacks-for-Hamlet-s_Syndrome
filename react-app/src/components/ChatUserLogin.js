import React, { useState } from "react";
import _ from "lodash";

const button = {
  width: "30%",
  height: "20%",
  fontWeight: "bold",
  borderRadius: 10,
  fontSize: 18,
  backgroundColor: "#075e54",
  borderWidth: 0,
  color: "#fff",
  margin: 10,
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
    <div>
      <h1 style={{ margin: 10, textAlign: "center" }}>술쟁이 대화방</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            handleSetUser();
          }}
          style={button}
        >
          입장
        </button>
      </div>
    </div>
  );
}
