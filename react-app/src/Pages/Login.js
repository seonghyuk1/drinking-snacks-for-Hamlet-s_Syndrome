/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import logo from "../logo.png";

function Login() {
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  let NickName;
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

    //  데이터베이스의 암호화된 비밀번호를 대입 예정
    let SALT_pw;

    // 폼에 입력한 ID를 세션 스토리지에 저장 (회원정보 띄울용)
    sessionStorage.setItem("ID", id);

    try {
      await axios.get("api/pw").then((응답) => {
        console.log("입력한 아이디", id);
        {
          for (let i = 0; i < 응답.data.length; i++) {
            // 아이디에 해당하는 암호화된 비밀번호를 가져와 SALT_pw에 대입
            // 닉네임을 기입한 유저라면 닉네임도 함께 가져와 NickName에 대입
            응답.data[i].아이디 == id && (SALT_pw = 응답.data[i].패스워드);
            응답.data[i].아이디 == id && (NickName = 응답.data[i].닉네임);
          }
        }

        sessionStorage.setItem("Nickname", NickName);

        // bcrypt.compare를 위해 암호화 비밀번호와 폼입력 비밀번호 둘 모두 전달
        let R_body = {
          id: id,
          pw: SALT_pw,
          form_pw: pw,
        };

        axios.post("api/login", R_body).then((res) => {
          if (res.data == "아이디미존재") {
            alert("아이디를 잘못 입력하셨습니다.");
          } else if (res.data == "비번미존재") {
            alert("비밀번호가 틀렸습니다.");
          } else {
            // 세션에 토큰 저장
            // res.data = 서버로 부터 전송된 Json Web Token
            sessionStorage.setItem("JWT", res.data);
            // 토큰 발급 안 됐을시 제자리
            {
              sessionStorage.JWT != null && navigate("/main");
            }
            // 이렇게 하면 헤더가 사라지긴 하는데 로그아웃엔 헤더 사라지지 않음
            location.reload();
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div class="container col-8 m-2 bg-white rounded position-absolute top-50 start-50 translate-middle rounded-8 shadow-lg">
        <div class="row p-5 col-12">
          <div class="col-lg-8 col-4 mx-auto bg-white">
            <div class="m-2 text-center">
              <a href="/">
                <img src={logo} class="img-fluid" alt="내일 지구가 끝나더라도 나는 오늘 밤 최고의 술자리를 가지겠어" width="300" />
              </a>
            </div>
            <div class="p-2 ">
              <div class="border rounded m-3 p-3">
                <form onSubmit={submitHandler}>
                  <label class="p-3 font-500">ID</label>
                  <input type="text" class="form-control form-control-lg mb-3 rounded-pill" placeholder="아이디를 입력하세요." value={id} onChange={idHandler}></input>
                  <label class="p-3 font-500">Password</label>
                  <input type="password" class="form-control form-control-lg rounded-pill" placeholder="비밀번호를 입력하세요." value={pw} onChange={pwHandler}></input>

                  <button class="btn btn-lg press_btn mt-5 d-grid gap-2 col-11 mx-auto" type="submit">
                    LOGIN
                  </button>
                </form>
                <div class="text-center pt-4">
                  <p class="m-3 text-secondary font-500">
                    아직 계정이 없으신가요?{"  "}
                    <Link class="text-dark font-500" to="/Signup">
                      회원가입
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
