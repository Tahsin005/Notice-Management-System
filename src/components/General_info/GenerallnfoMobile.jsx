import React from "react";
import arrowLeft from "../../assets/images/arrow_left_alt.svg";
const GenerallnfoMobile = ({ isGenClicked, setIsGenClicked }) => {
  const handleBack = () => {
    setIsGenClicked(false);
  };
  return (
    <>
      <div
        onClick={handleBack}
        className="go-back-btn-container flex justify-start items-center gap-2 p-2 cursor-pointer"
      >
        <img className="back-arrow" src={arrowLeft} alt={arrowLeft} />
        <p className="text-2xl font-bold text-[#475467]">Back</p>
      </div>
      <div className="info-card-mobile w-full h-[80vh] flex justify-center items-center">
        <div className="info-card flex flex-col gap-28 p-5 xl:p-8 rounded-lg bg-gradient-to-bl from-red-100 to-cyan-50">
          <div className="user-name-batch flex justify-between text-lg xl:text-xl">
            <p>
              {localStorage.getItem("student_name")
                ? localStorage.getItem("student_name")
                : "username"}
            </p>
            <p>CSE61A</p>
          </div>
          <div className="identity-no font-bold text-3xl xl:text-4xl">
            <p>
              {localStorage.getItem("student_id")
                ? localStorage.getItem("student_id")
                : "0272230005xxxx"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerallnfoMobile;
