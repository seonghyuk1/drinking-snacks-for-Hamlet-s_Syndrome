/* eslint-disable */
// import ImageSlider from "../components/Slider";
import "../styles/Main.css";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";

function Main() {
  const myJWT = sessionStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: -50, behavior: "smooth" }); // 화면의 스크롤바를 제일 상단으로 이동
    if (!myJWT) navigate("/");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "linear",
  };

  return (
    <>
      <div className="container mt-5 p-1 rounded shadow-lg">
        <h2 className="m-3 text-center text-light">
          <strong>
            어떤 술을 마실까요?
            <h5 style={{ marginTop: "10px" }}>
              <i>명언을 클릭해보세요!</i>
            </h5>
          </strong>
        </h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 mx-auto">
            <Slider {...settings} className="slider_center" dotsClass="test-css">
              {cards.map((card) => (
                <div className="card-wrapper" key={card.id}>
                  <div className="card">
                    <div className="card-image">
                      <img src={card.imageUrl} alt="Card" />
                    </div>
                    <ul className="social-icons">
                      <li>
                        <Link to={card.link}>
                          <p className="fa fa-facebook">{card.title}</p>
                        </Link>
                      </li>
                    </ul>
                    <div className="details">
                      <h2>
                        {card.category} <span className="job-title">{card.description}</span>
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="container mt-5 p-1 rounded">
        <div className="row">
          <div className="col-lg-5 mx-auto">
            <div className="container mt-2 p-1 rounded shadow-lg">
              <h2 className="m-3 text-center text-light">
                <strong>주간베스트 안주</strong>
              </h2>
            </div>
            <div className="pt-3 mx-auto testBOX">
              <SimpleImageSlider width={400} height={350} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={2.0} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="mx-auto">
              <div className="container mt-2 p-1 rounded shadow-lg my-3">
                <h2 className="m-3 text-center text-light">
                  <strong>술덕후 모임소</strong>
                </h2>
              </div>
              <ChatContainer />
            </div>
          </div>
        </div>
      </div>

      <div style={{ clear: "both" }}></div>
    </>
  );
}

export default Main;

// 슬라이더에 들어갈 이미지
const images = [
  { url: "/assets/snacks/0/Jock/0.jpg" },
  { url: "/assets/snacks/3/Chicken/0.jpg" },
  { url: "/assets/snacks/2/Gambas/0.jpg" },
  { url: "/assets/snacks/3/Pizza/0.jpg" },
  { url: "/assets/snacks/3/Sausage/0.jpg" },
  { url: "/assets/snacks/4/Bossam/0.jpg" },
  { url: "/assets/snacks/4/Pig/2.jpg" },
];

// 카드에 그릴 정보들
const cards = [
  {
    id: 0,
    imageUrl: "/assets/0/0.jpg",
    link: "/detail/0",
    title: "마시는 것이\n 곧, 힘이다.",
    category: "소주",
    description: "평균가격 4,500원 | 도수 16",
  },
  {
    id: 1,
    imageUrl: "/assets/1/1.jpg",
    link: "/detail/1",
    title: "나의 사전에\n 금주란 없다.",
    category: "양주",
    description: "평균가격 90,000원 | 평균도수 30",
  },
  {
    id: 2,
    imageUrl: "/assets/2/2.jpg",
    link: "/detail/2",
    title: "나는 음주한다.\n 고로 존재한다.",
    category: "와인",
    description: "평균가격 50,000원 | 평균도수 13",
  },
  {
    id: 3,
    imageUrl: "/assets/3/3.jpg",
    link: "/detail/3",
    title: "내일 지구가 멸망하더라도\n 나는 오늘 한 잔의 술을 들겠다.",
    category: "맥주",
    description: "평균 가격 5,000원 | 평균도수 5",
  },
  {
    id: 4,
    imageUrl: "/assets/4/4.jpg",
    link: "/detail/4",
    title: "신은 음주하는 자를 결코 버리지 않는다.",
    category: "막걸리",
    description: "평균가격 4,000원 | 평균도수 5",
  },
];
