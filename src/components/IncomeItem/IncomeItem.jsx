import styled from "styled-components";
import {
  bitcoin,
  book,
  calender,
  card,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  question,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/icons";
import Button from "../Button/Button";
import DateFormat from "../../utils/DateFormat";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este ingreso")) {
      deleteItem(id);
    }
  };

  const categoryIcon = () => {
    console.log("expense", category);
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    console.log("expense", category);
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return piggy;
      default:
        console.warn("Categoría no encontrada", category);

        return question;
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender}
              {DateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-container">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color)"}
              color={"#fff"}
              // iColor={"#fff"}
              // hColor={"var(--color-green)"}
              onClick={handleDelete}
              responsiveStyles={{
                default: {
                  padding: "1rem",
                  bg: "var(--color-green)",
                  fontSize: "0.9rem",
                },
                mobile: {
                  bg: "var(--color-green)",
                  bPad: "0.7rem",
                  fontSize: "0.9rem",
                },
                small: {
                  bPad: "0.5rem",
                  fontSize: "0.8rem",
                },
              }}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
          word-break: break-word;
          max-width: 100%;
        }
      }
    }
  }
  .btn-container {
    display: flex;
    align-items: center;
    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    gap: 1rem;

      .icon {
        width: 50px;
        height: 50px;
        border-radius: 15px;
        i {
          font-size: 2rem;
        }
      }

      .content {
        h5 {
          font-size: 1.2rem;
          padding-left: 1.5rem;
          margin-bottom: 0.3rem;
        }
      
        .inner-content{
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
        }
      }

      .btn-container {
        align-self: flex-end;
      }
  }

`;
export default IncomeItem;
