import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Incomes from "./components/Dashboard/incomes/Incomes";
import Expenses from "./components/Dashboard/expenses/Expenses";
import { useGlobalContext } from "./context/GlobalContext";
import { closeMenu, menuBurger } from "./utils/icons";
import Login from "../User/Login";
import Register from "../User/Register";

function App() {
  const [active, setActive] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useGlobalContext();

  useEffect(() => {
    console.log("Nuevo valor de isOpen: ", isOpen)
  }, [isOpen])

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      {isAuthenticated ? (
        <MainLayout>
          <div style={{ display: "flex"}}>
            <button
              onClick={() => {
                console.log("antes: ", isOpen)
                setIsOpen((prev)=> !prev)
                console.log("despues: ", isOpen)
              }}
              style={{
                position: "fixed",
                top: "20px",
                left: "20px",
                zIndex: 2000,
                background: "transparent",
                border: "none",
                fontSize: "1.6rem",
                cursor: "pointer",
                color: "gray",
              }}
            >
             {isOpen ? closeMenu : menuBurger}
            </button>
          </div>
          <Navigation
            active={active}
            setActive={setActive}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <main style={{ 
            flex: 1, 
            marginLeft: isOpen ? "250px" : "0", 
            transition: "margin-left 0.3s ease-in-out" 
            }}>
              {displayData()}
          </main>
        </MainLayout>
      ) : (
        <AuthContainer>
          {showLogin ? (
            <Login />
          ) : (
            <Register onSuccess={() => setShowLogin(true)} />
          )}
          <ToggleAuth>
            <p>
              {showLogin
                ? "Don't have an account?  "
                : "Already have an account? "}
              <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? " Register" : " Login"}
              </button>
            </p>
          </ToggleAuth>
        </AuthContainer>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  padding: 20px;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;
const AuthContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  gap: 20px;
`;
const ToggleAuth = styled.div`
  p {
    color: rgba(57, 54, 56, 0.78);
    font: bold;
  }

  button {
    background: transparent;
    border: none;
    color: rgba(58, 132, 242, 0.78);
    cursor: pointer;
    font-size: 16px;
    text-decoration: underline;
  }
`;

export default App;
