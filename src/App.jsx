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

import LoadingScreen from "./components/LoadingScreen";

import {
  transactions as initialData,
} from "./data/financeData";

import {
  subscribeToTransactions,
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

  // CURRENT PAGE
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  // AUTH + REALTIME FIRESTORE
  useEffect(() => {
    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          // USER LOGGED IN
          if (currentUser) {
            const unsubscribeFirestore =
              subscribeToTransactions(
                currentUser.uid,
                (
                  cloudTransactions
                ) => {
                  if (
                    cloudTransactions.length >
                    0
                  ) {
                    setTransactions(
                      cloudTransactions
                    );
                  } else {
                    setTransactions([]);
                  }
                }
              );

            setLoading(false);

            return () =>
              unsubscribeFirestore();
          }

          // USER LOGGED OUT
          setTransactions([]);

          setLoading(false);
        }
      );

    return () =>
      unsubscribeAuth();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return <LoadingScreen />;
  }

  // NOT LOGGED IN
  if (!user) {
    return (
      <AuthPage
        setUser={setUser}
      />
    );
  }

  // EXPENSES ONLY
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

  // CATEGORY CHART DATA
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

          {/* AI PAGE */}
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