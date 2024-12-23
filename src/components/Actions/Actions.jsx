import React, { useState } from "react";
import selectIcon from '../../assets/images/Select.png'
const Actions = ({setQueryParams, selectedActions, setActName, cls, img_src, title}) => {
  const[isSelected, setIsSelected] = useState(false)
  return (
    <div className={`${cls} flex gap-2 justify-center items-center lg:justify-start lg:items-start`}>
      <img className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]" onClick={() => {
          setIsSelected(!isSelected)
          !isSelected && setQueryParams((prev) => [...prev, cls])
          !isSelected && title !== 'All' && selectedActions.push(title)
          isSelected &&  title !== 'All'&& selectedActions.splice(selectedActions.indexOf(title), 1)
          isSelected && setQueryParams((prev) => prev.filter((item) => item !== cls));
          setActName(selectedActions.join(', '))
          console.log(selectedActions);
        }} src={isSelected? selectIcon : img_src} alt={img_src}/>
      <p className="">{title}</p>
    </div>
  );
};

export default Actions;
