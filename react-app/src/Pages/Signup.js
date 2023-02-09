/* eslint-disable */
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import axios from "axios";

function Signup() {
  // id, pw, pw확인 상태 저장
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  let [name, setName] = useState("");
  let [pwchk, setPwchk] = useState("");

  // 패스워드 검사 메세지
  let [pwmessage, setPwmessage] = useState("");

  // 검사완료 확인
  let [ispwconfirm, setIspwconfirm] = useState(true);
  let [isnameConfirm, setIsnameconfirm] = useState(true);

  // 중복 확인 검사
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

  // name 값 인식
  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  // 비밀번호 확인
  const pwConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPwchk(passwordConfirm);

    if (pw === passwordConfirm) {
      document.getElementById("alert").setAttribute("class", "mt-4 alert alert-success alert-dismissible fade show");
      setPwmessage("비밀번호가 일치합니다. 😊 회원가입 버튼을 눌러주세요.");
      setIspwconfirm(false);
    } else {
      document.getElementById("alert").setAttribute("class", "mt-4 alert alert-danger alert-dismissible fade show");
      setPwmessage("비밀번호가 일치하지 않습니다. 😢");
      setIspwconfirm(true);
    }
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

  // 회원가입 완료
  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      id: id,
      // pw: btoa(pw),
      name: name,
      pw: pw,
    };
    {
      idchk
        ? axios.post("api/signup", body).then((res) => {
            {
              res.data == "존재함요" ? alert("이미 존재하는 아이디이오니 다른 아이디를 사용하여 주세요.") : navigate("/");
            }
          })
        : alert("반드시 ID 중복 확인을 해주세요.");
    }
  };
  return (
    <>
      <div class="container col-8  m-2 bg-white rounded position-absolute top-50 start-50 translate-middle rounded-8 shadow-lg">
        <div class="row p-5">
          <div class="col-lg-8 col-12 mx-auto bg-white">
            <div class="p-2">
              <div class="border  rounded m-3 p-3">
                <a href="/">
                  <h3>
                    <i class="bi bi-arrow-left arrow "></i>
                  </h3>
                </a>
                <h3 class="mb-2 text-center pt-2">회원가입</h3>

                <form onSubmit={submitHandler}>
                  <label class="p-3 font-500">ID</label>
                  <input type="text" class="form-control form-control-lg mb-3 rounded-pill" placeholder="사용할 아이디를 입력하세요." value={id} onChange={idHandler}></input>

                  <div class="d-grid d-md-flex justify-content-md-end">
                    <button
                      class="btn  mt-2 gap-2 col-md-4 press_btn"
                      onClick={(e) => {
                        e.preventDefault();
                        CHECK_ID();
                        setIdchk(true);
                      }}
                    >
                      중복확인
                    </button>
                  </div>

                  <label class="p-3 font-500">Username</label>
                  <input type="text" class="form-control form-control-lg mb-3 rounded-pill" placeholder="닉네임을 입력하세요. (추후 변경가능합니다.)" value={name} onChange={nameHandler}></input>

                  <label class="p-3 font-500">Password</label>
                  <input
                    type="password"
                    class="form-control form-control-lg rounded-pill"
                    placeholder="사용할 비밀번호를 입력해 주세요."
                    value={pw}
                    onChange={pwHandler}
                    onClick={(e) => {
                      e.preventDefault(e);
                    }}
                  ></input>

                  <input type="password" class="form-control form-control-lg mt-3 rounded-pill" placeholder="다시 비밀번호를 입력하세요." onChange={pwConfirm} />

                  <div id="alert">
                    <h6 id="errormessage">{pwmessage}</h6>
                  </div>

                  <div class="d-grid gap-2 col-md-11 mx-auto">
                    <button onSubmit={submitHandler} class="btn btn-lg press_btn mt-5 gap-2 " type="submit" disabled={ispwconfirm}>
                      회원가입 완료
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
