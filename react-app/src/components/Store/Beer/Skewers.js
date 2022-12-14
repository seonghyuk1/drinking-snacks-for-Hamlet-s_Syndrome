/* eslint-disable*/
import axios from "axios";
import { useState } from "react";

function Skewers({ foodCago, 내거, Mine }) {
  const [like, setLike] = useState([false, false, false, false]);

  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내거);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {foodCago &&
          foodCago.닭꼬치.map((v, i) => {
            return (
              <div class="card mb-3 h-100" style={{ maxWidth: 500 }} key={i}>
                <img src="..." class="card-img-top" />
                <div class="card-body">
                  <div>
                    <h5 class="card-title">{foodCago.닭꼬치[i].식당}</h5>
                    <img
                      // src={내거[i].좋아요 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                      src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                      onClick={() => {
                        let copy = [...like];
                        copy[i] = !copy[i];
                        setLike([...copy]);

                        let body = {
                          id: sessionStorage.getItem("ID"),
                          식당: foodCago.닭꼬치[i].식당,
                          위치: foodCago.닭꼬치[i].위치,
                          특징: foodCago.닭꼬치[i].특징,
                          평균가격: foodCago.닭꼬치[i].가격,
                          좋아요: true,
                          삭제용: sessionStorage.getItem("ID") + foodCago.닭꼬치[i].식당,
                          drink: "소주",
                          종류: "닭꼬치",
                        };

                        {
                          !내거.find((e) => e.식당 === foodCago.닭꼬치[i].식당) ? (alert("해당 상품이 마이페이지 찜목록에 추가 되었습니다."), axios.post("/selection", body).then(내거.push(body))) : alert("이미 찜목록에 존재하므로 찜목록 담기가 불가합니다.");
                        }
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  <p class="card-text">위치 : {foodCago.닭꼬치[i].위치}</p>
                  <p class="card-text">특징 : {foodCago.닭꼬치[i].특징}</p>
                  <p class="card-text">평균가격 : {foodCago.닭꼬치[i].가격}</p>
                </div>
              </div>
            );
          })}

        <Mine />
      </div>
    </>
  );
}

export default Skewers;
