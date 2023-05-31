/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Mypage.css";
import { getMyPageData } from "../lib/api/food";
import MypageMenu from "./MypageMenu";
import { changePw } from "../lib/api/user";

function ChangePassword() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  const userId = sessionStorage.getItem("userId");
  const [currentPw, setcurrentPw] = useState("");
  const [newPw, setnewPw] = useState("");
  const [verifyPw, setverifyPw] = useState("");
  const [mySelect, setMySelect] = useState([]);

  useEffect(() => {
    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  // 현재 비밀번호 인식
  const cPWHandler = (e) => {
    e.preventDefault();
    setcurrentPw(e.target.value);
  };

  // 새로운 비밀번호 인식
  const nPWHandler = (e) => {
    e.preventDefault();
    setnewPw(e.target.value);
  };

  // 다시 작성한 새로운 비밀번호 인식
  const rPWHandler = (e) => {
    e.preventDefault();
    setverifyPw(e.target.value);
  };

  const navigate = useNavigate();

  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = mySelect.length;

  // 비밀번호 변경
  async function submitHandler(e) {
    e.preventDefault();
    changePw(userId, currentPw, newPw, verifyPw, navigate);
  }

  return (
    <>
      <MypageMenu count={count} />

      <div className=" bg-light rounded m-3 p-3 containerBox  d-flex align-items-center">
        <div className=" border bg-light p-3 container col-8 m-2 rounded col rounded mx-auto ">
          <h3 className="pt-2">비밀번호 변경</h3>
          <form onSubmit={submitHandler}>
            <label className="p-3 font-500">현재 비밀번호</label>
            <input type="password" className="form-control form-control-lg mb-3 rounded-pill" placeholder="현재 사용중인 비밀번호를 입력하세요." value={currentPw} onChange={cPWHandler}></input>

            <label className="p-3 font-500">비밀번호 변경하기</label>
            <input type="password" className="form-control form-control-lg rounded-pill" placeholder="변경할 비밀번호를 입력하세요." value={newPw} onChange={nPWHandler}></input>

            <input type="password" className="form-control form-control-lg mt-3 rounded-pill" placeholder="변경할새 비밀번호를 다시 입력하세요." value={verifyPw} onChange={rPWHandler} />

            <div className="d-grid gap-2 col-md-11 mx-auto">
              <button onSubmit={submitHandler} className="btn btn-lg press_btn mt-5 gap-2 " type="submit">
                변경사항 저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
