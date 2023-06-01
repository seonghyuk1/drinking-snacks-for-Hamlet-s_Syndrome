/* eslint-disable */
import React, { useState, useEffect } from "react";

import { checkDuplicateID, submitSignUp } from "../lib/api/user";

function Signup() {
  // 상태 변수 선언
  const [id, setId] = useState(""); // 아이디
  const [pw, setPw] = useState(""); // 비밀번호
  const [name, setName] = useState(""); // 닉네임
  const [pwmessage, setPwmessage] = useState(""); // 비밀번호 일치 메세지
  const [pwchk, setPwchk] = useState(""); // 비밀번호 확인
  const [ispwconfirm, setIspwconfirm] = useState(false); // 비밀번호 확인 일치 여부
  const [idDupchk, setIdDupchk] = useState(false); // 아이디 중복여부 확인

  // 아이디 입력 핸들러
  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  // 비밀번호 입력 핸들러
  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  // 비밀번호 확인 입력 핸들러
  const pwCheckHandler = (e) => {
    e.persist();
    e.preventDefault();
    setPwchk(e.target.value);
  };

  // 비밀번호 확인 엔터 입력 확인 핸들러
  // 중복확인을 했을 때 이동, 하지 않았으면 중복확인
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && idDupchk) {
      submitHandler(e);
    }
  };

  // 닉네임 입력 핸들러
  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  // 아이디 중복확인
  const userIdDupchk = async () => {
    try {
      await checkDuplicateID(id);
    } catch (err) {
      console.log(err);
    }
  };

  // 회원 가입 제출
  const submitHandler = (e) => {
    e.preventDefault();

    submitSignUp(id, name, pw).catch((err) => {
      console.log(err);
    });
  };

  // 비밀번호 일치 여부 확인 (useEffect 동기처리)
  useEffect(() => {
    // 비밀번호가 비밀번호 확인과 일치하고 pw가 공백 아닐 때 동작
    if (pw === pwchk && pw) {
      document.getElementById("alert").setAttribute("class", "mt-4 alert alert-success alert-dismissible fade show");
      setPwmessage("비밀번호가 일치합니다. 😊 회원가입 버튼을 눌러주세요.");
      setIspwconfirm(true);

      // 비밀번호 확인과 비밀번호가 둘 다 공백이 아닐 때 동작
    } else if (pw && pwchk) {
      document.getElementById("alert").setAttribute("class", "mt-4 alert alert-danger alert-dismissible fade show");
      setPwmessage("비밀번호가 일치하지 않습니다. 😢");
      setIspwconfirm(false);
    }
  }, [pw, pwchk]);

  return (
    <>
      <div className="container col-12 col-md-8 col-lg-6 mx-auto my-4 bg-white rounded rounded-8 shadow-lg">
        <div className="row p-5">
          <div className="col-12 mx-auto bg-white">
            <div className="p-2">
              <div className="border rounded m-3 p-3">
                <a href="/">
                  <h3>
                    <i className="bi bi-arrow-left arrow"></i>
                  </h3>
                </a>
                <h3 className="mb-2 text-center pt-2">회원가입</h3>

                <form onSubmit={submitHandler}>
                  {/* 아이디 입력란 */}
                  <label className="p-3 font-500">ID</label>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3 rounded-pill"
                    placeholder="사용할 아이디를 입력하세요."
                    value={id}
                    onChange={(e) => {
                      idHandler(e);
                    }}
                  />

                  <div className="d-grid d-md-flex justify-content-md-end">
                    <button
                      className="btn mt-2 gap-2 col-md-4 press_btn"
                      onClick={(e) => {
                        e.preventDefault();
                        userIdDupchk();
                        setIdDupchk(true);
                      }}
                      disabled={!id}
                    >
                      중복확인
                    </button>
                  </div>

                  {/* 닉네임 입력란 */}
                  <label className="p-3 font-500">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3 rounded-pill"
                    placeholder="닉네임을 입력하세요. (추후 변경 가능합니다.)"
                    value={name}
                    onChange={(e) => {
                      nameHandler(e);
                    }}
                  />

                  {/* 비밀번호 입력란 */}
                  <label className="p-3 font-500">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill"
                    placeholder="사용할 비밀번호를 입력해 주세요."
                    value={pw}
                    onChange={(e) => pwHandler(e)}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />

                  {/* 비밀번호 확인 입력란 */}
                  <input
                    type="password"
                    className="form-control form-control-lg mt-3 rounded-pill"
                    placeholder="비밀번호를 한 번 더 입력하세요."
                    onChange={(e) => {
                      pwCheckHandler(e);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={!pw}
                  />

                  {/* 비밀번호와 비밀번호 확인 일치 여부 메세지 */}
                  <div id="alert">
                    <h6 id="errormessage">{pwmessage}</h6>
                  </div>

                  {/* 회원가입 완료 버튼 */}
                  <div className="d-grid gap-2 col-md-11 mx-auto">
                    {/* password가 일치하지 않거나, 중복 검사를 하지 않았거나, 모든 input이 비어있다면 회원 가입 완료 불가 */}
                    <button onSubmit={submitHandler} className="btn btn-lg press_btn mt-5 gap-2" type="submit" disabled={!ispwconfirm || !idDupchk || !pwchk || !id || !pw}>
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
