/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailData, getMyPageData, getFoodsData, insertWishList, deleteWishList } from "../lib/api/food";
import WishListView from "./WishListView";

import axios from "axios";

function Detail() {
  // useParams의 id : 주류의 정보 0~4
  const { id } = useParams();
  const userId = sessionStorage.getItem("userId");

  const [mySelect, setMySelect] = useState([]);
  const [categories, setCategories] = useState([]);

  const [food, setFood] = useState([]);
  const [foodName, setFoodName] = useState("");

  const [wishFood, setWishFood] = useState([]);

  useEffect(() => {
    getDetailData(id).then((res) => {
      setCategories(res.data);
    });

    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  const handleClickButton = (e) => {
    const { name } = e.target;

    // 여기에서 가져온 name(안주종류)을 axios로 보내서 해당 안주에 대한 식당 정보 가져오기
    getFoodsData(name).then((res) => {
      setFood([...res.data.food]);
      setFoodName(res.data.name);
    });

    const filteredData = mySelect.filter((item) => item.foodCategory === name);
    setWishFood(filteredData);
  };

  const handleWishToggle = (restaurantName) => {
    // 찜 목록에서 해당 식당과 일치하는 항목의 인덱스를 찾기
    const matchingIndex = wishFood.findIndex((wishItem) => wishItem.restaurantName === restaurantName);

    // 찜 목록에 없는 경우, 추가
    if (matchingIndex === -1) {
      // food 배열에서 식당 이름과 일치하는 항목을 찾기
      const matchingFood = food.find((foodItem) => foodItem.식당 === restaurantName);
      if (matchingFood) {
        // 찜 목록에 추가할 새로운 항목을 생성
        const newWishItem = {
          restaurantName: matchingFood.식당,
          wish: true,
        };
        // 기존의 wishFood 배열에 새로운 항목을 추가하여 업데이트
        setWishFood([...wishFood, newWishItem]);
        alert("찜 목록에 추가 완료되었습니다.");
      }
    }
    // 찜 목록에 이미 있는 경우, 제거
    else {
      // wishFood 배열에서 matchingIndex에 해당하는 항목을 제거
      // 전개연산자 유의 - 불변성 법칙 : 리액트는 상태가 변경되었음을 감지하고 컴포넌트를 업데이트
      // 배열 자체라면 같은 배열의 참조이기 때문에 변경이 감지되지 않을 수 있음
      const updatedWishFood = [...wishFood];
      updatedWishFood.splice(matchingIndex, 1);
      // 업데이트된 wishFood 배열로 설정하여 업데이트
      setWishFood(updatedWishFood);
      alert("찜 목록에서 제거 완료되었습니다.");
    }
  };
  console.log("위푸", wishFood);
  console.log("푸네", foodName);
  console.log("푸", food);
  console.log("카", categories);
  console.log("셀렉", mySelect);

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

      {/* button에 함수로 axios를 통해 서버로부터 각 식당에 대한 정보들을 가져오도록 설정 */}

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

      {/* 화면 보여주기 */}
      <div className="container">
        <div className="row mx-auto pt-4">
          {food.map((foodItem, i) => {
            const matchingData = wishFood.find((wishItem) => wishItem.restaurantName === foodItem.식당);
            const isWished = matchingData ? matchingData.wish : false;
            return (
              <div className="col-6 col-xl-3 mx-auto">
                <div className="card mb-3 cardSize" key={i}>
                  <img className="card-img" src={`/assets/snacks/${id}/${foodName}/${i}.jpg`} alt="foodImg" height="600px" />

                  <div className="bg-dark card-img-overlay text-white d-flex flex-column justify-content-center storeOpacity">
                    <div className="text-center p-3">
                      {isWished ? (
                        <img
                          src={"/assets/heart.png"}
                          className="heart_img"
                          onClick={() => {
                            handleWishToggle(foodItem.식당);
                            deleteWishList(userId + food[i].식당);
                            getMyPageData(userId).then((res) => {
                              setMySelect([...res.data]);
                            });
                          }}
                        />
                      ) : (
                        <img
                          src={"/assets/em_heart.png"}
                          className="heart_img"
                          onClick={() => {
                            handleWishToggle(foodItem.식당);
                            insertWishList(food[i].식당, categories.drink, foodName, food[i].가격, userId, food[i].위치, food[i].특징, userId + food[i].식당, `/assets/snacks/${id}/${foodName}/${i}.jpg`, true);
                            getMyPageData(userId).then((res) => {
                              setMySelect([...res.data]);
                            });
                          }}
                        />
                      )}
                      <h5 className="card-title">{food[i].식당}</h5>
                      <p className="card-text">
                        <strong>위치</strong> : {food[i].위치}
                      </p>
                      <p className="card-text">
                        <strong>특징</strong> : {food[i].특징}
                      </p>
                      <p className="card-text">
                        <strong>평균가격</strong> : {food[i].가격}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <WishListView mySelect={mySelect} />
        </div>
      </div>

      <div className="text-center">
        <button className="col-xl-2 btn btn-lg press_btn g-2 m-3 hover-opacity">
          <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
            다른 술 고를래요
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Detail;
