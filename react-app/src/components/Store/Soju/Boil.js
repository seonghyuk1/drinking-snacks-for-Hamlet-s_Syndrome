/* eslint-disable*/
import { useState } from "react";

function Boil({ foodCago }) {
  const [like, setLike] = useState([false, false, false]);
  //   const toggleLike = async (e) => {
  //     // const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  //     setLike(!like);
  //   };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {foodCago &&
        foodCago.찜.map((v, i) => {
          return (
            <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
              <img src="..." class="card-img-top" />
              <div class="card-body">
                <div>
                  <h5 class="card-title">{foodCago.찜[i].식당}</h5>
                  <img
                    src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                    onClick={() => {
                      let copy = [...like];
                      copy[i] = !copy[i];
                      setLike([...copy]);

                      like[i] ? alert(foodCago.찜[i].식당 + "뺌") : alert(foodCago.찜[i].식당 + "찜목록에 담김");
                    }}
                    style={{ width: 50, height: 50 }}
                  />
                </div>
                <p class="card-text">위치 : {foodCago.찜[i].위치}</p>
                <p class="card-text">특징 : {foodCago.찜[i].특징}</p>
                <p class="card-text">평균가격 : {foodCago.찜[i].가격}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Boil;
