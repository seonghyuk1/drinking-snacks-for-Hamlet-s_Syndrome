/* eslint-disable*/
import axios from "axios";
import { useState } from "react";
import "../../../styles/Store.css";

function Ham({ foodCago, 내거, Mine }) {
  const [like, setLike] = useState([false, false, false, false]);

  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내거);

  return (
    <>
      <div className="container">
        <div className="row mx-auto pt-4">
          {foodCago &&
            foodCago.함박스테이크.map((v, i) => {
              return (
                <div class="col-6 col-xl-3 mx-auto">
                  <div class="card mb-3 cardSize" key={i}>
                    <img class="card-img" src={`/assets/snacks/1/Ham/${i}.jpg`} alt="..." height="600px"/>
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
                              식당: foodCago.함박스테이크[i].식당,
                              위치: foodCago.함박스테이크[i].위치,
                              특징: foodCago.함박스테이크[i].특징,
                              평균가격: foodCago.함박스테이크[i].가격,
                              좋아요: true,
                              삭제용: sessionStorage.getItem("ID") + foodCago.함박스테이크[i].식당,
                              drink: "양주",
                              종류: "함박스테이크",
                              사진: "/assets/1/1.jpg",
                            };

                            {
                              !내거.find((e) => e.식당 === foodCago.함박스테이크[i].식당) ? (alert("해당 상품이 마이페이지 찜목록에 추가 되었습니다."), axios.post("/selection", body).then(내거.push(body))) : alert("이미 찜목록에 존재하므로 찜목록 담기가 불가합니다.");
                            }
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </div>

                      <h5 class="card-title">{foodCago.함박스테이크[i].식당}</h5>
                      <p class="card-text">
                        <strong>위치</strong> : {foodCago.함박스테이크[i].위치}
                      </p>
                      <p class="card-text">
                        <strong>특징</strong> : {foodCago.함박스테이크[i].특징}
                      </p>
                      <p class="card-text">
                        <strong>평균가격</strong> : {foodCago.함박스테이크[i].가격}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Ham;
