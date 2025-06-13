import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 80vh;
  background: #181818;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 40px 20px;
`;
const Title = styled.h1`
  color: #e0b04b;
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  margin-bottom: 24px;
`;
const Text = styled.p`
  max-width: 700px;
  font-size: 1.25rem;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 32px;
`;

const AboutUs: React.FC = () => (
  <Wrapper>
    <Title>About Steakz</Title>
    <Text>
      <b>Steakz</b> is a modern steakhouse where culinary artistry meets warm hospitality. Our chefs hand-select the finest cuts and craft each dish with passion, blending classic steakhouse tradition with contemporary flavors. Whether you’re celebrating a special occasion or enjoying a casual night out, Steakz offers an unforgettable dining experience in a stylish, welcoming atmosphere.<br /><br />
      We pride ourselves on exceptional service, a curated wine list, and a menu that highlights the best of seasonal ingredients. From our signature steaks to creative sides and decadent desserts, every meal at Steakz is a celebration of taste and quality.<br /><br />
      Join us and discover why Steakz is the destination for steak lovers and food enthusiasts alike.
    </Text>
  </Wrapper>
);

export default AboutUs;
