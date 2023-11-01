'use client'
import React from "react";
import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import TableApp from "../Antd/TableApp";

interface DataType {
  key: React.Key;
  marketType: "BUY" | "SELL";
  pair: string;
  entryPrice: number;
  amount: number;
  targetPrice: number;
  canceled: boolean;
  isFullfiled: boolean;
}

function OpenOrders({
  order,
}: {
  order: {
    marketType: "BUY" | "SELL";
    pair: string;
    entryPrice: number;
    amount: number;
    targetPrice: number;
    canceled: boolean;
    isFullfiled: boolean;
  }[] | any;
}) {
  const filteredOrders = order.filter((e: any) => !e.canceled);

  const columns: ColumnsType<DataType> = [
    {
      title: "Type",
      dataIndex: "marketType",
      key: "marketType",
      render: (text: any) =>
        text === "BUY" ? (
          <p className="bg-green-500 rounded-lg w-fit block p-2 text-white">{text}</p>
        ) : (
          <p className="bg-red-500 rounded-lg p-2 text-white">{text}</p>
        ),
    },
    {
      title: "Pair",
      dataIndex: "pair",
      key: "pair",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Entry Price",
      dataIndex: "entryPrice",
      key: "entryPrice",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Target Price",
      dataIndex: "targetPrice",
      key: "targetPrice",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button danger>Cancel Order</Button>
        </Space>
      ),
    },
  ];

  return (
    <section className="w-full relative overflow-y-scroll h-[100px]">
      <TableApp columns={columns} data={filteredOrders} pagination={false} />
    </section>
  );
}

export default OpenOrders;
