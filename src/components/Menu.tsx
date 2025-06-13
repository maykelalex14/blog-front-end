import React from 'react';
import Section from './common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Ribeye Steak', desc: 'Juicy, marbled, flame-grilled perfection.', price: '$38' },
  { name: 'Filet Mignon', desc: 'Tenderloin, melt-in-your-mouth, classic.', price: '$42' },
  { name: 'NY Strip', desc: 'Bold, beefy, expertly seasoned.', price: '$36' },
  { name: 'Wagyu Burger', desc: 'Premium beef, aged cheddar, brioche bun.', price: '$24' },
  { name: 'Truffle Fries', desc: 'Hand-cut, parmesan, truffle oil.', price: '$12' },
  { name: 'Caesar Salad', desc: 'Crisp romaine, house dressing, croutons.', price: '$14' },
];

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;
const MenuCard = styled(motion.div)`
  background: #232526;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 32px 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 32px rgba(224,176,75,0.10);
    background: #181818;
  }
`;
const ItemName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #e0b04b;
  margin-bottom: 8px;
`;
const ItemDesc = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  margin-bottom: 12px;
`;
const ItemPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: #b71c1c;
  border-radius: 8px;
  padding: 4px 14px;
  margin-top: 8px;
`;

const Menu: React.FC = () => (
  <Section id="menu" aria-label="Menu" dark>
    <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: 32 }}>Menu</h2>
    <MenuGrid>
      {menuItems.map((item, i) => (
        <MenuCard
          key={item.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          tabIndex={0}
          aria-label={item.name}
        >
          <ItemName>{item.name}</ItemName>
          <ItemDesc>{item.desc}</ItemDesc>
          <ItemPrice>{item.price}</ItemPrice>
        </MenuCard>
      ))}
    </MenuGrid>
  </Section>
);

export default Menu;
