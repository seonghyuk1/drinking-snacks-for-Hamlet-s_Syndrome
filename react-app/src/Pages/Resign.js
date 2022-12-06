/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Resign() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  let [views, setView] = useState([]);
  let [PW, setPW] = useState("");
  const [checked, setChecked] = React.useState(false);
  const ID = sessionStorage.getItem("ID");

  // 현재 비밀번호 인식
  const PWHandler = (e) => {
    e.preventDefault();
    setPW(e.target.value);
  };

  const navigate = useNavigate();

  //동의하기 check box 상태 관리
  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    axios.post("/mypage", { data: ID }).then((응답) => {
      setView([...views, ...응답.data]);
    });
  }, []);
  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = views.length;

  // 회원 탈퇴
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
        // console.log(saltPw);
        let body = {
          id: ID, // 현재 로그인된 아이디 정보 가져와야함
          current: PW,
          hash: saltPw,
        };
        axios.post("resign", body).then((res) => {
          if (res.data === "현재 패스워드 안맞음") {
            alert("패스워드를 잘못 입력하셨습니다.");
          } else {
            //DB에서 회원정보 지우기
            //로그인 정보 날리기
            sessionStorage.clear();
            navigate("/");
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  //버튼 눌렀을 때 동의하기 체크 안하면 안됨
  function checkAgreement(e) {
    if (checked === false) {
      e.preventDefault();
      alert("동의하기 버튼을 누르십시오.");
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
                <Link className="nav-link active" to="/selection">
                  닉네임 변경
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ChangePassword">
                  비밀번호 변경
                </Link>
              </li>
              <li className="nav-item">
                <b>
                  <Link className="nav-link active" to="/selection">
                    회원 탈퇴
                  </Link>
                </b>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h3>계정 삭제하기</h3>
      <div className="border  rounded m-3 p-3">
        <form onSubmit={submitHandler}>
          <label className="p-3 font-500">현재 비밀번호</label>
          <input type="password" className="form-control form-control-lg mb-3 rounded-pill" placeholder="계정을 삭제하려면 현재 사용중인 비밀번호를 입력하세요" value={PW} onChange={PWHandler}></input>
          <label className="p-3 font-500">계정삭제시 모든 게시물이 삭제되며 복구 불가능합니다.</label>
          <div className="form-check">
            <input class="form-check-input" type="checkbox" value="" checked={checked} onChange={handleChange} id="flexCheckDefault"></input>
            <label className="form-check-label" for="flexCheckDefault">
              동의합니다.
            </label>
          </div>
          <div className="d-grid gap-2 col-md-11 mx-auto">
            <button onSubmit={submitHandler} onClick={checkAgreement} className="btn btn-lg press_btn mt-5 gap-2 " type="submit">
              계정 삭제하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Resign;
