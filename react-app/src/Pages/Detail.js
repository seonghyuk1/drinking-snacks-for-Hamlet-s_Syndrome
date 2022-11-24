/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detail() {
  let navigate = useNavigate();
  let [category, setCategory] = useState([]);
  // 들어온 페이지의 id 받아오기
  let { id } = useParams();

  // 페이지의 id값과 일치하는 주류 데이터베이스에서 찾아오기
  useEffect(() => {
    axios.get("detail").then((응답) => {
      // console.log(응답.data[id]);
      // setCategory(...응답.data[id]);
      // console.log(category);
      let copy = [...category];
      copy = 응답.data[id];
      setCategory(copy);
    });
  }, []);
  console.log(category);
  console.log(category.drink);

  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }];
  return (
    <div className="test2">
      <h1>{category.drink}</h1>
      <img src={`/assets/${id}/${id}.jpg`}></img>
      <p>대표 안주 표시 - 훑어보기 - 데이터베이스에 경로 저장해서 가져오기로</p>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          getCategory();
        }}
      >
        테스트
      </button> */}

      <div className="test">
        <SimpleImageSlider width={896} height={504} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={2.0} />
      </div>
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
    </div>
  );
}

export default Detail;