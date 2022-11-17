/* eslint-disable*/
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import faker from "faker";

function Header() {
  faker.locale = "ko";

  const ID = sessionStorage.getItem("ID");
  const NickName = sessionStorage.getItem("Nickname");
  const myJWT = sessionStorage.getItem("JWT");

  let navigate = useNavigate();

  const [address, setAddress] = useState("");

  // 무한 렌더링 방지
  // 토큰 없을 시 로그인으로
  // 위치 받아오기
  useEffect(() => {
    myJWT == null ? navigate("/") : navigate("/Main");
    const URL = "https://geolocation-db.com/json/2725d960-5eef-11ed-9b62-857a2b26943e";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setAddress(data));
  }, []);

  // console.log(faker.address.cityName());
  // faker.internet.userName()추후 채팅방에 사용
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" style={{ width: "100%" }}>
        <div className="container-fluid">
          <a className="navbar-brand m-3" href="/main">
            우리는 오늘 어떤 한 잔의 추억을 쌓을까? 🍻
          </a>
        </div>
        {myJWT != null && (
          <>
            <button className="btn btn-secondary mx-5">
              <Link to="/Mypage" style={{ textDecoration: "none", color: "white " }}>
                마이페이지
              </Link>
            </button>

            <span>
              현재위치 :{" "}
              <b>
                {address?.city}({address?.country_code})
              </b>
            </span>
            <div>
              {NickName ? (
                <p className="nav-link disabled  col-12 ">
                  환영합니다💖! <b>{NickName + ID.slice(-3)}</b> 님!
                </p>
              ) : (
                <p className="nav-link disabled  col-12 ">
                  환영합니다💖! <b>{ID}</b> 님!
                </p>
              )}
              {/* <p className="nav-link disabled  col-12 ">
                환영합니다💖! <b>{NickName}</b> 고객님
              </p> */}
            </div>
            <div>
              <button
                className="btn btn-secondary col-12 "
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.clear();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default Header;
