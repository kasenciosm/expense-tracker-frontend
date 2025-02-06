/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { InnerLayout } from "../../styles/layouts";
import { dollar } from "../../utils/icons";
import Chart from "../Chart/Chart";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import HIstory from "../../History/History";

function Dashboard() {
  const {
    totalExpenses,
    transactionStats,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  const { income, expense } = transactionStats();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>all transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h3
                  style={{
                    opacity: "0.8",
                    fontSize: "1.2rem",
                  }}
                >
                  Total Income
                </h3>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h3
                  style={{
                    opacity: "0.8",
                    fontSize: "1.2rem",
                  }}
                >
                  Total Expenses
                </h3>
                <p style={{ color: "red" }}>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p
                  style={{
                    color: totalBalance() < 0 ? "red" : "var(--color-green)",
                  }}
                >
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <HIstory />
            <h2 className="salary-title">
              Min <span>Income</span>Max
            </h2>
            <div className="salary-item">
              <p>{income.min.toFixed(2)}</p>
              <p>{income.max.toFixed(2)}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>{expense.min.toFixed(2)}</p>
              <p>{expense.max.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 1;
        }
        .income,
        .expense {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          place-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            opacity: 0.6;
            font-size: 1.5rem;
            font-weight: 600;
          }
        }
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          grid-column: 3 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      display: flex;
      flex-direction: column;
      gap: 1.5 rem;
      margin-top: 2rem;
      width: 100%;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .stats-con {
      display: flex; /* Single column layout on smaller screens */
      flex-direction: column;

      .chart-con {
        grid-column: 1 / -1;
        height: auto;

        .amount-con {
          .income,
          .expense, .balance {
            grid-column: span 1;
          }
            .balance {
              grid-column: 1 / 3;
            }
        }
      }
    }
  }
`;

export default Dashboard;
