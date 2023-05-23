import { IoIosArrowUp } from "react-icons/io";
import "../styles/Footer.css";

function Footer() {
  const clickToTop = () => {
    window.scrollTo(0, -50);
  };
  return (
    <>
      <div className="Container mt-5">
        <div className="UpBtn" onClick={clickToTop}>
          <IoIosArrowUp className="UpIcon" />
        </div>
      </div>
      <div></div>
    </>
  );
}
export default Footer;
