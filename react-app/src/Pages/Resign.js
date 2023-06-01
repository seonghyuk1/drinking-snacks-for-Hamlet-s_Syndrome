/* eslint-disable */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Mypage.css";
import MypageMenu from "./MypageMenu";
import { getMyPageData } from "../lib/api/food";
import { withDrawal } from "../lib/api/user";

function Resign() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  const userId = sessionStorage.getItem("userId");

  const [currentPw, setcurrentPw] = useState("");
  const [checked, setChecked] = useState(false);
  const [mySelect, setMySelect] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  // 현재 비밀번호 인식
  const PWHandler = (e) => {
    e.preventDefault();
    setcurrentPw(e.target.value);
  };

  //동의하기 check box 상태 관리
  const handleChange = () => {
    setChecked(!checked);
  };

  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = mySelect.length;

  // 회원 탈퇴
  async function submitHandler(e) {
    e.preventDefault();
    withDrawal(userId, currentPw, navigate);
  }

  return (
    <>
      <MypageMenu count={count} />

      <div className=" bg-light rounded m-3 p-3 containerBox  d-flex align-items-center">
        <div className=" border bg-light p-3 container col-8 m-2 rounded col rounded mx-auto ">
          <h3 className="pt-2">회원 탈퇴</h3>
          <form onSubmit={submitHandler}>
            <label className="p-3 font-500">현재 비밀번호</label>
            <input type="password" className="form-control form-control-lg mb-3 rounded-pill" placeholder="계정을 삭제하려면 현재 사용중인 비밀번호를 입력하세요" value={currentPw} onChange={PWHandler}></input>
            <label className="p-3 font-500">계정삭제시 모든 게시물이 삭제되며 복구 불가능합니다.</label>
            <div className="form-check">
              <input class="form-check-input" type="checkbox" checked={checked} onChange={handleChange} id="flexCheckDefault"></input>
              <label className="form-check-label" for="flexCheckDefault">
                동의합니다.
              </label>
            </div>

            <div className="d-grid gap-2 col-md-11 mx-auto">
              <button onSubmit={submitHandler} className="btn btn-lg press_btn mt-5 gap-2 " type="submit" disabled={!checked}>
                탈 퇴 하 기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Resign;
