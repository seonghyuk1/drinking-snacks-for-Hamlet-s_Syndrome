import React from "react";
import { Link, useLocation } from "react-router-dom";

function MypageMenu({ count }) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* 현재 위치가 내가 가려는 곳과와 일치할 때는 "active" 클래스를 추가하여 bold 스타일을 적용 */}
              <Link className={`nav-link active ${location.pathname === "/Mypage" && "fw-bold"}`} to="/Mypage">
                찜 목록({count})
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link active ${location.pathname === "/ChangeNickname" && "fw-bold"}`} to="/ChangeNickname">
                닉네임 변경
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link active ${location.pathname === "/ChangePassword" && "fw-bold"}`} to="/ChangePassword">
                비밀번호 변경
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link active ${location.pathname === "/Resign" && "fw-bold"}`} to="/Resign">
                회원 탈퇴
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MypageMenu;
