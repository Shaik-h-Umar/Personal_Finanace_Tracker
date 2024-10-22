import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Buttons";

function Cards({income,expense,totalBalance,showExpenseModal, showIncomeModal}) {
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{totalBalance}</p>
          <Button text="Reset Balance" Very_dark_cyan={true} />
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" Very_dark_cyan={true} onClick={showIncomeModal}/>
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button text="Add Expenses" Very_dark_cyan={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;