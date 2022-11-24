/* eslint-disable*/
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { faker } from '@faker-js/faker';
import logo from '../logo.png'
import "../styles/Login_Header.css"

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
      <nav className="navbar navbar-expand-lg bg-light navbar-light " >
        <div className="container-fluid">
          <a href="/main" class="navbar-brand">
              <img src={logo} class="d-inline-block align-middle rounded p-1" alt="내일 지구가 끝나더라도 나는 오늘 밤 최고의 술자리를 가지겠어" width="150"/>
          </a>


          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="row gx-3 collapse navbar-collapse" id="navbarSupportedContent">
            {/* 로그인 시 추가 내용 */}
            { myJWT != null &&(
            <>
            
            <div className="col">
              
                <p className="align-middle text-end">현재위치 :{" "}
                  <b>
                    {address?.city}({address?.country_code})
                  </b>
                </p>
              
            </div>
            <div className="col-2">
            <Link to="/Mypage" style={{ textDecoration: "none", color: "Black " }}>
              {/* {NickName ? (
                <p className="nav-link disabled  col-12 ">
                  환영합니다💖! <b>{NickName}</b> 님!
                </p>
              ) : (
                <p className="nav-link disabled  col-12 ">
                  환영합니다💖! <b>{ID}</b> 님!
                </p>
              )} */}
              {/* NickName && */}
              { (
                <p className="align-middle text-end nav-link disabled">
                  환영합니다💖! <b>{NickName}</b> 님!
                </p>
              )}
              {/* <p className="nav-link disabled  col-12 ">
                환영합니다💖! <b>{NickName}</b> 고객님
              </p> */}
            </Link>
            </div>
            <div className="col-1">
              <button className="btn btn-secondary press_btn ">
                <Link to="/Mypage" style={{ textDecoration: "none", color: "white " }}>
                  마이페이지
                </Link>
              </button>
            </div>

            <div className="col-1">
              <button
                className="btn btn-secondary press_btn d-grid gap-3"
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
            
          </div>


        </div>
  
       
      </nav>
    </>
  );
}

export default Header;