import jsPDF from "jspdf";

export default function ExportReport({
  transactions,
  savingsScore,
}) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // TITLE
    doc.setFontSize(22);

    doc.text(
      "FinSight AI Financial Report",
      20,
      20
    );

    // TOTAL SPENT
    const totalSpent =
      transactions
        .filter((t) => !t.income)
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    // CATEGORY TOTALS
    const categoryTotals = {};

    transactions.forEach((t) => {
      if (t.income) return;

      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }

      categoryTotals[t.category] +=
        t.amount;
    });

    // TOP CATEGORY
    const topCategory =
      Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
      )[0];

    // CONTENT
    doc.setFontSize(14);

    doc.text(
      `Total Spending: ₹${totalSpent.toLocaleString(
        "en-IN"
      )}`,
      20,
      50
    );

    doc.text(
      `Savings Score: ${savingsScore}/100`,
      20,
      65
    );

    doc.text(
      `Top Spending Category: ${
        topCategory?.[0] || "N/A"
      }`,
      20,
      80
    );

    doc.text(
      "AI Recommendation:",
      20,
      105
    );

    doc.setFontSize(12);

    doc.text(
      "Reducing food delivery and subscription usage can significantly improve monthly savings.",
      20,
      120,
      {
        maxWidth: 170,
      }
    );

    // TRANSACTIONS
    doc.setFontSize(14);

    doc.text(
      "Recent Transactions:",
      20,
      150
    );

    let y = 165;

    transactions
      .slice(0, 5)
      .forEach((t) => {
        doc.setFontSize(12);

        doc.text(
          `${t.name} - ₹${t.amount} (${t.category})`,
          20,
          y
        );

        y += 12;
      });

    // SAVE
    doc.save(
      "FinSight_Report.pdf"
    );
  };

  return (
    <button
      onClick={generatePDF}
      className="txn-btn"
      style={{
        marginTop: "10px",
      }}
    >
      Download PDF Report
    </button>
  );
}