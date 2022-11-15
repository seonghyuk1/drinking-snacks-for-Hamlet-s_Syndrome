/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  const navigate = useNavigate();

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  async function submitHandler(e) {
    e.preventDefault();

    let body = {
      SALT_pw: pw,
    };
    // 폼에 입력한 ID를 세션 스토리지에 저장 (회원정보 띄울용)
    sessionStorage.setItem("ID", id);
    try {
      await axios.get("api/pw").then((응답) => {
        console.log("입력한 아이디", id);
        {
          for (let i = 0; i < 응답.data.length; i++) {
            // 암호화된 비밀번호를 전달하기 위해 폼 비밀번호에 대입
            응답.data[i].아이디 == id && (body.SALT_pw = 응답.data[i].패스워드);
          }
        }

        console.log("암호화 비번", body.SALT_pw);
        console.log("입력한 비번", pw);
        // 암호화된 비밀번호와 그냥 비밀번호 둘 다 전달
        let R_body = {
          id: id,
          pw: body.SALT_pw,
          form_pw: pw,
        };
        console.log(R_body);

        axios.post("api/login", R_body).then((res) => {
          console.log(res);
          if (res.data == "아이디미존재") {
            alert("아이디를 잘못 입력하셨습니다.");
          } else if (res.data == "비번미존재") {
            alert("비밀번호가 틀렸습니다.");
          } else {
            console.log("받아온 토큰 ", res.data);
            // 세션에 토큰 저장
            sessionStorage.setItem("JWT", res.data);
            // 토큰 발급 안 됐을시 제자리
            {
              sessionStorage.JWT != null && navigate("/main");
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand m-3" href="/">
            KWIC_WEB Shop 🏛
          </a>
        </div>
      </nav>
      <h4 class="container mt-5 col-6">로그인</h4>
      <div class="container mt-3 col-6 mx-auto">
        <form onSubmit={submitHandler}>
          <div class="form-group">
            <label>ID</label>
            <input type="text" class="form-control" value={id} onChange={idHandler}></input>
          </div>
          <div class="form-group">
            <label>Password</label>

            <input type="password" class="form-control" value={pw} onChange={pwHandler}></input>
          </div>
          <button class="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto" type="submit">
            로그인하기
          </button>
        </form>
        <Link class="btn btn-primary mt-5 btn-lg d-grid gap-2 col-6 mx-auto" to="/Signup">
          회원가입
        </Link>
      </div>
    </>
  );
}

export default Login;
