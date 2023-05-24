/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../logo.png";

import { loginSubmit } from "../lib/api/auth";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // 로그인 처리
    await loginSubmit(id, pw, navigate);
  };

  return (
    <div className="container col-md-8 col-sm-12 col-xs-12 m-2 bg-white rounded position-absolute top-50 start-50 translate-middle rounded-8 shadow-lg">
      <div className="row p-5">
        <div className="col-lg-8 col-12 mx-auto bg-white">
          <div className="m-2 text-center">
            <a href="/">
              <img src={logo} className="img-fluid" alt="내일 지구가 끝나더라도 나는 오늘 밤 최고의 술자리를 가지겠어" width="300" />
            </a>
          </div>
          <div className="p-2">
            <div className="border rounded m-3 p-3">
              <form onSubmit={handleLogin}>
                <label className="p-3 font-500">ID</label>
                <input type="text" className="form-control form-control-lg mb-3 rounded-pill" placeholder="아이디를 입력하세요." value={id} onChange={idHandler} />

                <label className="p-3 font-500">Password</label>
                <input type="password" className="form-control form-control-lg rounded-pill" placeholder="비밀번호를 입력하세요." value={pw} onChange={pwHandler} />

                <div className="d-grid gap-2 col-11 mx-auto">
                  <button className="btn btn-lg press_btn mt-5" type="submit">
                    LOGIN
                  </button>
                </div>
              </form>

              <div className="text-center pt-4">
                <p className="m-3 text-secondary font-500">
                  아직 계정이 없으신가요?{" "}
                  <Link className="text-dark font-500" to="/Signup">
                    회원가입
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
