/* eslint-disable */
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/Mypage.css";
import { getMyPageData, deleteWishList } from "../lib/api/food";
import Roulette from "./roulette";
import MypageMenu from "./MypageMenu";

function Mypage() {
  const userId = sessionStorage.getItem("userId");
  const [mySelect, setMySelect] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  }, []);

  const count = mySelect.length;
  // 룰렛 관련

  const rouletteData = [];
  let num = 1;
  // mySelect안에 있는 값들을 item에 넣어주세요
  for (const item of mySelect) {
    rouletteData.push({ id: num, option: item.restaurantName });
    num++;
  }
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setState(true);
  };

  const handleDelete = async (userId, restaurantName) => {
    await deleteWishList(userId + restaurantName);
    alert("찜 목록에서 삭제되었습니다.");
    // 데이터 삭제 후에 새로운 데이터를 가져옴
    getMyPageData(userId).then((res) => {
      setMySelect([...res.data]);
    });
  };

  return (
    <>
      <MypageMenu count={count} />
      {/* 룰렛 추가(찜이 0개 시, 보이지 않게) */}
      {rouletteData.length !== 0 && (
        <div align="center" className="container pt-3 rounded">
          <div class="container mt-5 p-1 rounded shadow-lg col-lg-8">
            <h2 class="m-3 text-center text-light">
              <strong>골라요! 룰렛</strong>
            </h2>
          </div>
          {/* Roulette 컴포넌트 추가 */}
          <Roulette
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            data={rouletteData}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />

          <div className="bg-light rounded col-lg-6 shadow-lg">
            <h4 className="p-4">{!mustSpin && state ? rouletteData[prizeNumber].option : "찜한 가게 중 하나를 골라드려요"}</h4>
          </div>

          <div className="pt-2">
            <button className="btn press_btn btn-lg " onClick={handleSpinClick}>
              룰렛 돌리기
            </button>
          </div>
        </div>
      )}

      <div className=" bg-light rounded m-3 p-3 containerBox2 ">
        <div className="row">
          {mySelect.length == 0 ? (
            <div className="bg-light rounded containerBox col rounded mx-auto d-flex align-items-center">
              <div className="col-6  m-2 text-center mx-auto">
                <h2 className="pt-2 text-secondary">찜 목록이 비어있습니다.</h2>
                <h4 className="pt-2 text-secondary">가게를 찾아보아요😋</h4>
              </div>
            </div>
          ) : (
            mySelect.map((selectItem, i) => {
              return (
                <div className="col-6 col-md-4 col-lg-3 col-xl-2 pt-3" key={i}>
                  <div className="d-flex justify-content-center">
                    <div className="card h-100">
                      <h5 className="text-center card-title p-1">{selectItem.drink}</h5>
                      <div className="ratio ratio-4x3">
                        <img src={selectItem.foodImg} className="card-img-top" alt="Food Image" />
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>식당</strong> : {selectItem.restaurantName}
                        </p>
                        <p className="car d-text">
                          <strong>종류</strong> : {selectItem.foodCategory}
                        </p>
                        <p className="card-text">
                          <strong>위치</strong> : {selectItem.storeLocation}
                        </p>
                        <p className="card-text">
                          <strong>평균가격</strong> : {selectItem.avgPrice}원
                        </p>
                        <p className="card-text">
                          <strong>특징</strong> : {selectItem.feature}
                        </p>
                        <button
                          className="btn btn-dark mt-3 d-grid gap-2 mx-auto"
                          onClick={() => {
                            handleDelete(userId, selectItem.restaurantName);
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <button className="btn btn-dark d-grid col-4 gap-2 mx-auto btn-block">
        <Link className="nav-link active" to="/main">
          안주 더 담으러 가기
        </Link>
      </button>
    </>
  );
}

export default Mypage;
