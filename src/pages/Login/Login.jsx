import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import SpinnerLoad from "../../components/SpinnerLoad/SpinnerLoad";

import './Login.css'
import { Atom } from "react-loading-indicators";
const Login = ({ setIsLogedIn }) => {
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [student_name, setStudentName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notify = (message) => toast(message);
  console.log(studentId);

  const handleLogin = (event) => {
    event.preventDefault();
    let allOk = false;
    console.log("Loged in");

    if (studentId) {
      console.log(studentId);
    }

    setIsLoading(true);

    fetch("https://notice-management-backend.onrender.com/student/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student_id: studentId }),
    })
      .then((response) => {
        if (response.status === 200) {
          allOk = true;
        } else if (response.status === 400) {
          console.log("Not Ok");
        }

        if (!response.ok) {
          console.log("Response not ok!");
        }
        return response.json();
      })
      .then((data) => {
        if (allOk && data.token) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("student_name", data.student_name);
          localStorage.setItem("student_id", studentId.toString());
          localStorage.setItem("message", data.message);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setIsLoading(false);
          toast.error(data.student_id[0]);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  return (
    <>
        <>
          <div className="batch-name-number-parent-container  bg-gradient-to-b from-[#0597FF2C] to-white ">
            <div className="batch-number-child-container mx-auto max-w-[1400px] flex justify-between items-center">
              <div className="px-5 py-8 blur-bar">
                <div className="flex batch-name-number gap-36">
                  <p className="font-bold font-sans text-[#2E90FA] text-2xl  md:text-3xl ">
                    CSE61_A
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="login-portal-container h-[60vh] w-full flex justify-center items-center">
            <div className="mx-4 form-content">
              <div className="flex flex-col heading-form-container gap-7">
                <h1 className="form-heading font-sans font-bold text-3xl md:text-4xl text-[#101828]">
                  Log in to portal 💯
                </h1>
                {isLoading ? (<div className="flex items-center justify-center mt-5">
                          <Atom color="#2E90FA" size="medium" text="61 A" textColor="" />
                </div>) : ""}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex flex-col gap-5 lebel-input-btn-container">
                    <div className="label-input-container">
                      <p className="font-sans font-[400] text-lg md:text-xl text-[#101828] mb-1">
                        Enter your ID
                      </p>
                      <input
                        onChange={(e) => {
                          setStudentId(e.target.value);
                        }}
                        className="border-2 rounded px-3 md:px-4 py-1 md:py-2 outline-none w-full h-[3rem] md:h-[3.5rem] placeholder:text-lg md:placeholder:text-xl"
                        type="number"
                        placeholder="0272230005xxxx"
                      />
                    </div>
                    <div className="submit-btn-container ">
                      <button
                        onClick={(e) => {
                          handleLogin(e);
                        }}
                        type="button"
                        className="bg-[#2E90FA] px-5 py-2 md:px-8 md:py-3 rounded-lg border-b-4 border-b-[#86CAFF] text-white text-lg md:text-xl"
                      >
                        {isLoading ? "Logging.." : "Login"}
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </>

      <ToastContainer />
    </>
  );
};

export default Login;
