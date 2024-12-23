import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import crossIcon from "../../assets/images/crossWhite.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QueryFormMobile = ({ isOpneQfrom, setIsopenQform }) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    query: "",
  });
  const [queryMessage, setQueryMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    const storedStudentId = localStorage.getItem("student_id");
    const storedName = localStorage.getItem("student_name");

    setForm((prevForm) => ({
      ...prevForm,
      studentId: storedStudentId || "",
      name: storedName || "",
    }));
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "CR",
          from_email: form.email,
          to_email: "cse.61.a@gmail.com",
          message: form.query,
          student_id: form.studentId,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setQueryMessage('Your query has been sent successfully.')

          setTimeout(() => {
            setQueryMessage(null);
          }, 3000);

          const storedStudentId = localStorage.getItem("student_id");
          const storedName = localStorage.getItem("student_name");
          setForm({
            studentId: storedStudentId || "",
            name: storedName || "",
            email: "",
            query: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("Error sending query:", error);
          alert("Failed to send your query. Please try again.");
        }
      );
  };

  return (
    <>
      <div className={`login-popup none ${isOpneQfrom}`}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="login-popup-container bg-gradient-to-bl from-cyan-50 to-white"
        >
          <div>
            {queryMessage && <p className="font-extrabold text-red-500">{queryMessage}</p>}
          </div>
          <div className="login-popup-inputs">
            <div className="id-filed">
              <p className="text-black">ID</p>
              <input
                className="w-full"
                type="number"
                placeholder="0272230005xxxx"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="name-field">
              <p className="text-black">Name</p>
              <input
                className="w-full"
                type="text"
                placeholder="First Name Last Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="email-field">
              <p className="text-black">Email</p>
              <input
                className="w-full"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="query-field">
              <p className="text-black">Write Your Query</p>
              <textarea
                id="query"
                className="query-textarea"
                placeholder="Write Something here..."
                name="query"
                value={form.query}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="flex gap-5 send-close-btn-container">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2E90FA] rounded-lg px-4 py-1 md:px-8 md:py-2 text-sm md:text-lg text-white border-b-4 border-[#86CAFF]"
            >
              {loading ? "Sending..." : "Send"}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsopenQform("hidden");
              }}
              className="close-btn-container flex gap-2 justify-center items-center text-sm md:text-lg rounded-lg  px-4 py-1 md:px-8 md:py-2 border-b-4 border-[#FECDD6] bg-[#F63D68] text-white"
            >
              <img className="text-white w-[20px] h-[20px] md:w-[24px] md:h-[24px]" src={crossIcon} alt="" /> Close{" "}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default QueryFormMobile;
