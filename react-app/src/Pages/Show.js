// // /* eslint-disable */
// // import React, { useState } from "react";
// // import axios from "axios";

// // const Show = (obj, views, setView) => {
// //   //state 값을 두어 삭제 버튼 클릭시 fadeout 기능 구현
// //   let [state, setState] = useState(false);

// //   // async function submitHandler(e) {
// //   //   e.preventDefault();
// //   //   try {
// //   //     await axios
// //   //       .delete("delete", {
// //   //         data: {
// //   //           // 서버에서 req.body.{} 로 확인할 수 있다.
// //   //           deleteId: obj._id,
// //   //         },
// //   //         withCredentials: true,
// //   //       })
// //   //       .then((res) => {
// //   //         setState(!state);
// //   //         //fadeout 시키면서 view에 있는 해당 내용 삭제
// //   //         // setUsers(users.filter(user => user.id !== id));
// //   //       })
// //   //       .then((res) => {
// //   //         setView(views.filter((view) => view._id !== obj._id));
// //   //       });
// //   //   } catch (err) {
// //   //     console.log(err);
// //   //   }
// //   // }
// //   {
// //     console.log(obj);
// //   }

// //   return (
// //     <>
// //       {obj.id == sessionStorage.getItem("ID") && (
// //         <form onSubmit={submitHandler}>
// //           {/* style={state ? hidden : active} */}
// //           <div className="col">
// //             <div className="card h-100">
// //               <img src={"/assets/3/3.jpg"} className="card-img-top" alt="..."></img>
// //               <div className="card-body">
// //                 <h5 className="card-title">{obj.식당}</h5>
// //                 <p className="card-text">주류 : {obj.drink}</p>
// //                 <p className="card-text">안주 : {obj.food}</p>
// //                 <button className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto" type="submit">
// //                   삭제하기
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </form>
// //       )}
// //     </>
// //   );
// // };

//   return (
//     <>
//       <form onSubmit={submitHandler}>
//         {/* style={state ? hidden : active} */}
//         <div className="col">
//           <div className="card">
//             <img
//               src={"/assets/3/3.jpg"}
//               className="card-img-top"
//               alt="..."
//             ></img>
//             <div className="card-body">
//               <h5 className="card-title">{props.obj.place}</h5>
//               <p className="card-text">주류 : {props.obj.drink}</p>
//               <p className="card-text">안주 : {props.obj.food}</p>
//               <button
//                 className="btn btn-dark mt-4 mb-2 d-grid gap-2 col-6 mx-auto"
//                 type="submit"
//               >
//                 삭제하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };
// // //fadeout을 구현하기 위해 active와 hidden을 구현
// // const active = {
// //   opacity: "1",
// //   transition: "opacity 500ms",
// // };

// // const hidden = {
// //   opacity: "0",
// //   visibility: "hidden",
// //   transition: "opacity 500ms , visibility 500ms",
// // };
// // export default Show;