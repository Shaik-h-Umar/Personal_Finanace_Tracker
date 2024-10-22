import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import AddExpenseModal from "../Components/Modals/AddExpense";
import AddIncomeModal from "../Components/Modals/addIncome";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionTable from "../Components/TransactionTable";
import ChartComponent from "../Components/Charts";
import NoTransactions from "../Components/NoTransaction";

function Dashboard() {
  const [transaction, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [sortKey, setSortKey] = useState("date");

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag || "Unknown", // Ensure a default tag value
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(newTransaction, many = false) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        newTransaction
      );
      if (!many) toast.success("Transaction Added!");

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { id: docRef.id, ...newTransaction },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance(transaction);
  }, [transaction]);

  const calculateBalance = (transactionsList) => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactionsList.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  // Sort transactions by date
  let sortedTransaction = transaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    }
  });

  // Prepare data for Pie chart by grouping by tags
  let expenseDataByTag = transaction.length
    ? transaction
        .filter((t) => t.type === "expense")
        .reduce((acc, obj) => {
          let key = obj.tag || "Unknown"; // Ensure tag is defined
          if (!acc[key]) {
            acc[key] = { tag: key, amount: obj.amount || 0 }; // Ensure amount is defined
          } else {
            acc[key].amount += obj.amount || 0;
          }
          return acc;
        }, {})
    : {};

  const expenseChartData = Object.values(expenseDataByTag); // Data for Pie chart

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transaction && transaction.length !== 0 ? (
            <ChartComponent
              sortedTransaction={sortedTransaction} // For Line Chart
              expenseData={expenseChartData} // For Pie Chart
            />
          ) : (
            <NoTransactions />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable
            transaction={transaction}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
