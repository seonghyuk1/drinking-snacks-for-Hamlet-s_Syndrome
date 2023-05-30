/* eslint-disable*/
import axios from "axios";
import { useState } from "react";
import "../../../styles/Store.css";

function Jock({ foodCago, 내거, Mine }) {
  const [like, setLike] = useState([false, false, false, false]);

  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내거);

  return (
    <>
      <div className="container">
        <div className="row mx-auto pt-4">
          {foodCago &&
            foodCago.족발.map((v, i) => {
              return (
                <div class="col-6 col-xl-3 mx-auto">
                  <div class="card mb-3 cardSize" key={i}>
                    <img class="card-img" src={`/assets/snacks/0/Jock/${i}.jpg`} alt="..." height="600px" />
                    <div class="bg-dark card-img-overlay text-white d-flex flex-column justify-content-center storeOpacity">
                      <div className="text-center p-3">
                        <img
                          // src={내거[i].좋아요 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                          src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                          onClick={() => {
                            let copy = [...like];
                            copy[i] = !copy[i];
                            setLike([...copy]);

                            let body = {
                              id: sessionStorage.getItem("ID"),
                              식당: foodCago.족발[i].식당,
                              위치: foodCago.족발[i].위치,
                              특징: foodCago.족발[i].특징,
                              평균가격: foodCago.족발[i].가격,
                              좋아요: true,
                              삭제용: sessionStorage.getItem("ID") + foodCago.족발[i].식당,
                              drink: "소주",
                              종류: "족발",
                              사진: "/assets/0/0.jpg",
                            };

                            {
                              !내거.find((e) => e.식당 === foodCago.족발[i].식당) ? (alert("해당 상품이 마이페이지 찜목록에 추가 되었습니다."), axios.post("/selection", body).then(내거.push(body))) : alert("이미 찜목록에 존재하므로 찜목록 담기가 불가합니다.");
                            }
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </div>

                      <h5 class="card-title">{foodCago.족발[i].식당}</h5>
                      <p class="card-text">
                        <strong>위치</strong> : {foodCago.족발[i].위치}
                      </p>
                      <p class="card-text">
                        <strong>특징</strong> : {foodCago.족발[i].특징}
                      </p>
                      <p class="card-text">
                        <strong>평균가격</strong> : {foodCago.족발[i].가격}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          <Mine />
        </div>
      </div>
    </>
  );
}

export default Jock;

// const data2 = [
//   {
//     식당: '광명수산',
//     가격: '85,000',
//     특징: '리뷰多 양多',
//     위치: '서울 성북구 동소문로 125 골든타워',
//     wish: false
//   },
//   {
//     식당: '남해바다마차',
//     가격: '55,000',
//     특징: '리뷰多 신선',
//     위치: '서울 노원구 동일로122길 메가빌딩 102호',
//     wish: true
//   },
//   {
//     식당: '탐라도회',
//     가격: '100,000',
//     특징: '가격高 분위기高',
//     위치: '서울 노원구 동일로 1101',
//     wish: true
//   },
//   {
//     식당: '싱싱오징어바다',
//     가격: '20,000',
//     특징: '인심좋음 많은양 합리적인가격',
//     위치: '서울 노원구 동일로192길 30 은성택시(주)',
//     wish: false
//   }
// ];

// const data1 = [
//   {
//     avgPrice: "85,000",
//     deleteId: "coco1광명수산",
//     drink: "소주",
//     feature: "리뷰多 양多",
//     foodCategory: "회",
//     foodImg: "/assets/snacks/0/회/0.jpg",
//     restaurantName: "광명수산",
//     storeLoction: "서울 성북구 동소문로 125 골든타워",
//     userId: "coco1",
//     wish: true,
//     _id: "6475d2d81182b48ea481f1c6"
//   },
//   {
//     avgPrice: "55,000",
//     deleteId: "coco1남해바다마차",
//     drink: "소주",
//     feature: "리뷰多 신선",
//     foodCategory: "회",
//     foodImg: "/assets/snacks/0/회/1.jpg",
//     restaurantName: "남해바다마차",
//     storeLoction: "서울 노원구 동일로122길 메가빌딩 102호",
//     userId: "coco1",
//     wish: true,
//     _id: "6475d2e01182b48ea481f1c8"
//   }
// ];

// data1의 restaurantName과 data2의 식당이 같다면 data1의 wish를 true

// {food[i].식당 === wishFood[i].restaurantName ? (
//   <img
//     src={"/assets/heart.png"}
//     className="heart_img"
//     // 0529 ★ wish값을 food에서가 아니라 자신의 selection에서 수정해줘야 함
//     // selection에 있는 정보로 하트 이미지 표시
//     onClick={() => {
//       // wish는 나중에 자신의 selection에 해당하는 wish를 바꾸도록
//       // updateFoodWish(food[i].식당, !food[i].wish);

//       // getFoodsData(foodName).then((res) => {
//       // setFood([...res.data.food]);
//       // 찜목록 데이터 보내기 구현
//       // });

//       insertWishList(food[i].식당, categories.drink, foodName, food[i].가격, userId, food[i].위치, food[i].특징, userId + food[i].식당, `/assets/snacks/${id}/${foodName}/${i}.jpg`, true);
//     }}

//     // (name, drink, selectedFoodCate, avgPrice, id, storeLocation, feature, deleteId, foodImg, wish)
//   />
// ) : (
//   <img
//     src={"/assets/em_heart.png"}
//     className="heart_img"
//     // 0529 ★ wish값을 food에서가 아니라 자신의 selection에서 수정해줘야 함
//     // selection에 있는 정보로 하트 이미지 표시
//     onClick={() => {
//       // wish는 나중에 자신의 selection에 해당하는 wish를 바꾸도록
//       // updateFoodWish(food[i].식당, !food[i].wish);

//       // getFoodsData(foodName).then((res) => {
//       // setFood([...res.data.food]);
//       // 찜목록 데이터 보내기 구현
//       // });

//       insertWishList(food[i].식당, categories.drink, foodName, food[i].가격, userId, food[i].위치, food[i].특징, userId + food[i].식당, `/assets/snacks/${id}/${foodName}/${i}.jpg`, true);
//     }}

//     // (name, drink, selectedFoodCate, avgPrice, id, storeLocation, feature, deleteId, foodImg, wish)
//   />
// )}
