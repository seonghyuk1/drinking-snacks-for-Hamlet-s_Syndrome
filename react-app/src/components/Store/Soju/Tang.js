/* eslint-disable*/
import axios from "axios";
import { useState } from "react";

function Tang({ foodCago, 내가찜한거 }) {
  const [like, setLike] = useState([false, false, false]);

  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내가찜한거);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {foodCago &&
          foodCago.탕.map((v, i) => {
            return (
              <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
                <img src="..." class="card-img-top" />
                <div class="card-body">
                  <div>
                    <h5 class="card-title">{foodCago.탕[i].식당}</h5>
                    <img
                      src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                      onClick={() => {
                        // like[i] ? alert(foodCago.탕[i].식당 + "뺌") : alert(foodCago.탕[i].식당 + "탕목록에 담김");

                        let copy = [...like];
                        copy[i] = !copy[i];
                        setLike([...copy]);
                        console.log("위 like", like);

                        console.log(like[i]);
                        console.log(like);

                        let body = {
                          id: sessionStorage.getItem("ID"),
                          식당: foodCago.탕[i].식당,
                          위치: foodCago.탕[i].위치,
                          특징: foodCago.탕[i].특징,
                          평균가격: foodCago.탕[i].가격,
                          좋아요: true,
                          삭제용: sessionStorage.getItem("ID") + foodCago.탕[i].식당,
                          drink: "소주",
                          종류: "찜",
                        };
                        내가찜한거.find((e) => e.식당 === foodCago.탕[i].식당) ? alert("이미 있음") : (alert("해당 상품 추가 완료"), axios.post("/selection", body));
                        // 내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당) && alert("이미있음");
                        // !내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당) ? (axios.post("/selection", body), alert("추가 완료요")) : alert("이미 있으므로 추가 안 됨");
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  {/* {console.log(!내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당))} */}
                  <p class="card-text">위치 : {foodCago.탕[i].위치}</p>
                  <p class="card-text">특징 : {foodCago.탕[i].특징}</p>
                  <p class="card-text">평균가격 : {foodCago.탕[i].가격}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Tang;
