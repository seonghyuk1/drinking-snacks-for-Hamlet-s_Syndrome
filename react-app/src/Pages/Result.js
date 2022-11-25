/* eslint-disable */
// import Slider_Food from "../components/Slider_FOOD";
// // import "../styles/Main.css";
// import styled from "styled-components";
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import Header from "../components/Header";
import Footer from "../components/Footer";
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae

function Detail() {
  let navigate = useNavigate();
  const images = [{ url: "/assets/soju.jpg" }, { url: "images/2.jpg" }, { url: "images/3.jpg" }, { url: "images/4.jpg" }, { url: "images/5.jpg" }, { url: "images/6.jpg" }, { url: "images/7.jpg" }];
  return (
    <>
      <p>대표 안주 표시 - 훑어보기</p>

      <h1>안주 추천 받기 명수입력 - 안주 이름 (안주이름만 DB저장) | 사진은 로컬 명수에 따라 안주 이미지 보여줌 </h1>
      <h1>안주 누르면 평균 가격대와 근처 식당 - GET 데베에 저장된 식당 정보 가격대로 다르게 | POST 세션에 유저 아이디, 위에서 선택한 안주이름, 식당</h1>
      <h4>이전 (주류선택), 다음 (Result) 버튼 </h4>
      <button className="btn btn-secondary mx-3">
        <Link to="/result" style={{ textDecoration: "none" }}>
          이전
        </Link>
      </button>
      <button className="btn btn-secondary mx-3 " onClick={() => navigate("/Result")}>
        다음
      </button>
<<<<<<< HEAD
=======

>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
    </>
  );
}

<<<<<<< HEAD
export default Detail;
=======
export default Detail;
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
