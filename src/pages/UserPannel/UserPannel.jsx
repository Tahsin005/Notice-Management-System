import React, { useEffect, useState } from "react";
import Fileter from "../../components/Fileter/Fileter";
import LastPosted from "../../components/Last_Posted/LastPosted";
import GeneralInfo from "../../components/General_info/GeneralInfo";
import { data, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import identityIcon from '../../assets/images/identity.svg'
import GenerallnfoMobile from "../../components/General_info/GenerallnfoMobile";
import { Atom } from "react-loading-indicators";

const UserPannel = ({ isLogedIn, setIsLogedIn }) => {
  const navigate = useNavigate();
  const [allPost, setAllPost] = useState(null)
  const [queryParams, setQueryParams] = useState([])
  const [isGenClicked, setIsGenClicked] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setWindowSize(window.innerWidth)
  }, [windowSize])
  useEffect(() => {
    let url = "https://notice-management-backend.onrender.com/all/notices/"
    let quParam = ''
    if (queryParams.length == 0) {
      ""
    }
    else {
      for (let i = 0; i < queryParams.length; i++) {
        if (i == 0) {
          quParam += `?notice_type=${queryParams[i]}`
        } else {
          quParam += `&notice_type=${queryParams[i]}`
        }
      }

    }

    let finalQuery = url + quParam;
    setIsLoading(true);


    fetch(finalQuery, {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        console.log(response?.detail)

        if (response?.detail && response?.detail === "Invalid token") {
          toast.info("Authorization failed.");
          localStorage.removeItem("token");
          localStorage.removeItem("student_name");
          localStorage.removeItem("student_id");
          localStorage.removeItem("message");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setAllPost(response);
          setIsLoading(false);
        }

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [queryParams])
  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found, user is not logged in.");
      return;
    }

    toast.success("Logout successful!");
    localStorage.removeItem("token");
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_id");
    localStorage.removeItem("message");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleGenInfo = () => {
    setIsGenClicked(true)
  }
  return (
    <>
      <div className="batch-user-logout-container bg-gradient-to-b from-[#0597FF2C] to-white ">
        <div className="batch-user-logout-content mx-auto max-w-[1400px] flex justify-between items-center">
          <div className="px-4 py-3 blur-bar lg:py-8 lg:px-5">
            <div className="flex flex-col gap-2 lg:flex-row batch-name-user-name lg:gap-36">
              <p className="font-bold font-sans text-[#2E90FA] text-2xl xl:text-3xl ">
                CSE61_A
              </p>
              <p className={`font-bold ${isGenClicked ? 'hidden' : ''} font-sans text-[#475467] text-sm md:text-xl lg:text-2xl xl:text-3xl`}>
                {`Hello!👋 ${localStorage.getItem('student_name') ? localStorage.getItem('student_name') : 'username'}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col self-start gap-1 mt-4 mr-4 logout-btn-identity-container md:gap-4">
            <button
              onClick={() => {
                handleLogout()
              }}
              type="submit"
              className={`logout-btn ${isGenClicked ? 'hidden' : ''} bg-[#2E90FA] px-6 py-2 xl:px-8 xl:py-3 rounded-lg border-b-4 border-b-[#86CAFF] text-white text-sm lg:text-lg xl:text-xl`}
            >
              Logout
            </button>
            <img onClick={handleGenInfo} className={`block ${isGenClicked ? 'hidden' : ''} self-end lg:hidden cursor-pointer`} src={identityIcon} alt={identityIcon} />
          </div>
        </div>
      </div>
      {isGenClicked ? <GenerallnfoMobile isGenClicked={isGenClicked} setIsGenClicked={setIsGenClicked} /> :
        <div className="filter-last-posted-gen-details flex flex-col lg:flex-row justify-between gap-2 md:gap-6 xl:gap-15 mx-auto px-4 lg:px-5 mt-5 max-w-[1400px]">
          <Fileter setQueryParams={setQueryParams} />
          <p className='block font-sans text-2xl font-bold text-center lg:hidden '>Last Posted ⚡</p>
          {isLoading ? (<div className="mt-40 sm:justify-center sm:items-center lg:block sm:flex">
            <Atom color="#2E90FA" size="medium" text="61 A" textColor="" />
          </div>) : (allPost && allPost.length > 0 ? (<LastPosted allPost={allPost} />) : <div className='text-2xl font-bold text-red-500 lg:block sm:justify-center sm:items-center sm:flex mt-36 md:text-4xl'>No Notice Found.</div>)}
          <GeneralInfo windowSize={windowSize} setWindowSize={setWindowSize} />
        </div>}
      <ToastContainer />
    </>
  );
};

export default UserPannel;
