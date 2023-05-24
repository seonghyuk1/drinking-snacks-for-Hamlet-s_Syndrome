/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailData, getFoodData, getMyPageData } from "../lib/api/food";

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
  const { id } = useParams();

  const [content, setContent] = useState();

  const [내거, 내거변경] = useState([]);

  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
  };

  const [category, setCategory] = useState([]);
  const [foodCago, setfoodCago] = useState();

  console.log("카", category);
  console.log("푸", foodCago);
  // 들어온 페이지의 id 받아오기

  useEffect(() => {
    getDetailData(id).then((res) => {
      setCategory(res.data);
    });

    getFoodData(id).then((res) => {
      setfoodCago(res.data);
    });

    getMyPageData(ID).then((res) => {
      내거변경([...res.data]);
    });
  }, []);

  const Mine = () => {
    return (
      <>
        <div className="test2">
          <div className=" col-6 bg-light rounded p-1 mx-auto shadow-lg">
            <div className="pt-2">
              <Link to="/Mypage">
                <div className="btn col-lg-4 btn-lg  press_btn rounded mx-auto ">
                  <h4 className="text-center text-light ">찜 목록</h4>
                </div>
              </Link>
            </div>
            <div className="p-2">
              {내거.length != 0 ? (
                내거.map((v, i) => {
                  return (
                    <p className="bg-dark mx-3 p-2 text-light rounded storeOpacity">
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
    감바스: <Gambas foodCago={foodCago} 내거={내거} Mine={Mine} />,
    치즈플래터: <Cheese foodCago={foodCago} 내거={내거} Mine={Mine} />,
    하몽: <Hamong foodCago={foodCago} 내거={내거} Mine={Mine} />,
    포르치니: <Porchini foodCago={foodCago} 내거={내거} Mine={Mine} />,
    비프스튜: <BeefStew foodCago={foodCago} 내거={내거} Mine={Mine} />,
    카프레제: <Caf foodCago={foodCago} 내거={내거} Mine={Mine} />,
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
              <h2 className="m-3 text-center text-light">음료 Pick✔</h2>
            </div>
            <img className="border border-secondary rounded img-fluid shadow-lg" src={`/assets/${id}/${id}.jpg`} id="liveToastBtn" width="250" height="250"></img>
            <div className="mt-2 p-1 ">
              <h2 className="m-3 text-center text-light">{category.drink}</h2>
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

      {/* detail에서 Mine은 한발짝 느립니다. 안 쪽 프랍스로 준 거는 바로 저기서 해결하기떄문 */}

      {/* button에 함수로 axios를 통해 서버로부터 회에 대한 정보들을 가져오도록 설정 */}

      <div className="test2">
        <div className="container bg-light rounded shadow-lg storeOpacity">
          {category.안주개수 &&
            category.안주개수.map((v, i) => {
              return (
                <button type="button" className="btn btn-lg press_btn g-2 m-3 rounded-pill shadow-sm" key={i} name={v} onClick={handleClickButton}>
                  {v}
                </button>
              );
            })}
        </div>
      </div>

      {/* 화면보여주기 */}
      <div className="container bg-light rounded shadow-lg storeOpacity2">{content && selectComponent[content]}</div>

      <div className="text-center">
        <button className="col-xl-2 btn btn-lg press_btn g-2 m-3">
          <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
            다른 술 고를래요
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Detail;
