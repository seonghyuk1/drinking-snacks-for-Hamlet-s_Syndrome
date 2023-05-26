/* eslint-disable*/
import axios from "axios";
import { useState } from "react";
import "../../../styles/Store.css";

function Boil({ foodCago, 내거, Mine }) {
  const [like, setLike] = useState([false, false, false, false]);

  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내거);

  return (
    <>
      <div className="container">
        <div className="row mx-auto pt-4">
          {foodCago &&
            foodCago.찜.map((v, i) => {
              return (
                <div class="col-6 col-xl-3 mx-auto">
                  <div class="card mb-3 cardSize" key={i}>
                    <img class="card-img" src={`/assets/snacks/0/Boil/${i}.jpg`} alt="..." height="600px" />
                    <div class="bg-dark card-img-overlay text-white d-flex flex-column justify-content-center storeOpacity">
                      <div className="text-center p-3">
                        <img
                          // src={내거[i].좋아요 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                          src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                          style={{ width: 50, height: 50 }}
                        />
                      </div>

                      <h5 class="card-title">{foodCago.찜[i].식당}</h5>
                      <p class="card-text">
                        <strong>위치</strong> : {foodCago.찜[i].위치}
                      </p>
                      <p class="card-text">
                        <strong>특징</strong> : {foodCago.찜[i].특징}
                      </p>
                      <p class="card-text">
                        <strong>평균가격</strong> : {foodCago.찜[i].가격}
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

export default Boil;
