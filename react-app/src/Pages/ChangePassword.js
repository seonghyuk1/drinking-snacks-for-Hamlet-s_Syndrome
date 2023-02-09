/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Mypage.css";

function ChangePassword() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  const ID = sessionStorage.getItem("ID");
  const [currentPW, setcurrentPW] = useState("");
  const [newPW, setnewPW] = useState("");
  const [renewPW, setrenewPW] = useState("");

  let [views, setView] = useState([]);
  useEffect(() => {
    axios.post("/mypage", { data: ID }).then((응답) => {
      setView([...views, ...응답.data]);
    });
  }, []);

  // 현재 비밀번호 인식
  const cPWHandler = (e) => {
    e.preventDefault();
    setcurrentPW(e.target.value);
  };

  // 새로운 비밀번호 인식
  const nPWHandler = (e) => {
    e.preventDefault();
    setnewPW(e.target.value);
  };

  // 다시 작성한 새로운 비밀번호 인식
  const rPWHandler = (e) => {
    e.preventDefault();
    setrenewPW(e.target.value);
  };

  const navigate = useNavigate();

  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = views.length;

  // 비밀번호 변경
  async function submitHandler(e) {
    e.preventDefault();
    let saltPw;
    try {
      await axios.get("api/pw").then((응답) => {
        for (let i = 0; i < 응답.data.length; i++) {
          // 암호화된 비밀번호를 변수에 저장
          if (응답.data[i].아이디 === ID) {
            saltPw = 응답.data[i].패스워드;
          }
        }
        let body = {
          id: ID, // 현재 로그인된 아이디 정보 가져와야함
          current: currentPW,
          hash: saltPw,
          new: newPW,
          re: renewPW,
        };
        axios.post("changePW", body).then((res) => {
          if (res.data === "현재 패스워드 안맞음") {
            alert("현재 패스워드를 잘못 입력하셨습니다.");
          } else if (res.data === "비밀번호 재입력 오류") {
            alert("새 비밀번호가 맞지 않습니다.");
          } else if (res.data === "비밀번호 동일") {
            alert("기존 비밀번호와 새로운 비밀번호가 동일합니다.");
          } else {
            navigate("/Main");
            alert("비밀번호 변경이 완료되었습니다.");
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* 메뉴바를 만들어서 해당 기능으로 이동 */}

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/Mypage">
                  찜 목록({count})
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ChangeNickname">
                  닉네임 변경
                </Link>
              </li>
              <li className="nav-item">
                <b>
                  <Link className="nav-link active" to="/ChangePassword">
                    비밀번호 변경
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Resign">
                  회원 탈퇴
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className=" bg-light rounded m-3 p-3 containerBox  d-flex align-items-center">
        <div className=" border bg-light p-3 container col-8 m-2 rounded col rounded mx-auto ">
          <h3 className="pt-2">비밀번호 변경</h3>
          <form onSubmit={submitHandler}>
            <label className="p-3 font-500">현재 비밀번호</label>
            <input type="password" className="form-control form-control-lg mb-3 rounded-pill" placeholder="현재 사용중인 비밀번호를 입력하세요" value={currentPW} onChange={cPWHandler}></input>

            <label className="p-3 font-500">비밀번호 변경하기</label>
            <input type="password" className="form-control form-control-lg rounded-pill" placeholder="새 비밀번호를 입력하세요" value={newPW} onChange={nPWHandler}></input>

            <input type="password" className="form-control form-control-lg mt-3 rounded-pill" placeholder="새 비밀번호를 다시 입력하세요" value={renewPW} onChange={rPWHandler} />

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
