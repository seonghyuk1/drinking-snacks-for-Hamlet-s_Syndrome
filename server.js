const express = require("express");
const path = require("path");
const app = express();

let cors = require("cors");

//Socket 사용하는 코드
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000", //env 처리 해주기
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));

// 환경변수
require("dotenv").config();

// // 추후 PUT을 위한 메소드 오버라이드
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));

// JWT
const jwt = require("jsonwebtoken");

// bcrypt Salt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.DB_URL, function (에러, client) {
  if (에러) return console.log(에러);
  db = client.db("kwic");

  http.listen(process.env.PORT, function () {
    console.log("80에서 돌아가는 중");
  });
});

app.post("/api/Signup", function (요청, 응답) {
  db.collection("login").findOne(
    { 아이디: 요청.body.id },
    function (에러, 결과) {
      if (결과) {
        응답.json("존재함요");
      } else {
        // 소금 + 해시값 동시 생성 및 DB 적재
        bcrypt.hash(요청.body.pw, saltRounds, (err, hash) => {
          // console.log(`생성 hash\t${hash}`);
          db.collection("login").insertOne(
            { 아이디: 요청.body.id, 패스워드: hash },
            function (에러, 결과) {
              if (에러) return console.log(에러);
              // console.log("저장완료");
              응답.redirect("/");
              // console.log("아이디 : ", 요청.body.id, " 비밀번호 : ", hash);
            }
          );
        });
      }
    }
  );
});

// 중복 ID 체크
app.post("/api/Signup/checkID", function (요청, 응답) {
  db.collection("login").findOne(
    { 아이디: 요청.body.id },
    function (에러, 결과) {
      if (에러) return console.log(에러);
      // console.log(결과);
      if (결과) {
        응답.json("존재");
      } else {
        응답.json("미존재");
      }
    }
  );
});

// 데이터베이스 암호화 비밀번호 전달 API
app.get("/api/pw", function (요청, 응답) {
  // console.log(응답);
  db.collection("login")
    .find()
    .toArray(function (에러, 결과) {
      // console.log(결과);
      응답.json(결과);
    });
});
// 로그인
app.post("/api/login", function (요청, 응답) {
  db.collection("login").findOne(
    { 아이디: 요청.body.id },
    function (에러, 아이디결과) {
      if (에러) return console.log(에러);

      if (아이디결과) {
        db.collection("login").findOne(
          { 패스워드: 요청.body.pw },
          function (에러, 비번결과) {
            // console.log("폼 입력 비번", 요청.body.form_pw);
            // console.log("암호화 비번", 요청.body.pw);

            if (비번결과) {
              // 폼 입력 비번을 암호화 된 비밀번호와 Compare
              bcrypt.compare(요청.body.form_pw, 요청.body.pw).then((result) => {
                if (result) {
                  jwt.sign(
                    { foo: "bar" },
                    "secret-key",
                    { expiresIn: "1d" },
                    (err, token) => {
                      if (err) res.status(400).json({ error: "에러요" });
                      // console.log(token);
                      // 생성된 토큰 전송
                      응답.json(token);
                    }
                  );
                } else 응답.json("비번미존재");
              });
            }
          }
        );
      } else {
        응답.json("아이디미존재");
      }
    }
  );
});

//socket에 연결
io.on("connection", (socket) => {
  console.log(`${socket.id}에 연결되었어요`);
  //사용자가 socket에 user-send라는 이름으로 보내면 그 안에 담긴건 data에
  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data);
    //쏘켓에 접속돼있는 모든 사용자한테 뿌려줌
    io.emit("receive_message", data);
    // console.log(data); //data는 json형태로 옴
  });
});

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/react-app/build/index.html"));
});
