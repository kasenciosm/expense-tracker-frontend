import { useState } from "react";
import styled from "styled-components";
import Button from "../src/components/Button/Button";
import { useGlobalContext } from "../src/context/GlobalContext";
import { boyHat, boyShortHair, boySunglasses, girlBored, girlMustache, girlSunGlasses } from "../public/avatars/avatars";



const AVATARS = [
 {src: boyHat, name: 'boyHat'},
 {src: girlBored, name: 'girlBored'},
 {src: boyShortHair, name: 'boyShortHair'},
 {src: girlMustache, name: 'girlMustache'},
 {src: boySunglasses, name: 'boySunGlasses'},
 {src: girlSunGlasses, name: 'girlSunGlasses'},
]

function Register({ onSuccess }) {
  const { registerUser, error } = useGlobalContext();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState('')

  const [inputState, setInputState] = useState({
    username: "",
    email: "",
    password: "",
    avatar: ""
  });

  const { username, email, password} = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleAvatarSelected = (avatar) => {
    setSelectedAvatar(avatar.src)
    setInputState( (prevState) => ({
      ...prevState,
      avatar: avatar.src
    })
     )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await registerUser(inputState);

      if (success) {
        setRegistrationSuccess(true); // Mostrar mensaje de éxito
        setInputState({
          // Limpiar formulario
          username: "",
          email: "",
          password: "",
          avatar: ""
        });
        if (onSuccess) onSuccess(); // Notificar componente padre
      }
    } catch (error) {
      console.log(error.message);
    }

    console.log('avatar seleccionado', selectedAvatar)
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {registrationSuccess ? (
        <div className="success-message">
          <p>¡Registro exitoso! ✅</p>
          <p>Por favor inicia sesión</p>
          <Button
            name={"Ir a Login"}
            onClick={() => setRegistrationSuccess(false)}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-green)"}
            color={"#fff"}
          />
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <input
              type="text"
              value={username}
              name={"username"}
              placeholder="Enter your username"
              onChange={handleInput("username")}
              required
            />
          </div>
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
          <div className="avatar-section">
            <h4>Selecciona un avatar:</h4>
            <div className="avatar-grid">
              {AVATARS.map((avatar, index) => (
                <div 
                  key={index}
                  className={`avatar-item ${selectedAvatar === avatar.src ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelected(avatar)}
                >
                  <img 
                    src={avatar.src} 
                    alt={avatar.name} 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="submit-btn">
            <Button
              name={"Register"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
            />
          </div>
        </>
      )}
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
  height: 65%;
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
    .avatar-section {
    .avatar-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: .5rem;
      
      .avatar-item {
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 50%;
        overflow: hidden;
        transition: all 0.3s ease;
        width: 50px;
        height: 50px;

        &.selected {
          border-color: red;
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

export default Register;
