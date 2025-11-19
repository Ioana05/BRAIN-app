import styled from "styled-components";
import Spinner from "../../assets/Spinner.svg?react";

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
`;

export const StyledSpinner = styled(Spinner)`
  width: 15%;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
