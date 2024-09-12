import React, { useEffect } from "react";

const Tab = (props) => {
  const { label, tabId, handelClick, selectedTab } = props;
  return (
    <button
      className={tabId === selectedTab ? "active" : ""}
      onClick={() => handelClick(tabId)}
    >
      {label}
    </button>
  );
};
export default Tab;
