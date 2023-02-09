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
// 소켓

function Main() {
  const myJWT = sessionStorage.getItem("JWT");

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "linear",
  };
  const navigate = useNavigate();

  useEffect(() => {
    {
      myJWT == null && navigate("/");
    }
  }, []);
  const images = [
    { url: "/assets/snacks/0/Jock/0.jpg" },
    { url: "/assets/snacks/3/Chicken/0.jpg" },
    { url: "/assets/snacks/2/Gambas/0.jpg" },
    { url: "/assets/snacks/3/Pizza/0.jpg" },
    { url: "/assets/snacks/3/Sausage/0.jpg" },
    { url: "/assets/snacks/4/Bossam/0.jpg" },
    { url: "/assets/snacks/4/Pig/2.jpg" },
  ];
  return (
    <>
      <div class="container mt-5 p-1 rounded shadow-lg col-7">
        <h2 class="m-3 text-center text-light">
          <strong>어떤 술을 마실까요? 🍻</strong>
        </h2>
      </div>

      <div class="col-8 mx-auto">
        <Slider {...settings} className="slider_center" dotsClass="test-css">
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={"/assets/0/0.jpg"} />
              </div>
              <ul className="social-icons">
                <li>
                  <Link to={"/detail/0"}>
                    <p className=" fa fa-facebook">마시는 것이 힘이다</p>
                  </Link>
                </li>
              </ul>
              <div className="details">
                <h2>
                  소주 <span className="job-title">평균가격 4,500원 | 도수 16</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={"/assets/1/1.jpg"} />
              </div>
              <ul className="social-icons">
                <li>
                  <Link to={"/detail/1"} onClick={() => {}}>
                    <p className="fa fa-facebook">
                      나의 사전에 <br></br>금주란 없다
                    </p>
                  </Link>
                </li>
              </ul>
              <div className="details">
                <h2>
                  양주 <span className="job-title"> 평균가격 90,000원 | 평균도수 30</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={"/assets/2/2.jpg"} />
              </div>
              <ul className="social-icons">
                <li>
                  <Link to={"/detail/2"} onClick={() => {}}>
                    <p className="fa fa-facebook">
                      나는 음주한다<br></br> 고로 나는 존재한다
                    </p>
                  </Link>
                </li>
              </ul>
              <div className="details">
                <h2>
                  와인 <span className="job-title"> 평균가격 50,000원 | 평균도수 13</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={"/assets/3/3.jpg"} />
              </div>
              <ul className="social-icons">
                <li>
                  <Link to={"/detail/3"} onClick={() => {}}>
                    <p className="fa fa-facebook">
                      내일 지구의 종말이 온다고 해도<br></br> 나는 오늘 한 잔의 술을 들겠다
                    </p>
                  </Link>
                </li>
              </ul>
              <div className="details">
                <h2>
                  맥주 <span className="job-title">평균 가격 5,000원 | 평균도수 5</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image">
                <img src={"/assets/4/4.jpg"} />
              </div>
              <ul className="social-icons">
                <li>
                  <Link to={"/detail/4"}>
                    <p className="fa fa-facebook">신은 음주하는 자를 결코 버리지 않는다</p>
                  </Link>
                </li>
              </ul>
              <div className="details">
                <h2>
                  막걸리 <span className="job-title">평균가격 4,000원 | 평균도수 5</span>
                </h2>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div class="container  mt-5 p-1 rounded ">
        <div className="mt-5 row mx-auto ">
          <div className="col-lg-5  mx-auto">
            <div class="container mt-2 p-1 rounded shadow-lg col-12">
              <h2 class="m-3 text-center text-light">
                <strong>주간베스트 안주 🍽</strong>
              </h2>
            </div>
            <div class="pt-3 mx-auto testBOX ">
              <SimpleImageSlider width={500} height={350} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={2.0} />
            </div>
          </div>

          <div className="col-lg-7 ">
            <div class="mx-auto">
              <div class="container mt-2 p-1 rounded shadow-lg my-3 col-9">
                <h2 class="m-3 text-center text-light">
                  <strong>술덕후 모임소 🥂</strong>
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
