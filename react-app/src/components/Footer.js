import { IoIosArrowUp } from "react-icons/io";
import "../styles/Footer.css";

function Footer() {
  const clickToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="Container mt-5">
        <div className="UpBtn" onClick={clickToTop}>
          <IoIosArrowUp className="UpIcon" />
        </div>
      </div>
      <div>
        <span className="FooterText"></span>
        <span className="FooterText">ss경기도 성남시 분당구 대왕판교로 644번길 12 (우)13494 12, Daewangpangyo-ro 644beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea (13494). </span>
      </div>
    </>
  );
}
export default Footer;
