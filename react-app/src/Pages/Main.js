/* eslint-disable */
import { useEffect, useState, useRef } from "react";
// import ImageSlider from "../components/Slider";
import "../styles/Main.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleImageSlider from "react-simple-image-slider";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:80");

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

  const myJWT = sessionStorage.getItem("JWT");
  // 토큰 없을 시 로그인으로
  const userName = sessionStorage.getItem("ID");

  // 무한 렌더링 방지
  useEffect(() => {
    {
      myJWT == null && navigate("/");
    }
  }, []);

  useEffect(() => {
    const URL =
      "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setAddress(data));
  }, []);

  //서버에 메세지 보내기
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  const [receiveMessage, setReceiveMessage] = useState("");

  //모든 처리 완료시 socket 닫기
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  //서버로 부터 받은 메세지 뿌리기
  const listGroup = useRef(null);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage(data.message);
      // setChatArr((chatArr) => chatArr.concat(message));
      console.log(data.message);
      listGroup.current.append(
        React.createElement(
          "li",
          { className: "list-group-item" },
          { receiveMessage }
        )
      );
    });
  }, []);

 
  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }];

  return (
    <>
      <p className="slider_title mt-3">오늘은 뭐로 달릴까?</p>
      <span>옆으로 스와이프하여 넘겨주세요!</span>

      <Slider {...settings}>
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
                  <p className="fa fa-facebook">*문구창가나다라마바사아자차카타파하가나다라마바사아자차카타파하</p>
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
      <h3>채팅방</h3>
      <ul class="list-group" ref={listGroup}>
        <li class="list-group-item">{receiveMessage}</li>
      </ul>
      <input
        id="input1"
        placeholder="메세지 입력하기"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>등록</button>

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
      </div>
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
