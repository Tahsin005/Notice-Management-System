import React, { useState } from "react";
import dateIcon from "../../assets/images/date_icon.png";
import assIcon from "../../assets/images/assignment_icon.png";
import courseIcon from "../../assets/images/course_icon.png";
import bellIcon from "../../assets/images/bell_icon.png";
import linkIcon from "../../assets/images/LinkIcon.png";
import { SiGoogleclassroom } from "react-icons/si";
const PostCard = ({ ct }) => {
  // console.log("here");
  // console.log(ct);

  const [descLength, setDescLength] = useState(100)
  const handleReadMore = () => {
    setDescLength(ct?.description.length)
  }
  return (
    <div className="post-card border border-slate-200 rounded flex flex-col gap-4 md:gap-5 w-[21rem] md:w-[26rem] lg:w-[28rem] py-3 px-4 xl:py-4 xl:px-5">
      <div className="date-day flex gap-1 p-1 border rounded border-cyan-500 max-w-[200px]">
        <img src={dateIcon} alt={dateIcon} />
        <p className="font-sans text-sm md:text-[1rem] text-[#2E90FA] ">
          {new Date(ct?.created_at).toDateString()}
        </p>
      </div>
      <div className="car-details">
        {ct?.notice_type === "classroom_code" ? (
          <p className="text-3xl font-bold text-black xl:text-5xl">{ct?.description}</p>
        ) : (
          <div className="text-sm md:text-[1rem]">
            {ct?.description.length > descLength
              ? <>{ct.description.substring(0, descLength) + '...'}
                  <p onClick={handleReadMore} className="text-[#0597FF] cursor-pointer">Read More...</p>
                </>// If the description is longer than 25 characters, truncate and add ellipsis
              : <p onClick={() => {
                !window.getSelection().toString() > 0 && setDescLength(100)
              }}>{ct.description}</p>}
          </div>
        )}
      </div>

      {ct?.resource_link ? (
        ct?.notice_type == "classroom_code" ? (
          <a href={ct?.resource_link} target="_blank">
            <button className="self-start text-lg xl:text-xl text-white font-sans rounded bg-[#2E90FA] p-1 xl:p-2">
            Join Classroom
          </button>
          </a>
        ) : (
          <a href={ct?.resource_link}  target="_blank">
            <div className="attched-file-link flex gap-1 items-center justify-start max-w-72 p-1 text-[#2E90FA]">
            <img className="h-[24px] w-[24px]" src={linkIcon} alt={linkIcon} />
            <p>{`View attached files`}</p>
          </div>
          </a>
        )
      ) : null}
      <div className="flex gap-3 post-type-course-name">
        <div
          className={`assignment flex gap-2 xl:gap-3 ${
            ct?.notice_type == "classroom_code"
              ? "bg-[#EFF8FF]"
              : "bg-[#FFEAD5]"
          }  p-1 xl:p-2 items-center rounded justify-center`}
        >
          {ct?.notice_type == "classroom_code" ? (
            <SiGoogleclassroom />
          ) : (
            <img src={assIcon} alt={assIcon} />
          )}
          <p className="text-sm md:text-[1rem]">
            {ct?.notice_type
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 border border-black rounded course-name">
          <img
            className=""
            src={courseIcon}
            alt={courseIcon}
          />
          <p className="text-sm md:text-[1rem]">{ct?.course_name}</p>
        </div>
      </div>

      {ct?.date ? (
        <div className="submission-date-day flex gap-2 items-center border bg-[#FDB022] border-black rounded p-1 w-[90%]">
          <img src={bellIcon} alt="Bell Icon" />
          <p className="text-sm md:text-[1rem]">
            {ct?.notice_type === "exam" || ct?.notice_type === "class_test"
              ? "Exam"
              : "Submission"}{" "}
            Date: {new Date(ct?.date).toLocaleString()}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PostCard;
