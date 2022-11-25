import React, { useState } from "react";

const styles = {
  button: {
<<<<<<< HEAD
    width: "40%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
=======
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
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
  },
  textarea: {
    width: "100%",
    height: 50,
    borderRadius: 10,
<<<<<<< HEAD
    borderWidth: 0,
=======
    borderWidth: 1,
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
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
<<<<<<< HEAD
    <div style={styles.textContainer}>
      <input style={styles.textarea} rows={6} placeholder="할 말을 입력하세요..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleOnKeyPress}></input>
      <button
        onClick={() => {
          addAMessage();
        }}
        style={styles.button}
      >
        전송
      </button>
    </div>
  );
}
=======
    <>
    <div class="container">
      <div class="row">
        <div class="col-sm-9">
        <input style={styles.textarea} rows={6} placeholder="할 말을 입력하세요..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleOnKeyPress}></input>
        </div>
        <div class="col-sm-3">
        <button class="btn btn-lg col-11"
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
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
