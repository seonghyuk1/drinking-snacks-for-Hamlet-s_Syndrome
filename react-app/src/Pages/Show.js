import React, { useState } from "react";
import axios from "axios";

//fadeout을 구현하기 위해 active와 hidden을 구현
const active = {
  opacity: "1",
  transition: "opacity 500ms",
};

const hidden = {
  opacity: "0",
  visibility: "hidden",
  transition: "opacity 500ms , visibility 500ms",
};

const Show = (props) => {
  //state 값을 두어 삭제 버튼 클릭시 fadeout 기능 구현
  let [state, setState] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios
        .delete("delete", {
          data: {
            // 서버에서 req.body.{} 로 확인할 수 있다.
            deleteId: props.obj._id,
          },
          withCredentials: true,
        })
        .then((res) => {
          setState(!state);
          //fadeout 시키면서 view에 있는 해당 내용 삭제
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="col" style={state ? hidden : active}>
          <div className="card h-100">
            <img
              src={"/assets/3/3.jpg"}
              className="card-img-top"
              alt="..."
            ></img>
            <div className="card-body">
              <h5 className="card-title">{props.obj.place}</h5>
              <p className="card-text">주류 : {props.obj.drink}</p>
              <p className="card-text">안주 : {props.obj.food}</p>
              <button
                className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto"
                type="submit"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Show;
