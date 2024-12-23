import React, { useState } from "react";
import cross from "../../assets/images/cross.png";
import no_select from "../../assets/images/no_select.png";
import select from "../../assets/images/Select.png";
import Actions from "../Actions/Actions";
import './Filter.css'

const selectedActions = [];
const Fileter = ({ setQueryParams }) => {
  const [actName, setActName] = useState("All");
  return (
    <>
      <div className="filter-container flex flex-row justify-between items-center lg:flex-col lg:justify-start lg:items-start xl:flex-col gap-1 lg:gap-6 w-full lg:w-[250px] ">
        <p className="text-xl md:text-2xl mb-1 lg:mb-0 lg:text-3xl xl:text-4xl font-sans font-bold text-[#2E90FA] lg:text-black">
          Filter
        </p>
        {selectedActions.length > 0 ? (
          <div className="action-names-container hidden lg:flex flex-wrap gap-1 border border-slate-200 max-w-[200px] rounded p-2">
            {selectedActions.map((actName, idx) => (
              <div
                key={idx}
                className={`${
                  idx % 2 == 0 ? "text-black" : "text-[#2E90FA]"
                } bg-slate-100 px-2 rounded`}
              >
                {actName}
              </div>
            ))}
            {/* <img src={cross} alt="cross-logo"/> */}
          </div>
        ) : null}
        <div className="scrorable-actions-bar overflow-x-scroll">
          <div className="actions flex flex-row  w-[800px] lg:w-full lg:max-w-none lg:flex-col gap-3 lg:gap-6">
            {/* <Actions selectedActions = {selectedActions} setActName={setActName} cls="All" img_src = {select} title="All"/> */}
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="assignment"
              img_src={no_select}
              title="Assignment"
            />
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="lab_report"
              img_src={no_select}
              title="Lab Report"
            />
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="class_test"
              img_src={no_select}
              title="Class Test"
            />
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="presentation"
              img_src={no_select}
              title="Presentation"
            />
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="exam"
              img_src={no_select}
              title="Exam"
            />
            <Actions
              setQueryParams={setQueryParams}
              selectedActions={selectedActions}
              setActName={setActName}
              cls="classroom_code"
              img_src={no_select}
              title="Classroom Code"
            />
            {/* <Actions selectedActions = {selectedActions} setActName={setActName} cls="Other" img_src = {no_select} title="Other"/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fileter;
