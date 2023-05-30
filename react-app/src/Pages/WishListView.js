import { Link } from "react-router-dom";

const WishListView = ({ mySelect }) => {
  return (
    <div className="test2">
      <div className="col-6 bg-light rounded p-1 mx-auto shadow-lg">
        <div className="pt-2">
          <Link to="/Mypage" className="btn col-lg-3 btn-lg press_btn rounded mx-auto hover-opacity">
            <h4 className="text-center text-light">찜목록</h4>
          </Link>
        </div>
        <div className="p-2">
          {mySelect.length ? (
            mySelect.map((selectCategory, i) => (
              <p className="bg-dark mx-3 p-2 text-light rounded storeOpacity" key={i}>
                {`${selectCategory.restaurantName} - 평균가 ${selectCategory.avgPrice}원`}
              </p>
            ))
          ) : (
            <div className="p-1">
              <h4 className="text-secondary">가게를 찜해보세요😋</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListView;
