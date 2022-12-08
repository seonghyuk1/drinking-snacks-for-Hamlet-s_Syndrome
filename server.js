const express = require("express");
const path = require("path");
const app = express();

//소켓용
const http = require("http");
const Server = require("socket.io").Server;

const server = http.createServer(app);
// 소켓 뚫기
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // 연결시
  console.log("연결 되었습니다.");
  // 연결 해제시
  socket.on("disconnect", () => {
    console.log("연결 해제!");
  });

  // chat이벤트를 받으면 받은 말들을 전체에 뿌려주세요
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
});

let cors = require("cors");

//Socket 사용하는 코드
// const http = require("http").createServer(app);
// const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));

// 환경변수
require("dotenv").config();

// JWT
const jwt = require("jsonwebtoken");

// bcrypt Salt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.DB_URL, function (에러, client) {
  if (에러) return console.log(에러);
  db = client.db("kwic");

  server.listen(process.env.PORT, function () {
    console.log("80에서 돌아가는 중");
  });
});

// 회원가입 정보 기입
app.post("/api/Signup", function (요청, 응답) {
  db.collection("login").findOne({ 아이디: 요청.body.id }, function (에러, 결과) {
    if (결과) {
      응답.json("존재함요");
    } else {
      // 소금 + 해시값 동시 생성 및 DB 적재
      bcrypt.hash(요청.body.pw, saltRounds, (err, hash) => {
        console.log(`생성 hash\t${hash}`);
        db.collection("login").insertOne({ 아이디: 요청.body.id, 패스워드: hash, 닉네임: 요청.body.name }, function (에러, 결과) {
          if (에러) return console.log(에러);
          console.log("저장완료");
          응답.redirect("/");
          console.log("아이디 : ", 요청.body.id, " 비밀번호 : ", hash, "닉네임 : ", 요청.body.name);
        });
      });
    }
  });
});

// 중복 ID 체크
app.post("/api/Signup/checkID", function (요청, 응답) {
  db.collection("login").findOne({ 아이디: 요청.body.id }, function (에러, 결과) {
    if (에러) return console.log(에러);
    // console.log(결과);
    if (결과) {
      응답.json("존재");
    } else {
      응답.json("미존재");
    }
  });
});

// 큰틀용 detail : 주류마다 detail에 다른 정보 제공
app.get("/detail/:id", function (요청, 응답) {
  db.collection("detail")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      응답.json(결과);
    });
});

// 음식정보 : 소주 음식 정보 관련은 0번~
app.get("/food", function (요청, 응답) {
  db.collection("food")
    .find()
    .toArray(function (에러, 결과) {
      console.log("아래", 결과);
      응답.json(결과);
    });
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
  db.collection("login").findOne({ 아이디: 요청.body.id }, function (에러, 아이디결과) {
    if (에러) return console.log(에러);

    if (아이디결과) {
      db.collection("login").findOne({ 패스워드: 요청.body.pw }, function (에러, 비번결과) {
        // console.log("폼 입력 비번", 요청.body.form_pw);
        // console.log("암호화 비번", 요청.body.pw);

        if (비번결과) {
          // 폼 입력 비번을 암호화 된 비밀번호와 Compare
          bcrypt.compare(요청.body.form_pw, 요청.body.pw).then((result) => {
            if (result) {
              jwt.sign({ foo: "bar" }, "secret-key", { expiresIn: "1d" }, (err, token) => {
                if (err) res.status(400).json({ error: "에러요" });
                // console.log(token);
                // 생성된 토큰 전송
                응답.json(token);
              });
            } else 응답.json("비번미존재");
          });
        }
      });
    } else {
      응답.json("아이디미존재");
    }
  });
});

//마이페이지 구현 - 저장 (각 음식 페이지에서 활용)
app.post("/selection", function (요청, 응답) {
  db.collection("selection").insertOne({ drink: 요청.body.drink, 식당: 요청.body.식당, 위치: 요청.body.위치, 특징: 요청.body.특징, 평균가격: 요청.body.평균가격, 좋아요: 요청.body.좋아요, id: 요청.body.id, 종류: 요청.body.종류, 삭제용: 요청.body.삭제용 }, function (에러, 결과) {
    if (에러) return console.log(에러);
    console.log("저장완료");
    console.log("요청", 요청.body);
  });
});

app.post("/mypage", function (요청, 응답) {
  console.log(요청.body);
  db.collection("selection")
    .find({ id: 요청.body.data })
    .toArray(function (에러, 결과) {
      // console.log("아래", 결과);
      console.log(결과);
      응답.json(결과);
    });
});

//마이페이지 찜 목록에서 삭제
app.post("/delete", function (요청, 응답) {
  db.collection("selection").deleteOne({ 삭제용: 요청.body.data }, function (err, result) {
    console.log(result);
    응답.json("삭제완료");
  });
});

//비밀번호 변경
app.post("/changePW", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      bcrypt.compare(req.body.current, req.body.hash).then((result) => {
        if (result) {
          //패스워드 일치
          //새 비밀번호와 다시 입력한게 다를때
          if (req.body.new != req.body.re) {
            res.json("비밀번호 재입력 오류");
          } else {
            //현재 비밀번호와 새로 작성한 비밀번호가 동일할때
            if (req.body.new == req.body.current) {
              res.json("비밀번호 동일");
            } else {
              //정상적으로 바꾸면 DB 업데이트 하고 홈 이동
              bcrypt.hash(req.body.new, saltRounds, (err, hash) => {
                db.collection("login").updateOne({ 아이디: req.body.id }, { $set: { 패스워드: hash } }, function (err, result) {
                  console.log("수정완료");
                  res.redirect("/Main");
                });
              });
            }
          }
        } else {
          //패스워드 일치하지 않음
          res.json("현재 패스워드 안맞음");
        }
      });
    } else {
      console.log("찾는 아이디 없음");
    }
  });
});

//회원탈퇴
app.post("/resign", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      bcrypt.compare(req.body.current, req.body.hash).then((result) => {
        if (result) {
          //패스워드 일치
          db.collection("login").deleteOne({ 아이디: req.body.id }, function (err, result) {
            console.log("삭제완료");
            res.redirect("/");
          });
        } else {
          //패스워드 일치하지 않음
          res.json("현재 패스워드 안맞음");
        }
      });
    } else {
      console.log("찾는 아이디 없음");
    }
  });
});

//닉네임 변경
app.post("/changeNickname", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      db.collection("login").updateOne({ 아이디: req.body.id }, { $set: { 닉네임: req.body.nickname } }, function (err, result) {
        console.log("수정완료");
        res.json(req.body.nickname);
      });
    } else {
      console.log("찾는 아이디 없음");
    }
  });
});

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/react-app/build/index.html"), function (에러) {
    if (에러) {
      요청.status(500).send(에러);
    }
  });
});
