'use client'
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },

];

const TabApp = ({tabItems,id,classN}:{tabItems?:TabsProps["items"],id?:string,classN?:string}) => {

    return (
  <Tabs id={id} defaultActiveKey="1" items={tabItems}  onChange={onChange} className={classN} />
    );
};

export default TabApp;
