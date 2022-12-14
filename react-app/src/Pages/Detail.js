/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Fish from "../components/Store/Soju/Fish";
import Boil from "../components/Store/Soju/Boil";
import Gob from "../components/Store/Soju/Gob";
import Jock from "../components/Store/Soju/Jock";
import Sam from "../components/Store/Soju/Sam";
import Tang from "../components/Store/Soju/Tang";
// ============================================
import Ham from "../components/Store/Yang/Ham";
import Gga from "../components/Store/Yang/Gga";
import Green from "../components/Store/Yang/Green";
import Smore from "../components/Store/Yang/Smore";
import Nacho from "../components/Store/Yang/Nacho";
import Prechel from "../components/Store/Yang/Prechel";
// ============================================
import Caf from "../components/Store/Wine/Caf";
import BeefStew from "../components/Store/Wine/BeefStew";
import Cheese from "../components/Store/Wine/Cheese";
import Gambas from "../components/Store/Wine/Gambas";
import Hamong from "../components/Store/Wine/Hamong";
import Porchini from "../components/Store/Wine/Porchini";
// ============================================
import Chicken from "../components/Store/Beer/Chicken";
import Fried from "../components/Store/Beer/Fried";
import Pizza from "../components/Store/Beer/Pizza";
import Sausage from "../components/Store/Beer/Sausage";
import Skewers from "../components/Store/Beer/Skewers";
import Sheep from "../components/Store/Beer/Sheep";
// ============================================
import Bossam from "../components/Store/Mak/Bossam";
import Ggomak from "../components/Store/Mak/Ggomak";
import Jeon from "../components/Store/Mak/Jeon";
import Memil from "../components/Store/Mak/Memil";
import Pig from "../components/Store/Mak/Pig";
import PopuKim from "../components/Store/Mak/PopuKim";

function Detail() {
  const ID = sessionStorage.getItem("ID");
  let { id } = useParams();

  const [content, setContent] = useState();

  let [내거, 내거변경] = useState([]);

  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
  };

  let [category, setCategory] = useState([]);
  let [foodCago, setfoodCago] = useState();
  // 들어온 페이지의 id 받아오기

  useEffect(() => {
    // 내가 들어간 페이지의 번호와 일치하는 배열의 인덱스
    axios.get("detail").then((주류응답) => {
      setCategory(주류응답.data[id]);
    });

    axios.get("/food").then((음식응답) => {
      setfoodCago(음식응답.data[id]);
    });

    axios.post("/mypage", { data: ID }).then((응답) => {
      내거변경([...응답.data]);
    });
  }, []);

  console.log("디비갖고온 정보", category);
  console.log("디비갖고온 정보22", foodCago);
  console.log("내거", 내거);

  let Mine = () => {
    return (
      <>
        <div className="test2">
          <div class=" col-6 bg-light rounded p-1 mx-auto shadow-lg">
            <div className="pt-2">
              <Link to="/Mypage">
                <div class="btn col-lg-4 btn-lg  press_btn rounded mx-auto ">
                  <h4 className="text-center text-light ">찜 목록</h4>
                </div>
              </Link>
            </div>
            <div className="p-2">
              {내거.length != 0 ? (
                내거.map((v, i) => {
                  return (
                    <p class="bg-dark mx-3 p-2 text-light rounded storeOpacity">
                      {/* {내거[i].drink}-{내거[i].식당}-{내거[i].종류}-{내거[i].평균가격} */}
                      {내거[i].식당}-{내거[i].평균가격}
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

  const selectComponent = {
    회: <Fish foodCago={foodCago} 내거={내거} Mine={Mine} />,
    찜: <Boil foodCago={foodCago} 내거={내거} Mine={Mine} />,
    곱창: <Gob foodCago={foodCago} 내거={내거} Mine={Mine} />,
    족발: <Jock foodCago={foodCago} 내거={내거} Mine={Mine} />,
    삼겹살: <Sam foodCago={foodCago} 내거={내거} Mine={Mine} />,
    탕: <Tang foodCago={foodCago} 내거={내거} Mine={Mine} />,
    // ===================================================
    함박스테이크: <Ham foodCago={foodCago} 내거={내거} Mine={Mine} />,
    까나페: <Gga foodCago={foodCago} 내거={내거} Mine={Mine} />,
    그린올리브: <Green foodCago={foodCago} 내거={내거} Mine={Mine} />,
    나쵸: <Nacho foodCago={foodCago} 내거={내거} Mine={Mine} />,
    스모어딥: <Smore foodCago={foodCago} 내거={내거} Mine={Mine} />,
    프레첼: <Prechel foodCago={foodCago} 내거={내거} Mine={Mine} />,
    // ===================================================
    감바스: <Gambas foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    치즈플래터: <Cheese foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    하몽: <Hamong foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    포르치니: <Porchini foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    비프스튜: <BeefStew foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    카프레제: <Caf foodCago={foodCago} 내거={내거} Mine={Mine} id={id} />,
    // ===================================================
    치킨: <Chicken foodCago={foodCago} 내거={내거} Mine={Mine} />,
    피자: <Pizza foodCago={foodCago} 내거={내거} Mine={Mine} />,
    소세지: <Sausage foodCago={foodCago} 내거={내거} Mine={Mine} />,
    양꼬치: <Sheep foodCago={foodCago} 내거={내거} Mine={Mine} />,
    튀김: <Fried foodCago={foodCago} 내거={내거} Mine={Mine} />,
    닭꼬치: <Skewers foodCago={foodCago} 내거={내거} Mine={Mine} />,
    // ===================================================
    보쌈: <Bossam foodCago={foodCago} 내거={내거} Mine={Mine} />,
    꼬막찜: <Ggomak foodCago={foodCago} 내거={내거} Mine={Mine} />,
    모듬전: <Jeon foodCago={foodCago} 내거={내거} Mine={Mine} />,
    메밀전병: <Memil foodCago={foodCago} 내거={내거} Mine={Mine} />,
    돼지고기김치찜: <Pig foodCago={foodCago} 내거={내거} Mine={Mine} />,
    두부김치: <PopuKim foodCago={foodCago} 내거={내거} Mine={Mine} />,
  };
  console.log("파람스", id);

  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }];
  return (
    <div className="">
      <div class="container mt-5 p-1 rounded shadow-lg">
        <h2 class="m-3 text-center text-light">
          <strong>어떤 안주를 먹을까요?🍟</strong>
        </h2>
      </div>

      {/* 윗라인(술+추천) */}
      <div className="container pt-4">
        <div class="row mx-auto">
          <div className="col-lg-3 mx-auto test2">
            <div class="mt-2 p-1 ">
              <h2 class="m-3 text-center text-light">음료 Pick✔</h2>
            </div>
            <img class="border border-secondary rounded img-fluid shadow-lg" src={`/assets/${id}/${id}.jpg`} id="liveToastBtn" width="250" height="250"></img>
            <div class="mt-2 p-1 ">
              <h2 class="m-3 text-center text-light">{category.drink}</h2>
            </div>
          </div>

          <div className="col-lg-9 bg-light rounded storeOpacity">
            <div class="container m-2 p-1 rounded shadow-lg">
              <h2 class="m-3 text-center text-light">
                <strong>어울리는 안주들 💯</strong>
              </h2>
            </div>
            {/* <div class="mt-2 p-1">
            <h2 class="m-3 text-center text-light">
              <strong>어울리는 안주들 💯</strong>
            </h2>
          </div> */}
            <div className="test p-3">
              <SimpleImageSlider
                width={600}
                height={400}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                autoPlayDelay={3.5}
                onClick={(idx) => {
                  idx == 1 && setContent("포르치니");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* detail에서 Mine은 한발짝 느립니다. 안 쪽 프랍스로 준 거는 바로 저기서 해결하기떄문 */}
      <div className="test2">
        <div className="container bg-light rounded shadow-lg storeOpacity">
          {category.안주개수 &&
            category.안주개수.map((v, i) => {
              return (
                <button type="button" class="btn btn-lg press_btn g-2 m-3 rounded-pill shadow-sm" key={i} name={v} onClick={handleClickButton}>
                  {v}
                </button>
              );
            })}
        </div>
      </div>
      {/* <button onClick={handleClickButton}>닫기</button> */}

      {/* 화면보여주기 */}
      <div className="container bg-light rounded shadow-lg storeOpacity2">
        {content && selectComponent[content]}
        <Mine />
      </div>

      <div className="text-center">
        <button class="col-xl-2 btn btn-lg press_btn g-2 m-3">
          <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
            다른 술 고를래요
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Detail;

// // 토스트 알림
// const toastTrigger = document.getElementById("liveToastBtn");
// const toastLiveExample = document.getElementById("liveToast");
// if (toastTrigger) {
//   toastTrigger.addEventListener("click", () => {
//     const toast = new bootstrap.Toast(toastLiveExample);

//     toast.show();
//   });
// }

// {like ? (
//   <div class="toast-container position-fixed bottom-0 end-0 p-3">
//     <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//       <div class="toast-header">
//         <img src={process.env.PUBLIC_URL + "/assets/heart.png"} class="rounded me-2" alt="..." style={{ width: 30, height: 30 }} />
//         <strong class="me-auto">찜 성공!</strong>
//         <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//       </div>
//       <div class="toast-body">찜 안주에 등록하기 성공! 마이페이지에서 확인하세요</div>
//     </div>
//   </div>
// ) : (
//   <div class="toast-container position-fixed bottom-0 end-0 p-3">
//     <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//       <div class="toast-header">
//         <img src={process.env.PUBLIC_URL + "/assets/em_heart.png"} class="rounded me-2" alt="..." style={{ width: 30, height: 30 }} />
//         <strong class="me-auto">찜 해제!</strong>
//         <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//       </div>
//       <div class="toast-body">찜 안주 등록이 해제 되었습니다! </div>
//     </div>
//   </div>
// )}
