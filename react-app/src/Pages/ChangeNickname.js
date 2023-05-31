/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Mypage.css";
import MypageMenu from "./MypageMenu";
import { getMyPageData } from "../lib/api/food";
import { updateNickName } from "../lib/api/user";

function ChangeNickname() {
  const navigate = useNavigate();

  const [mySelect, setMySelect] = useState([]);
  const [nickName, setNickName] = useState("");

  const count = mySelect.length;
  const userId = sessionStorage.getItem("userId");
  const nowNickname = sessionStorage.getItem("Nickname");

  useEffect(() => {
    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  // 수정할 닉네임
  const Handler = (e) => {
    e.preventDefault();
    setNickName(e.target.value);
  };

  // 닉네임 변경
  const submitHandler = (e) => {
    e.preventDefault();
    updateNickName(userId, nickName, navigate);
  };

  return (
    <>
      <MypageMenu count={count} />

      <div className=" bg-light rounded m-3 p-3 containerBox  d-flex align-items-center">
        <div className=" border bg-light p-3 container col-8 m-2 rounded col rounded mx-auto ">
          <h3 className="pt-2">닉네임 변경</h3>
          <form onSubmit={submitHandler}>
            <label className="p-3 font-500">닉네임 변경하기 (본인의 ID를 닉네임으로 사용하고 싶은 경우 아무런 입력 없이 변경사항을 저장하세요.)</label>
            <input type="text" className="form-control form-control-lg rounded-pill" placeholder={nowNickname} value={nickName} onChange={Handler}></input>

            <div className="d-grid gap-2 col-md-11 mx-auto">
              {nickName === nowNickname ? (
                <button className="btn btn-lg press_btn mt-5 gap-2 disabled">변경사항 저장</button>
              ) : (
                <button onSubmit={submitHandler} className="btn btn-lg press_btn mt-5 gap-2 " type="submit" onClick={() => alert("닉네임 변경이 완료되었습니다.")}>
                  변경사항 저장
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangeNickname;
