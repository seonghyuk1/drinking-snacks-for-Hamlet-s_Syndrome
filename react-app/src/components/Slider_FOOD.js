/* eslint-disable   */
import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function ImageSlider_Food() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    arrow: true,
  };
  let navigate = useNavigate();
  return (
    <>
      <p className="slider_title">오늘은 뭐랑 달릴까?</p>

      <Slider {...settings}>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/soju.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <p className="fa fa-facebook">*문구창</p>
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-dribbble"></i>
                </a>
              </li> */}
            </ul>
            <div className="details">
              <h2>
                소주 <span className="job-title">4,000-5,000원</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/whi.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <p className="fa fa-facebook">*문구창</p>
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                양주 <span className="job-title">80,000-200,000원</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/wine.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <p className="fa fa-facebook">*문구창</p>
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                와인 <span className="job-title">40,000-100,000원</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/beer.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <a href="#">
                  {/* 문구창 회전 안 함 버전 */}
                  <i className="fa fa-facebook">*문구창</i>
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                맥주 <span className="job-title">5,000-6,000원</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div
              className="card-image"
              onClick={(e) => {
                e.preventDefault();
                console.log("say");
                navigate("/detail막걸리");
              }}
            >
              <img src={"/assets/Mak.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="fa fa-facebook">ㄴㅁㄴ</i>
                </a>
              </li>
            </ul>
            <div className="details">
              <h2>
                막걸리 <span className="job-title">4,000-5,000원</span>
              </h2>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}

<<<<<<< HEAD
export default ImageSlider_Food;
=======
export default ImageSlider_Food;
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
