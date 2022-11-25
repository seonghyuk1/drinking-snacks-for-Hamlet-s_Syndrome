import React, { useState } from "react";
import _ from "lodash";

<<<<<<< HEAD
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
=======
 const button={ 
    background: "rgb(59, 42, 57)",
    color: "#fff",
    fontweight: "bold",
}

 
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae

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
<<<<<<< HEAD
    <div>
      <h1 style={{ margin: 10, textAlign: "center" }}>술쟁이 대화방</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
=======
    <div class="container col-8 m-1 p-3 bg-light rounded shadow-lg mx-auto">
      <h4 class="text-center m-2 p-2"><strong>술덕후 모임</strong></h4>

      <div>
        <button class=" btn btn-lg col-8 mx-auto"
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
          onClick={() => {
            handleSetUser();
          }}
          style={button}
        >
<<<<<<< HEAD
          입장
=======
          채팅하기
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
        </button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
