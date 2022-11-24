import { Link } from "react-router-dom";
import axios from "axios";
import Show from "./Show";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Mypage() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  let [views, setView] = useState([]);

  useEffect(() => {
    axios
      .post("selection", {
        params: { id: "kdh" },
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

  //DB에서 가져온 찜한 데이터는 반복문을 돌면서 Show에서 렌더링
  const viewList = views.map((obj) => (
    <Show obj={obj} views={views} setView={setView} />
  ));
  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = views.length;

  return (
    <>
      {/* 메뉴바를 만들어서 해당 기능으로 이동 */}

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <b>
                  <Link className="nav-link active" to="/selection">
                    찜 목록({count})
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/selection">
                  닉네임 변경
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/selection">
                  비밀번호 변경
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/selection">
                  회원 탈퇴
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row row-cols-1 row-cols-md-3 g-4">{viewList}</div>

    </>
  );
}

export default Mypage;