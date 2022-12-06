/* eslint-disable*/
import axios from "axios";
import { useEffect, useState } from "react";

function Fish({ foodCago, 내가찜한거 }) {
  // const [like0, setLike0] = useState(false);
  // const [like1, setLike1] = useState(false);
  // const [like2, setLike2] = useState(false);

  const [like, setLike] = useState([false, false, false, false]);

  // const toggleLike = async (e) => {
  // const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  //   setLike(!like);
  //   like ? alert("뺌") : alert("찜목록에 담김");
  // };
  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내가찜한거);
  // let 내가누른거 = 내가찜한거.filter((e) => e[0].식당 === foodCago.회[0]);

  // let 회만 = [];
  // 내가찜한거.map((v, i) => {
  //   회만 = 내가찜한거.filter((e) => e[i] === "회");
  // });

  // console.log(회만);

  let 내가누른거 = [];
  let test = [];
  foodCago.회.map((v, i) => {
    test.push(foodCago.회[i]);
  });

  test.map((v, i) => {
    내가누른거 = 내가찜한거.filter((e) => e[i] === test[i]);
  });

  // 원래 회의 정보들
  console.log("테원", test);

  // console.log("내가누른", 내가누른거);

  let test2 = [];
  내가찜한거.map((v, i) => {
    test2.push(내가찜한거.find((e) => e.식당 === test[i].식당));
  });

  // 내가 회에서 찜한 목록들
  console.log("테투", test2);

  // let test3 = [];
  // test.map((v, i) => {
  //   test3 = test.filter((e) => e[i] === test2[i]);
  // });

  // console.log(test3);
  // 여기서 내가 찜한거에 회만에서 4가지 회 식당 정보가 다 들어가 있고 그 회에 + true

  // 내가찜한거.map((v, i) => {
  //   내가누른거 = 내가찜한거.filter((내가찜) => 내가찜[i].식당 === foodCago.회[i].식당);
  // });
  // 내가누른거 = 내가찜한거.filter((내가찜) => 내가찜[0] === foodCago.회[0]);
  // console.log("내누", 내가누른거);

  // console.log(내가찜한거[0].식당);
  // console.log(foodCago.회[0].식당);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {foodCago &&
          foodCago.회.map((v, i) => {
            return (
              <div class="card mb-3 h-100" style={{ maxWidth: 500 }} key={i}>
                <img src="..." class="card-img-top" />
                <div class="card-body">
                  <div>
                    <h5 class="card-title">{foodCago.회[i].식당}</h5>
                    <img
                      // src={내가찜한거[i].좋아요 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                      src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                      onClick={() => {
                        // like[i] ? alert(foodCago.회[i].식당 + "뺌") : alert(foodCago.회[i].식당 + "찜목록에 담김");

                        let copy = [...like];
                        copy[i] = !copy[i];
                        setLike([...copy]);
                        console.log("위 like", like);

                        console.log(like[i]);
                        console.log("아래", like);

                        let body = {
                          id: sessionStorage.getItem("ID"),
                          식당: foodCago.회[i].식당,
                          위치: foodCago.회[i].위치,
                          특징: foodCago.회[i].특징,
                          평균가격: foodCago.회[i].가격,
                          좋아요: true,
                          삭제용: sessionStorage.getItem("ID") + foodCago.회[i].식당,
                          drink: "소주",
                          종류: "회",
                        };

                        내가찜한거.find((e) => e.식당 === foodCago.회[i].식당) ? alert("이미 있음") : (alert("해당 상품 추가 완료"), axios.post("/selection", body));
                        // 내가찜한거.find((e) => e.식당 === foodCago.회[i].식당) && alert("이미있음");
                        // !내가찜한거.find((e) => e.식당 === foodCago.회[i].식당) ? (axios.post("/selection", body), alert("추가 완료요")) : alert("이미 있으므로 추가 안 됨");
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  {/* {console.log(!내가찜한거.find((e) => e.식당 === foodCago.회[i].식당))} */}
                  <p class="card-text">위치 : {foodCago.회[i].위치}</p>
                  <p class="card-text">특징 : {foodCago.회[i].특징}</p>
                  <p class="card-text">평균가격 : {foodCago.회[i].가격}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Fish;
