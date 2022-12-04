/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChangeNickname() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  let [views, setView] = useState([]);
  let [Nickname, setNickname] = useState("");

  const sessionID = sessionStorage.getItem("ID");
  let nowNickname = sessionStorage.getItem("Nickname");

  // 수정할 닉네임
  const Handler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("selection", {
        params: { id: sessionID },
      })
      .then((res) => {
        // views에 DB로부터 가져온 json 객체를 저장하고, 밑에서 map 함수를 통해 렌더링
        for (let i = 0; i < res.data.length; i++) {
          setView((views) => [
            ...views,
            {
              ID: res.data[i].ID,
              drink: res.data[i].drink,
              food: res.data[i].food,
              place: res.data[i].place,
              _id: res.data[i]._id,
            },
          ]);
        }
      });
  }, []);

  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = views.length;

  // 닉네임 변경
  async function submitHandler(e) {
    e.preventDefault();
    try {
      // await axios.get("api/pw").then((응답) => {
      // console.log(saltPw);
      let body = {
        id: sessionID, // 현재 로그인된 아이디 정보 가져와야함
        nickname: Nickname,
      };
      axios.post("changeNickname", body).then((res) => {
        sessionStorage.setItem("Nickname", res.data);
        navigate("/Main");
      });
      // });
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
                <b>
                  <Link className="nav-link active" to="/ChangeNickname">
                    닉네임 변경
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ChangePassword">
                  비밀번호 변경
                </Link>
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

      <div className="border  rounded m-3 p-3">
        <form onSubmit={submitHandler}>
          <label className="p-3 font-500">현재 닉네임</label>
          <div>{nowNickname}</div>

          <label className="p-3 font-500">닉네임 변경하기</label>
          <input
            type="text"
            className="form-control form-control-lg rounded-pill"
            placeholder="새 닉네임을 입력하세요"
            value={Nickname}
            onChange={Handler}
          ></input>

          <div className="d-grid gap-2 col-md-11 mx-auto">
            <button
              onSubmit={submitHandler}
              className="btn btn-lg press_btn mt-5 gap-2 "
              type="submit"
            >
              변경사항 저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangeNickname;
