/* eslint-disable */
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import axios from "axios";

function Signup() {
  // id, pw, pw확인 상태 저장
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  let [pwchk, setPwchk] = useState("");

  // 패스워드 검사 메세지
  let [pwmessage, setPwmessage] = useState("");

  //유효성 검사
  let [ispwconfirm, setIspwconfirm] = useState(true);
  let [idchk, setIdchk] = useState(false);

  const navigate = useNavigate();

  // id 값 인식
  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  // pw 값 인식
  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  // 비밀번호 확인
  const pwConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPwchk(passwordConfirm);

    if (pw === passwordConfirm) {
      setPwmessage("비밀번호가 일치합니다. 😊 회원가입 버튼을 눌러주세요.");
      setIspwconfirm(false);
    } else {
      setPwmessage("비밀번호가 일치하지 않습니다. 😢");
      setIspwconfirm(true);
    }
  };

  // 회원가입 완료
  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      id: id,
      // pw: btoa(pw),
      pw: pw,
    };
    {
      idchk
        ? axios.post("api/signup", body).then((res) => {
            {
              // 존재함요면 안 넣고 존재 안 하면 넣고 페이지 이동
              res.data == "존재함요" ? alert("이미 존재하는 아이디이오니 다른 아이디를 사용하여 주세요.") : navigate("/");
            }
          })
        : alert("반드시 ID 중복 확인을 해주세요");
    }

    console.log("입력한 아이디 " + id);
    console.log("입력한 비밀번호 " + pw);
  };

  async function CHECK_ID() {
    let body = {
      id: id,
    };
    try {
      await axios.post("api/signup/checkID", body).then((res) => {
        console.log("검사여부 : " + res.data);
        {
          res.data === "존재" ? alert("이미 존재하는 아이디입니다.") : alert("아이디가 사용이 가능합니다.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand m-3" href="/">
            KWIC_WEB Shop 🏛
          </a>
        </div>
      </nav>
      <h4 className="container mt-5 col-6">회원가입</h4>
      <div className="container mt-3 col-6 mx-auto">
        <form onSubmit={submitHandler}>
          {/* 아이디 입력 */}
          <div className="form-group">
            <label>ID</label>
            <div>
              <input type="text" className="form-control" value={id} onChange={idHandler} placeholder="사용할 아이디를 입력하세요."></input>
            </div>
            <button
              className="btn btn-dark mt-3 d-grid gap-2 col-3 mx-auto"
              onClick={(e) => {
                e.preventDefault();
                CHECK_ID();
                setIdchk(true);
              }}
            >
              중복확인
            </button>
          </div>
          {/* 비밀번호 입력 */}
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={pw}
            onChange={pwHandler}
            onClick={(e) => {
              e.preventDefault(e);
            }}
            placeholder="비밀번호 입력"
          ></input>
          {/* 비밀번호 확인 */}

          <div className="form-group mt-3">
            <label>Password 확인</label>
            <input type="password" className="form-control" placeholder="비밀번호 확인" onChange={pwConfirm} />
            {pwchk.length > 0 && <span>{pwmessage}</span>}
          </div>
          {/* 회원가입 완료 */}
          <button onSubmit={submitHandler} className="btn btn-primary mt-5 d-grid gap-2 col-6 mx-auto" type="submit" disabled={ispwconfirm}>
            회원가입 완료
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
