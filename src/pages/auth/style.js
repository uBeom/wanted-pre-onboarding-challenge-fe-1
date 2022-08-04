import styled from "styled-components";

export const Form = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: ${({ activeButton }) => (activeButton ? "gray" : "red")};
`;
