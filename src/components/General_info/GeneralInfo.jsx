import React, { useState } from "react";
import QueryForm from "../QueryForm/QueryForm";
import QueryFormMobile from "../QueryForm/QueryFormMobile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GeneralInfo = ({windowSize, setWindowSize}) => {
  const [isOpneQfrom, setIsopenQform] = useState('hidden')
  return (
    <>
      <div className="general-info-query-container hidden lg:flex flex-col justify-between h-[82vh] max-w-[400px]">
        <div>
        <div className="title-info-cart flex flex-col">
          <p className="font-bold text-3xl xl:text-4xl font-sans self-end mb-10">
            General Details
          </p>
        </div>
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
        <button
          onClick={() => {
            setIsopenQform('')
            // setIsACRCliked(true)
          }}
          type="submit"
          className="bg-[#2E90FA] px-5 py-2 xl:px-8 xl:py-3 rounded-lg border-b-4 border-b-[#86CAFF] text-white text-sm md:text-xl self-end"
        >
          Ask CR
      </button>
      </div>
      <button
          onClick={() => {
            setIsopenQform('')
          }}
          type="submit"
          className="bg-[#2E90FA] block lg:hidden fixed bottom-4 right-4  px-5 py-2 xl:px-8 xl:py-3 rounded-lg border-b-4 border-b-[#86CAFF] text-white text-sm md:text-xl self-end"
        >
          Ask CR
      </button>
      {windowSize < 768 ? <QueryFormMobile isOpneQfrom = {isOpneQfrom} setIsopenQform = {setIsopenQform}/> : <QueryForm toast={toast} isOpneQfrom = {isOpneQfrom} setIsopenQform = {setIsopenQform}/>}
      <ToastContainer/>
    </>
  );
};

export default GeneralInfo;
