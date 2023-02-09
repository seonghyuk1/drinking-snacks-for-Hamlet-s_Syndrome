import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import UserLogin from "./ChatUserLogin";
import "../styles/chat.css";

export default function ChatContainer() {
  // const socketio = io.connect("http://34.231.209.142/");
  const socketio = io.connect("http://localhost:80");

  // 이 부분 추후 서버 배포 주소를 넣어 소켓 열기
  // let socketio = socketIOClient("http://localhost:80");

  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(sessionStorage.getItem("Nickname"));

  const [chatOn, setChatOn] = useState(false);

  // 채팅을 보내어 재렌더링시마다 chat 요청을 받아서 보낸 말들을 chats에 저장
  useEffect(() => {
    socketio.on("chat", (senderCharts) => {
      setChats(senderCharts);
    });
    //채팅 스크롤 하단으로 이동
    if (document.getElementById("box")) {
      const chatDiv = document.getElementById("box");
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  });

  // chat에다가 한 말 써서 내보내기
  function sendChatToSocket(chat) {
    socketio.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user };
    // 원래 있던 채팅의 내용들과 새로운 채팅 내용들을 합침
    setChats([...chats, newChat]);
    // 합친 내용들을 서버에 전달
    sendChatToSocket([...chats, newChat]);
  }

  // 로그아웃시 다른 유저가 판별하려고 storage비우기
  function logout() {
    setChatOn(false);
  }

  function ChatsList() {
    return chats.map((chat, i) => {
      if (chat.user === user) {
        return <ChatBoxSender key={i} message={chat.message} user={chat.user} />;
      } else {
        return <ChatBoxReciever key={i} message={chat.message} user={chat.user} />;
      }
    });
  }

  return (
    <div>
      {chatOn ? ( // 등록 해놨던 유저라면 상단바와 대화창 다 불러오기
        <div class="container col-9 m-1 p-3 bg-light rounded shadow-lg mx-auto ">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* 윗라인구성 */}
            <div class="container">
              <div class="row">
                <div class="col-1">
                  <h3 onClick={() => logout()}>
                    <i class="bi bi-arrow-left arrow "></i>
                  </h3>
                </div>

                <div class="col-6  mx-auto ">
                  <div class="container bg-secondary rounded-pill">
                    <h5 class="text-center text-light ">닉네임 : {user}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 채팅내용 */}
            <div id="box" class="container  rounded chat_container">
              <ChatsList />
            </div>

          {/* 아래라인 */}
          <div class="container pt-3">
            <InputText addMessage={addMessage} />
          </div>
        </div>
      ) : (
        // 등록돼있던 유저 아니라면 Login창

        <UserLogin setUser={setUser} setChatOn={setChatOn} />
      )}
    </div>
  );
}
