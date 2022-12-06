// /* eslint-disable*/
// import { useState } from "react";

// function Boil({ foodCago }) {
//   const [like, setLike] = useState([false, false, false]);
//   //   const toggleLike = async (e) => {
//   //     // const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
//   //     setLike(!like);
//   //   };

//   return (
//     <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//       {foodCago &&
//         foodCago.찜.map((v, i) => {
//           return (
//             <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
//               <img src="..." class="card-img-top" />
//               <div class="card-body">
//                 <div>
//                   <h5 class="card-title">{foodCago.찜[i].식당}</h5>
//                   <img
//                     src={like[i] ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
//                     onClick={() => {
//                       let copy = [...like];
//                       copy[i] = !copy[i];
//                       setLike([...copy]);

//                       like[i] ? alert(foodCago.찜[i].식당 + "뺌") : alert(foodCago.찜[i].식당 + "찜목록에 담김");
//                     }}
//                     style={{ width: 50, height: 50 }}
//                   />
//                 </div>
//                 <p class="card-text">위치 : {foodCago.찜[i].위치}</p>
//                 <p class="card-text">특징 : {foodCago.찜[i].특징}</p>
//                 <p class="card-text">평균가격 : {foodCago.찜[i].가격}</p>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }

// export default Boil;

/* eslint-disable*/
import axios from "axios";
import { useState } from "react";

function Boil({ foodCago, 내가찜한거 }) {
  // const [like0, setLike0] = useState(false);
  // const [like1, setLike1] = useState(false);
  // const [like2, setLike2] = useState(false);

  const [like, setLike] = useState([false, false, false]);

  // const toggleLike = async (e) => {
  // const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  //   setLike(!like);
  //   like ? alert("뺌") : alert("찜목록에 담김");
  // };
  console.log("해당 음식종류", foodCago);
  console.log("사용자 해당 찜목록", 내가찜한거);

  return (
    <>
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
                        // like[i] ? alert(foodCago.찜[i].식당 + "뺌") : alert(foodCago.찜[i].식당 + "찜목록에 담김");

                        let copy = [...like];
                        copy[i] = !copy[i];
                        setLike([...copy]);
                        console.log("위 like", like);

                        console.log(like[i]);
                        console.log(like);

                        let body = {
                          id: sessionStorage.getItem("ID"),
                          식당: foodCago.찜[i].식당,
                          위치: foodCago.찜[i].위치,
                          특징: foodCago.찜[i].특징,
                          평균가격: foodCago.찜[i].가격,
                          좋아요: true,
                          삭제용: sessionStorage.getItem("ID") + foodCago.찜[i].식당,
                          drink: "소주",
                          종류: "찜",
                        };
                        내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당) ? alert("이미 있음") : (alert("해당 상품 추가 완료"), axios.post("/selection", body));
                        // 내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당) && alert("이미있음");
                        // !내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당) ? (axios.post("/selection", body), alert("추가 완료요")) : alert("이미 있으므로 추가 안 됨");
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </div>
                  {/* {console.log(!내가찜한거.find((e) => e.식당 === foodCago.찜[i].식당))} */}
                  <p class="card-text">위치 : {foodCago.찜[i].위치}</p>
                  <p class="card-text">특징 : {foodCago.찜[i].특징}</p>
                  <p class="card-text">평균가격 : {foodCago.찜[i].가격}</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
          <img src="..." class="card-img-top" />
          <div class="card-body">
            <div>
              <h5 class="card-title">{foodCago.회[0].식당}</h5>
              <img
                src={like0 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                onClick={() => {
                  setLike0(!like0);
                  like0 ? alert("뺌") : alert("찜목록에 담김");
                }}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <p class="card-text">위치 : {foodCago.회[0].위치}</p>
            <p class="card-text">특징 : {foodCago.회[0].특징}</p>
            <p class="card-text">평균가격 : {foodCago.회[0].가격}</p>
          </div>
        </div>

        <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
          <img src="..." class="card-img-top" />
          <div class="card-body">
            <div>
              <h5 class="card-title">{foodCago.회[1].식당}</h5>
              <img
                src={like1 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                onClick={() => {
                  setLike1(!like1);
                  like1 ? alert("뺌") : alert("찜목록에 담김");
                }}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <p class="card-text">위치 : {foodCago.회[1].위치}</p>
            <p class="card-text">특징 : {foodCago.회[1].특징}</p>
            <p class="card-text">평균가격 : {foodCago.회[1].가격}</p>
          </div>
        </div>

        <div class="card mb-3 h-100" style={{ maxWidth: 500 }}>
          <img src="..." class="card-img-top" />
          <div class="card-body">
            <div>
              <h5 class="card-title">{foodCago.회[2].식당}</h5>
              <img
                src={like2 ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
                onClick={() => {
                  setLike2(!like2);
                  like2 ? alert("뺌") : alert("찜목록에 담김");
                }}
                style={{ width: 50, height: 50 }}
              />
            </div>
            <p class="card-text">위치 : {foodCago.회[2].위치}</p>
            <p class="card-text">특징 : {foodCago.회[2].특징}</p>
            <p class="card-text">평균가격 : {foodCago.회[2].가격}</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Boil;

{
  /* {like ? (
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <img src={process.env.PUBLIC_URL + "/assets/heart.png"} class="rounded me-2" alt="..." style={{ width: 30, height: 30 }} />
              <strong class="me-auto">찜 성공!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">찜 안주에 등록하기 성공! 마이페이지에서 확인하세요</div>
          </div>
        </div>
      ) : (
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <img src={process.env.PUBLIC_URL + "/assets/em_heart.png"} class="rounded me-2" alt="..." style={{ width: 30, height: 30 }} />
              <strong class="me-auto">찜 해제!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">찜 안주 등록이 해제 되었습니다! </div>
          </div>
        </div>
      )} */
}
