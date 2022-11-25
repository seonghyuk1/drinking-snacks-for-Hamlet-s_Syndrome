/* eslint-disable */
<<<<<<< HEAD
// import { useEffect, useState, useRef } from "react";
=======
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
// import ImageSlider from "../components/Slider";
import "../styles/Main.css";
import React from "react";
import Slider from "react-slick";
<<<<<<< HEAD
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";

function Main() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoPlay: true,
    arrows: true,
    cssEase: "linear",
  };
  const navigate = useNavigate();

  const images = [
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
    { url: "/assets/soju.jpg" },
  ];
=======
import "../styles/slick.css"
import "../styles/slick-theme.css"
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Link, useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
// 소켓



function Main() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoPlay: true,
    // arrows: true,
    cssEase: "linear",
    
    
  
  };
  
  const navigate = useNavigate();
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae

  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/0/0.jpg" }, { url: "/assets/1/1.jpg" }, { url: "/assets/2/2.jpg" }, { url: "/assets/3/3.jpg" }, { url: "/assets/4/4.jpg" }, { url: "/assets/soju.jpg" }];
  return (
    <>
<<<<<<< HEAD
      <span>옆으로 스와이프하여 넘겨주세요!</span>

      <Slider {...settings} style={{ display: "flex" }}>
=======
      <div class="container mt-5 p-1 rounded shadow-lg">
      <h2 class="m-3 text-center text-light"><strong>무슨 술을 마실까요?🍻</strong></h2>
      </div>
      <div class="col-11 mx-auto">
      <Slider {...settings}  className="slider_center" dotsClass="test-css">
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/0/0.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <Link to={"/detail/0"} onClick={() => {}}>
                  <p className="fa fa-facebook">*문구창</p>
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
<<<<<<< HEAD
                소주{" "}
                <span className="job-title">평균가격 4,500원 | 도수 16</span>
=======
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
                  <p className="fa fa-facebook">*문구창</p>
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
                  <p className="fa fa-facebook">*문구창</p>
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
                  <p className="fa fa-facebook">*문구창</p>
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
                맥주 <span className="job-title">평균 가격 5,000원 | 평균도수 5</span>
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
              </h2>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/1/1.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <Link to={"/detail/1"} onClick={() => {}}>
                  <p className="fa fa-facebook">*문구창</p>
=======

        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/4/4.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <Link to={"/detail/4"}>
                  <p className="fa fa-facebook">*문구창가나다라마바사아자차카타파하가나다라마바사아자차카타파하</p>
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
<<<<<<< HEAD
                양주{" "}
                <span className="job-title">
                  {" "}
                  평균가격 90,000원 | 평균도수 30
                </span>
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
                  <p className="fa fa-facebook">*문구창</p>
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
                와인{" "}
                <span className="job-title">
                  {" "}
                  평균가격 50,000원 | 평균도수 13
                </span>
=======
                막걸리 <span className="job-title">평균가격 4,000원 | 평균도수 5</span>
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
              </h2>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="card-wrapper">
          <div className="card">
            <div className="card-image">
              <img src={"/assets/3/3.jpg"} />
            </div>
            <ul className="social-icons">
              <li>
                <Link to={"/detail/3"} onClick={() => {}}>
                  <p className="fa fa-facebook">*문구창</p>
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
                맥주{" "}
                <span className="job-title">
                  평균 가격 5,000원 | 평균도수 5
                </span>
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
                  <p className="fa fa-facebook">
                    *문구창가나다라마바사아자차카타파하가나다라마바사아자차카타파하
                  </p>
                </Link>
              </li>
            </ul>
            <div className="details">
              <h2>
                막걸리{" "}
                <span className="job-title">평균가격 4,000원 | 평균도수 5</span>
              </h2>
            </div>
          </div>
        </div>
      </Slider>
      <div className="test">
        <SimpleImageSlider
          width={468}
          height={300}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.0}
        />
=======

      </Slider>

      </div>

      
      <div className="test2">
        {/* <SimpleImageSlider width={468} height={300} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={2.0} /> */}
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
        <ChatContainer />
      </div>
      <h1>주간 베스트 안주 & 식당의 이미지와 정보 | </h1>

      <div style={{ clear: "both" }}></div>
<<<<<<< HEAD
=======
      
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
    </>
  );
}

// const content = [
//   {
//       cate : {
//           sentence: "문구창",
//           drink : "소주",
//           price_info : "평균가격 4,500원 | 평균도수 16"
//       }
//   },
//   {
//       cate : {
//           sentence: "문구창",
//           drink : "양주",
//           price_info : "평균가격 90,000원 | 평균도수 35"
//       }
//   },
//   {
//       cate : {
//           sentence: "문구창",
//           drink : "와인",
//           price_info : "평균가격 40,000원 | 평균도수 9"
//       }
//   },
//   {
//       cate : {
//           sentence: "문구창",
//           drink : "맥주",
//           price_info : "평균가격 5,000원 | 평균도수 5"
//       }
//   },
//   {
//       cate : {
//           sentence: "문구창",
//           drink : "막걸리",
//           price_info : "평균가격 4,000원 | 평균도수 5"
//       }
//   }
// ]

// {content.map((v, i)=>{
//   <div className="card-wrapper">
//   <div className="card">
//     <div className="card-image">
//       <img src={`/assets/${i}/${i}.jpg`} />
//     </div>
//     <ul className="social-icons">
//       <li>
//         <Link to={`/detail/${i}`} onClick={() => {}}>
//           <p className="fa fa-facebook">{v.cate.sentence}</p>
//         </Link>
//       </li>
//     </ul>
//     <div className="details">
//       <h2>
//         {v.cate.drink} <span className="job-title">{v.price_info}</span>
//       </h2>
//     </div>
//   </div>
// </div>
// })}

<<<<<<< HEAD
export default Main;
=======
export default Main;
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
