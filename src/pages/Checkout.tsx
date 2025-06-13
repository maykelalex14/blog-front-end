import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #222;
  padding: 60px 20px 40px 20px;
`;
const Title = styled.h1`
  color: #b71c1c;
  font-size: 2.2rem;
  margin-bottom: 18px;
`;
const Text = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const Checkout: React.FC = () => (
  <Wrapper>
    <Title>Checkout</Title>
    <Text>
      This is where you can review your order and complete your payment.<br />
      (Payment integration coming soon!)
    </Text>
  </Wrapper>
);

export default Checkout;
