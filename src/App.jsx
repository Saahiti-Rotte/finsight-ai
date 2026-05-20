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
  subscribeToTransactions,
  getIncome,
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
    useState([]);

  // MONTHLY INCOME
  const [monthlyIncome, setMonthlyIncome] =
    useState(0);

  // CURRENT PAGE
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  // AUTH + FIRESTORE
  useEffect(() => {
    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          if (currentUser) {
            // LOAD INCOME
            const income =
              await getIncome(
                currentUser.uid
              );

            setMonthlyIncome(
              income
            );

            // REALTIME TRANSACTIONS
            const unsubscribeFirestore =
              subscribeToTransactions(
                currentUser.uid,
                (
                  cloudTransactions
                ) => {
                  setTransactions(
                    cloudTransactions
                  );
                }
              );

            setLoading(false);

            return () =>
              unsubscribeFirestore();
          }

          setTransactions([]);

          setMonthlyIncome(0);

          setLoading(false);
        }
      );

    return () =>
      unsubscribeAuth();
  }, []);

  // LOADING
  if (loading) {
    return <LoadingScreen />;
  }

  // LOGIN PAGE
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

  // BUDGET LEFT
  const budgetLeft =
    monthlyIncome - totalSpent;

  // SAVINGS %
  const savingsScore =
    monthlyIncome > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.floor(
              (budgetLeft /
                monthlyIncome) *
                100
            )
          )
        )
      : 0;

  // SUBSCRIPTIONS
  const subscriptions = expenses
    .filter(
      (t) =>
        t.category?.toLowerCase() ===
        "subscription"
    )
    .reduce(
      (sum, t) => sum + t.amount,
      0
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
              monthlyIncome={
                monthlyIncome
              }
              setMonthlyIncome={
                setMonthlyIncome
              }
              user={user}
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