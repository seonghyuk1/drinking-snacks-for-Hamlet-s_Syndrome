/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/master.css"
import logo from '../logo.png'
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
      {/* <div>
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <a class="navbar-brand m-3" href="/">내일 지구가 끝나더라도 나는 오늘 밤 최고의 술자리를 가지겠어🍻🍷🍾</a>
          </div>
        </nav>
      </div> */}

      <div class="container position-absolute top-50 start-50 translate-middle bg-white rounded shadow-lg ">
        <div class="row p-5">
          
          <div class="col-lg-8 col-12 mx-auto bg-white">
            <div class="m-2 text-center">
              <a href="/">
              <img src={logo} class="img-fluid" alt="내일 지구가 끝나더라도 나는 오늘 밤 최고의 술자리를 가지겠어" width="400"/>
              </a>
            </div>
            <div class="p-2">
              <div class="border  rounded m-3 p-3">
                <form onSubmit={submitHandler}>
                  <label class="p-3 font-500">ID</label>
                  <input type="text" class="form-control form-control-lg mb-3 rounded-pill"  placeholder="Input your ID" value={id} onChange={idHandler}></input>
                  <label class="p-3 font-500">Password</label>
                  <input type="password" class="form-control form-control-lg rounded-pill" placeholder="Input your PW" value={pw} onChange={pwHandler}></input>

                  <button class="btn btn-lg press_btn mt-5 d-grid gap-2 col-11 mx-auto" type="submit">LOGIN</button>
                </form>
                <div class="text-center pt-4">
                  <p class="m-3 text-secondary font-500">아직 계정이 없으신가요? <a href="/Signup" class="text-dark font-500">회원가입</a></p>
                </div>   
                {/* <Link class="btn btn-lg btn-primary mt-3 btn-lg d-grid gap-2 col-10 mx-auto" to="/Signup">회원가입</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      


      
    </>
  );
}

export default Login;
