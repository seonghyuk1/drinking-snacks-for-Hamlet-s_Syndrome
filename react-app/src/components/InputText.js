import React, { useState } from "react";

const styles = {
  button: {
    // width: "40%",
    // height: 50,
    // fontWeight: "bold",
    // borderRadius: 10,
    // fontSize: 18,
    // backgroundColor: "#34b7f1",
    // borderWidth: 0,
    // color: "#fff",
    background: "rgb(59, 42, 57)",
    color: "#fff",
    fontweight: "bold",
  },
  textarea: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState("");

  function addAMessage() {
    addMessage({
      message,
    });
    setMessage("");
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      addAMessage(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <>
      {/* 아래라인구성 */}
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <input style={styles.textarea} rows={6} placeholder="할 말을 입력하세요..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleOnKeyPress}></input>
          </div>
          <div class="col-sm-3">
            <button
              class="btn btn-lg col-11"
              onClick={() => {
                addAMessage();
              }}
              style={styles.button}
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
