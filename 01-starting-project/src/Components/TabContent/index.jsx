import React, { useState } from "react";

import "./style.css";
import Tab from "./tabs";
import { Tabs, TabData } from "./utils";

const TabContent = () => {
  const [selectedContent, setSelectedContent] = useState('tab_1');
  const handelClick = (tabId) => {
    console.log("selectedContent===", tabId);
    setSelectedContent(tabId);
  };
  //   console.log("selectedContent", selectedContent);

  return (
    <div id="examples">
      <h2>{TabData.title}</h2>
      <menu>
        {Tabs.map((tab) => {
          return (
            <Tab
              key={tab.tabId}
              {...tab}
              handelClick={handelClick}
              selectedTab={selectedContent}
            />
          );
        })}
      </menu>

      <div id="tab-content">
        {/* {console.log('con:', TabData)} */}
        <h3>{TabData[selectedContent]?.title}</h3>
        <code>{TabData[selectedContent]?.disc}</code>
      </div>
    </div>
  );
};
export default TabContent;
