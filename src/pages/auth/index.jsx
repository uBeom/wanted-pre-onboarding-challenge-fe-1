import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { URL } from "../../constants/url";

const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const passwordRegExp = /^[A-Za-z0-9]{8,}$/;

const fetchAuth = async (path, email, password) => {
  try {
    const res = await fetch(`${URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const Auth = () => {
  const email = useRef("");
  const password = useRef("");
  const [activeEmail, setActiveEmail] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) return navigate("/");
  }, []);

  useEffect(() => {
    if (activeEmail && activePassword) setActiveButton(true);
    else setActiveButton(false);
  }, [activeEmail, activePassword]);

  const setAuthEmail = (emailText) => {
    email.current = emailText;

    if (emailRegExp.test(emailText)) return setActiveEmail(true);
    return setActiveEmail(false);
  };

  const setAuthPassword = (passwordText) => {
    password.current = passwordText;

    if (passwordRegExp.test(passwordText)) return setActivePassword(true);
    return setActivePassword(false);
  };

  const handleChangeEmail = ({ target }) => {
    setAuthEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setAuthPassword(target.value);
  };

  const handleClickSignUpButton = async () => {
    if (activeButton) {
      const data = await fetchAuth(
        "/users/create",
        email.current,
        password.current
      );

      if (data?.message) return window.alert(data.message);

      return window.alert("이미 회원가입 했어요.");
    }
  };

  const handleClickSignInButton = async () => {
    if (activeButton) {
      const data = await fetchAuth(
        "/users/login",
        email.current,
        password.current
      );

      if (data?.message) {
        window.localStorage.setItem("token", data.token);
        window.alert(data.message);
        return navigate("/");
      }
    }
  };

  return (
    <S.Form>
      <label>
        email
        <input type="email" onChange={handleChangeEmail} />
      </label>
      <label>
        password
        <input type="password" onChange={handleChangePassword} />
      </label>
      <S.Button
        type="button"
        onClick={handleClickSignUpButton}
        activeButton={activeButton}
      >
        회원가입
      </S.Button>
      <S.Button
        type="button"
        onClick={handleClickSignInButton}
        activeButton={activeButton}
      >
        로그인
      </S.Button>
    </S.Form>
  );
};
