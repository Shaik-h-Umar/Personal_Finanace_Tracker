import { Line, Pie } from "@ant-design/charts";
import { Color } from "antd/es/color-picker";
import React from "react";

function ChartComponent({ sortedTransaction = [], expenseData = [] }) {
  const data = Array.isArray(sortedTransaction)
    ? sortedTransaction.map((item) => ({
        date: item.date,
        amount: item.amount,
      }))
    : [];

  const spendingDataArray = Array.isArray(expenseData) ? expenseData : [];

  const config = {
    data: data,
    width: 800,
    height: 400,
    autofit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "line",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const spendingConfig = {
    data: spendingDataArray,
    width: 400,
    height: 400,
    angleField: "amount",
    colorField: "tag",
    label: {
      content: ({ percent, tag }) =>
        `${tag ? tag : "Unknown"}: ${(percent * 100).toFixed(2)}%`,  // Add fallback for undefined tags
      style: {
        fill: "#000",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  

  let chart;
  let pieChart;

  return (
    <div className="charts-wrapper">
      <div style={{backgroundColor: "#fff"}}>
        <h2>Your Analytics</h2>
        <Line {...config} onReady={(charInstance) => (chart = charInstance)} />
      </div>
      <div style={{backgroundColor: "#fff"}}>
        <h2>Your Expense Analytics</h2>
        {spendingDataArray.length === 0 ? (
          <p>Seems like you haven't spent anything till now...</p>
        ) : (
          <Pie
            {...spendingConfig}
            onReady={(charInstance) => (pieChart = charInstance)}
          />
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
