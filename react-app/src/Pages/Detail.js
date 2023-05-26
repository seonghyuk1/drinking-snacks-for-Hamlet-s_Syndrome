/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailData, getMyPageData, getFoodsData } from "../lib/api/food";

import axios from "axios";

function Detail() {
  // useParams의 id : 주류의 정보 0~4
  const { id } = useParams();

  const [mySelect, setMySelect] = useState([]);
  const [categories, setCategories] = useState([]);

  const [food, setFood] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodWish, setFoodWish] = useState(false);

  useEffect(() => {
    getDetailData(id).then((res) => {
      setCategories(res.data);
    });

    getMyPageData().then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  const handleClickButton = (e) => {
    const { name } = e.target;
    console.log(name);
    // 여기에서 가져온 name을 axios로 보내서 가져오기
    getFoodsData(name).then((res) => {
      setFood([...res.data.food]);
      setFoodName(res.data.name);
      // setFoodWish(!foodWish);
    });
  };

  console.log("푸네", foodName);
  console.log("푸", food);

  console.log("카", categories);
  // 들어온 페이지의 id 받아오기

  const Mine = () => {
    return (
      <>
        <div className="test2">
          <div className=" col-6 bg-light rounded p-1 mx-auto shadow-lg">
            <div className="pt-2">
              <Link to="/Mypage">
                <div className="btn col-lg-4 btn-lg  press_btn rounded mx-auto ">
                  <h4 className="text-center text-light ">찜 목록</h4>
                </div>
              </Link>
            </div>
            <div className="p-2">
              {mySelect.length != 0 ? (
                mySelect.map((v, i) => {
                  return (
                    <p className="bg-dark mx-3 p-2 text-light rounded storeOpacity">
                      {mySelect[i].식당}-{mySelect[i].평균가격}
                    </p>
                  );
                })
              ) : (
                <div className="p-1">
                  <h4 className="text-secondary">가게를 찜해보세요😋</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const images = [{ url: `/assets/snacks/${id}/0.jpg` }, { url: `/assets/snacks/${id}/1.jpg` }, { url: `/assets/snacks/${id}/2.jpg` }];

  return (
    <div className="">
      <div className="container mt-5 p-1 rounded shadow-lg">
        <h2 className="m-3 text-center text-light">
          <strong>어떤 안주를 먹을까요?</strong>
        </h2>
      </div>

      {/* 윗라인(술+추천) */}
      <div className="container pt-4">
        <div className="row mx-auto">
          <div className="col-lg-3 mx-auto test2">
            <div className="mt-2 p-1 ">
              <h2 className="m-3 text-center text-light">음료 Pick ✔</h2>
            </div>
            <img className="border border-secondary rounded img-fluid shadow-lg" src={`/assets/${id}/${id}.jpg`} id="liveToastBtn" width="250" height="250"></img>
            <div className="mt-2 p-1 ">
              <h2 className="m-3 text-center text-light">{categories.drink}</h2>
            </div>
          </div>

          <div className="col-lg-9 bg-light rounded storeOpacity">
            <div className="container m-2 p-1 rounded shadow-lg">
              <h2 className="m-3 text-center text-light">
                <strong>어울리는 안주들</strong>
              </h2>
            </div>

            <div className="test p-3">
              <SimpleImageSlider width={600} height={400} images={images} showBullets={true} showNavs={true} autoPlay={true} autoPlayDelay={3.5} />
            </div>
          </div>
        </div>
      </div>

      {/* button에 함수로 axios를 통해 서버로부터 회에 대한 정보들을 가져오도록 설정 */}

      <div className="test2">
        <div className="container bg-light rounded shadow-lg storeOpacity">
          {categories.안주개수 &&
            categories.안주개수.map((category, i) => {
              return (
                <button type="button" className="btn btn-lg press_btn g-2 m-3 rounded-pill shadow-sm" key={i} name={category} onClick={handleClickButton}>
                  {category}
                </button>
              );
            })}
        </div>
      </div>

      {/* 화면보여주기 */}

      <div className="container">
        <div className="row mx-auto pt-4">
          {food.map((v, i) => {
            return (
              <div className="col-6 col-xl-3 mx-auto">
                <div className="card mb-3 cardSize" key={i}>
                  <img className="card-img" src={`/assets/snacks/${id}/${foodName}/${i}.jpg`} alt="..." height="600px" />

                  <div className="bg-dark card-img-overlay text-white d-flex flex-column justify-content-center storeOpacity">
                    <div className="text-center p-3">
                      <img
                        src={food[i].wish ? "/assets/heart.png" : "/assets/em_heart.png"}
                        style={{ width: 50, height: 50 }}
                        // onClick={() => {
                        //   axios.get("/wish");
                        // }}
                        // 이미지를 클릭 했을 때 wish 값을 바꾸어 이미지를 변경하고 true, false값에 따라 마이페이지에 저장
                      />
                    </div>
                    <h5 className="card-title">{food[i].식당}</h5>
                    <p className="card-text">
                      <strong>위치</strong> : {food[i].위치}
                    </p>
                    <p className="card-text">
                      <strong>특징</strong> : {food[i].특징}
                    </p>
                    <p className="card-text">
                      <strong>평균가격</strong> : {food[i].가격}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <Mine />
        </div>
      </div>

      <div className="text-center">
        <button className="col-xl-2 btn btn-lg press_btn g-2 m-3">
          <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
            다른 술 고를래요
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Detail;
