import React from "react";
import { TabsProps } from "antd";
import OpenOrders from "./OpenOrders";
import OrderDataTabApp from "./OrderDataTabApp";
import OrderHistory from "./OrderHistory";

const OrderData = ({
  order,
}: {
  order: {
    marketType:"BUY"|"SELL",
    pair:string,
    entryPrice:number,
    amount:number,
    targetPrice:number,
    canceled:boolean,
    isFullfiled:boolean
  }[];
}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "OPEN ORDERS",
      children: <OpenOrders order={order} />,
    },
    {
      key: "2",
      label: "ORDER HISTORY",
      children: <OrderHistory order={order} />,
    },
  ];

  return (
    <div className="px-4 ">
      <OrderDataTabApp items={items} />
    </div>
  );
};

export default OrderData;
