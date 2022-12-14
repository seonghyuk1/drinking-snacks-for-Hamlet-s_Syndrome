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
    // autoPlay: true,
    arrows: true,
    cssEase: "linear",
  };
  const navigate = useNavigate();
  // useEffect(() => {
  //   sessionStorage.getItem("ID") && location.replace("/");
  // }, []);
  useEffect(() => {
    {
      myJWT == null && navigate("/");
    }
  }, []);
  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }];
  return (
    <>
      <div class="container mt-5 p-1 rounded shadow-lg">
        <h2 class="m-3 text-center text-light">
          <strong>무슨 술을 마실까요?🍻</strong>
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
                  <Link to={"/detail/0"} onClick={() => {}}>
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
            <div class="container mt-2 p-1 rounded shadow-lg">
              <h2 class="m-3 text-center text-light">
                <strong>✨Weekly✨ 안주</strong>
              </h2>
            </div>
            <div class="pt-3 mx-auto testBOX ">
              <SimpleImageSlider width={500} height={350} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={2.0} />
            </div>
          </div>

          <div className="col-lg-7 ">
            <div class="mx-auto">
              <ChatContainer />
            </div>
          </div>
        </div>
      </div>

      {/* <h1>주간 베스트 안주 & 식당의 이미지와 정보 | </h1> */}

      <div style={{ clear: "both" }}></div>
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

export default Main;
