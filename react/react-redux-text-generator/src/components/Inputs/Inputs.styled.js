import styled from "styled-components";

export const Styled = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 1rem;
  div {
    margin-right: 20px;
    label {
      font-size: 1.5rem;
    }
    input {
      height: 30px;
      font-size: 20px;
      width: 3.5rem;
      margin-top: 10px;
      border-radius: 5px;
    }
    select {
      height: 40px;
      font-size: 16px;
      width: 5rem;
      margin-top: 5px;
      padding-left: 10px;
      border-radius: 5px;
    }
  }
`;
