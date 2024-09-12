import React from "react";
import { CoreConceptsData } from "./data.js";

import "./style.css";

const CoreConcepts = () => {
  return (
    <div id="core-concepts">
      <h3>{CoreConceptsData?.title}</h3>
      <ul>
        {CoreConceptsData?.data?.map((dataItem) => (
          <li key={dataItem.title}>
            <img src={dataItem?.img} alt={dataItem?.title} />
            <h3>{dataItem?.title}</h3>
            <p>{dataItem?.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoreConcepts;
