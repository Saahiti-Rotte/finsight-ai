import AIInsightBanner from "../components/AIInsightBanner";

import KPIRow from "../components/KPIRow";

import Transactions from "../components/Transactions";

import HealthScore from "../components/HealthScore";

import AddTransaction from "../components/AddTransaction";

import SpendTrend from "../components/SpendTrend";

import CategoryChart from "../components/CategoryChart";

import AnomalyCard from "../components/AnomalyCard";

import RecurringPayments from "../components/RecurringPayments";

import BudgetForecast from "../components/BudgetForecast";

import MonthlyReport from "../components/MonthlyReport";

import ExportReport from "../components/ExportReport";

import EmptyState from "../components/EmptyState";

export default function Dashboard({
  transactions,
  setTransactions,

  totalSpent,
  budgetLeft,
  savingsScore,
  subscriptions,

  spendTrendData,
  categoryData,
}) {
  // EMPTY STATE
  const hasTransactions =
    transactions.length > 0;

  return (
    <>
      {/* EMPTY EXPERIENCE */}
      {!hasTransactions ? (
        <>
          <EmptyState />

          <AddTransaction
            setTransactions={
              setTransactions
            }
          />
        </>
      ) : (
        <>
          {/* AI INSIGHT */}
          <AIInsightBanner
            totalSpent={
              totalSpent
            }
          />

          {/* KPI ROW */}
          <KPIRow
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
          />

          {/* CHARTS */}
          <div className="two-col">
            <SpendTrend
              data={
                spendTrendData
              }
            />

            <CategoryChart
              data={categoryData}
            />
          </div>

          {/* LOWER GRID */}
          <div className="three-col">
            {/* TRANSACTIONS */}
            <Transactions
              transactions={
                transactions
              }
            />

            {/* RIGHT COLUMN */}
            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "16px",
              }}
            >
              <HealthScore
                savingsScore={
                  savingsScore
                }
              />

              <AnomalyCard
                transactions={
                  transactions
                }
              />

              <RecurringPayments
                transactions={
                  transactions
                }
              />

              <BudgetForecast
                transactions={
                  transactions
                }
              />

              <MonthlyReport
                transactions={
                  transactions
                }
              />

              <ExportReport
                transactions={
                  transactions
                }
                savingsScore={
                  savingsScore
                }
              />
            </div>
          </div>

          {/* ADD TRANSACTION */}
          <AddTransaction
            setTransactions={
              setTransactions
            }
          />
        </>
      )}
    </>
  );
}