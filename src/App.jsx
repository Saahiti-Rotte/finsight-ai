import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

import Sidebar from "./components/Sidebar";

import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";

import TransactionsPage from "./pages/TransactionsPage";

import AnalyticsPage from "./pages/AnalyticsPage";

import AIPage from "./pages/AIPage";

import AuthPage from "./pages/AuthPage";

import {
  transactions as initialData,
} from "./data/financeData";

import {
  getTransactions,
} from "./services/firestoreService";

export default function App() {
  // USER
  const [user, setUser] =
    useState(null);

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // TRANSACTIONS
  const [transactions, setTransactions] =
    useState(initialData);

  // PAGE
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  // AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          // LOAD CLOUD DATA
          if (currentUser) {
            const cloudTransactions =
  await getTransactions(
    currentUser.uid
  );

            if (
              cloudTransactions.length >
              0
            ) {
              setTransactions(
                cloudTransactions
              );
            }
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          fontSize: "22px",

          fontWeight: "700",
        }}
      >
        Loading FinSight AI...
      </div>
    );
  }

  // EXPENSES
  const expenses = transactions.filter(
    (t) => !t.income
  );

  // TOTAL SPENT
  const totalSpent = expenses.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  // SUBSCRIPTIONS
  const subscriptions = expenses
    .filter(
      (t) =>
        t.category?.toLowerCase() ===
        "subscription"
    )
    .reduce((sum, t) => sum + t.amount, 0);

  // BUDGET
  const budget = 50000;

  const budgetLeft =
    budget - totalSpent;

  // SAVINGS SCORE
  const savingsScore = Math.max(
    40,
    Math.min(
      100,
      Math.floor(
        (budgetLeft / budget) * 100
      )
    )
  );

  // CATEGORY TOTALS
  const categoryTotals = {};

  expenses.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }

    categoryTotals[t.category] +=
      t.amount;
  });

  // CATEGORY DATA
  const categoryData =
    Object.entries(categoryTotals).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  // TREND DATA
  const spendTrendData = [
    {
      month: "Jan",
      spending: 22000,
    },
    {
      month: "Feb",
      spending: 28000,
    },
    {
      month: "Mar",
      spending: 24000,
    },
    {
      month: "Apr",
      spending: 32000,
    },
    {
      month: "May",
      spending: totalSpent,
    },
  ];

  // NOT LOGGED IN
  if (!user) {
    return (
      <AuthPage
        setUser={setUser}
      />
    );
  }

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={
          setCurrentPage
        }
      />

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="content">
          {/* DASHBOARD */}
          {currentPage ===
            "dashboard" && (
            <Dashboard
              transactions={
                transactions
              }
              setTransactions={
                setTransactions
              }
              totalSpent={
                totalSpent
              }
              budgetLeft={
                budgetLeft
              }
              savingsScore={
                savingsScore
              }
              subscriptions={
                subscriptions
              }
              spendTrendData={
                spendTrendData
              }
              categoryData={
                categoryData
              }
            />
          )}

          {/* TRANSACTIONS */}
          {currentPage ===
            "transactions" && (
            <TransactionsPage
              transactions={
                transactions
              }
            />
          )}

          {/* ANALYTICS */}
          {currentPage ===
            "analytics" && (
            <AnalyticsPage
              spendTrendData={
                spendTrendData
              }
              categoryData={
                categoryData
              }
            />
          )}

          {/* AI */}
          {currentPage === "ai" && (
            <AIPage
              transactions={
                transactions
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}