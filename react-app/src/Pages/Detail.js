/* eslint-disable */
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Detail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Fish from "../components/Store/Soju/Fish";
import Boil from "../components/Store/Soju/Boil";
import Gob from "../components/Store/Soju/Gob";
import Jock from "../components/Store/Soju/Jock";
import Sam from "../components/Store/Soju/Sam";
import Tang from "../components/Store/Soju/Tang";
// import HeartImg from ".../public/assets/heart";
// import EmptyHeartImg from ".../public/assets/em_heart.png";

// 소주 : 1.탕, 2.회 3.찜 4. 족발 5. 곱창 6. 삼겹살

function Detail() {
  const [content, setContent] = useState();
  const [modal, setModal] = useState(false);

  let [내거, 내거변경] = useState([]);

  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
    setModal(!modal);
  };

  let navigate = useNavigate();
  let [category, setCategory] = useState([]);
  let [foodCago, setfoodCago] = useState();
  const [like, setLike] = useState(false);
  // 들어온 페이지의 id 받아오기
  let { id } = useParams();

  let [heartOn, setHeartOn] = useState([false, false, false, false]);

  useEffect(() => {
    // 내가 들어간 페이지의 번호와 일치하는 배열의 인덱스
    axios.get("detail").then((주류응답) => {
      setCategory(주류응답.data[id]);
    });

    axios.get("/food").then((음식응답) => {
      // console.log("안주", 응답.data[id]);
      setfoodCago(음식응답.data[id]);
    });

    axios.get("/selection").then((하트응답) => {
      console.log(하트응답.data);

      내거변경([...하트응답.data]);
    });
  }, []);

  let 내가찜한거 = 내거.filter((e) => e.id === sessionStorage.getItem("ID"));

  // * 추후 하트 눌렀는지 정보 데이터베이스 연동
  // useEffect(async () => {
  //   const fetchData = async () => {
  //     const res = await axios.get(...)
  //     if (res.data.type === 'liked') setLike(true)
  //   }
  //   fetchData()
  // }, []);

  // 하트상태관리
  // const toggleLike = async (e) => {
  //   // const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  //   setLike(!like);
  // };

  console.log("디비갖고온 정보", category);

  console.log("디비갖고온 정보22", foodCago);

  console.log("내가 찜한거 ", 내가찜한거);

  // 토스트 알림
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    toastTrigger.addEventListener("click", () => {
      const toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    });
  }

  const selectComponent = {
    회: <Fish foodCago={foodCago} 내가찜한거={내가찜한거} />,
    찜: <Boil foodCago={foodCago} 내가찜한거={내가찜한거} />,
    곱창: <Gob foodCago={foodCago} 내가찜한거={내가찜한거} />,
    족발: <Jock foodCago={foodCago} 내가찜한거={내가찜한거} />,
    삼겹살: <Sam foodCago={foodCago} 내가찜한거={내가찜한거} />,
    탕: <Tang foodCago={foodCago} 내가찜한거={내가찜한거} />,
  };
  const images = [{ url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }, { url: "/assets/soju.jpg" }];
  return (
    <div className="test2">
      <div class="container mt-2 p-1 rounded shadow-lg col-1 ">
        <h2 class="m-3 text-center text-light">
          <h1>{category.drink}</h1>
        </h2>
      </div>
      <img class="border border-dark" src={`/assets/${id}/${id}.jpg`} id="liveToastBtn"></img>

      {/* {heartOn.map((v, i) => {
        return (
          <>
            <img
              key={i}
              src={like ? process.env.PUBLIC_URL + "/assets/heart.png" : process.env.PUBLIC_URL + "/assets/em_heart.png"}
              onClick={() => {
                toggleLike;
                let copy = [...heartOn];
                heartOn[i] = !like;
                setHeartOn(copy);
              }}
              style={{ width: 50, height: 50 }}
              id="liveToastBtn"
            />
          </>
        );
      })} */}
      <div class="btn btn-light">
        <div class="btn btn-danger m-2">내 찜목록</div>
        <br />
        {내가찜한거.length != 0 ? (
          내가찜한거.map((v, i) => {
            return (
              <h1 class="btn btn-dark mx-3" key={i} name={v} onClick={handleClickButton}>
                {내가찜한거[i].drink}-{내가찜한거[i].식당}-{내가찜한거[i].종류}-{내가찜한거[i].평균가격}
              </h1>
            );
          })
        ) : (
          <h1>텅~</h1>
        )}
      </div>
      <div class="container mt-2 p-1 rounded shadow-lg col-4">
        <h2 class="m-3 text-center text-light">
          <strong>어울리는 안주들 💯 </strong>
        </h2>
      </div>
      <div className="test">
        <SimpleImageSlider
          width={700}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.0}
          onClick={(idx) => {
            idx == 1 && console.log("hi");
          }}
        />
      </div>

      {/* flex- around 써서 정렬하면 될듯 */}
      <div>
        {category.안주개수 &&
          category.안주개수.map((v, i) => {
            return (
              <button type="button" class="btn btn-light" key={i} name={v} onClick={handleClickButton}>
                {v}
              </button>
            );
          })}
      </div>
      <button onClick={handleClickButton}>닫기</button>

      {/* {modal ? content && selectComponent[content] : <></>} */}
      {content && selectComponent[content]}

      <button className="btn btn-secondary mx-3">
        <Link to="/Main" style={{ textDecoration: "none", color: "white" }}>
          다른 술 고를래요
        </Link>
      </button>

      {like ? (
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
      )}
    </div>
  );
}

export default Detail;
