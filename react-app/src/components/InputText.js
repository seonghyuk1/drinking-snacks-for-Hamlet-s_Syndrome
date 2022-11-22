import React, { useState } from "react";

const styles = {
  button: {
    width: "40%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
  },
  textarea: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
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
