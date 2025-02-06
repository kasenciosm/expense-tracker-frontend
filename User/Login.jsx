import { useState } from "react";
import styled from "styled-components";

import Button from "../src/components/Button/Button";
import { useGlobalContext } from "../src/context/GlobalContext";


function Login() {
    const { loginUser, error } = useGlobalContext();
    const [inputState, setInputState] = useState({
        email: "",
        password: "",
    });
    
    const { email, password } = inputState;
    
    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
    loginUser({ email, password });
    
    setInputState({
      email: "",
      password: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="email"
          value={email}
          name={"email"}
          placeholder="name@mail.com"
          onChange={handleInput("email")}
        />
      </div>
      <div className="input-control">
        <input
          type="password"
          value={password}
          name={"password"}
          placeholder="*********"
          onChange={handleInput("password")}
          required
        />
      </div>
      <div className="submit-btn">
        <Button
          name={"Login"}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 1rem;
  background: #fcf6f9;
  height:50%;
  input {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(185, 86, 86, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default Login;
