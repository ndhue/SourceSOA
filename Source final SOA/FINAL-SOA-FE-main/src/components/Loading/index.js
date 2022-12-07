import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  margin: auto;
  margin-top: 1rem;
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid ${(props) => (props.color ? "blue" : "#3498db")};
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

export default function Loading() {
  return <Loader />
}