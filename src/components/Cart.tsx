import React from 'react';
import styled from 'styled-components';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  total: number;
  onCheckout: () => void;
  onClose: () => void;
  open: boolean;
}

const Cart: React.FC<CartProps> = ({ items, total, onCheckout, onClose, open }) => {
  return (
    <Drawer open={open}>
      <CartHeader>
        <span>Cart</span>
        <CloseBtn onClick={onClose}>×</CloseBtn>
      </CartHeader>
      {items.length === 0 ? (
        <EmptyCart>Your cart is empty.</EmptyCart>
      ) : (
        <CartList>
          {items.map((item) => (
            <CartItemRow key={item.id}>
              <span>{item.name} x{item.quantity}</span>
              <span>AED {item.price * item.quantity}</span>
            </CartItemRow>
          ))}
        </CartList>
      )}
      <CartTotal>Total: AED {total}</CartTotal>
      <CheckoutBtn disabled={items.length === 0} onClick={onCheckout}>Checkout</CheckoutBtn>
    </Drawer>
  );
};

export default Cart;

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-350px')};
  width: 320px;
  height: 100vh;
  background: #7c2d12;
  color: #fff8f0;
  box-shadow: -2px 0 16px rgba(80,30,30,0.12);
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  z-index: 3000;
  transition: right 0.3s cubic-bezier(.4,0,.2,1);
  @media (max-width: 600px) {
    width: 100vw;
    left: 0;
    right: ${({ open }) => (open ? '0' : '-100vw')};
    border-radius: 0;
  }
`;
const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
`;
const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #ffd166;
  font-size: 2rem;
  cursor: pointer;
`;
const EmptyCart = styled.div`
  color: #ffd166;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const CartList = styled.div`
  margin-bottom: 1rem;
`;
const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const CartTotal = styled.div`
  font-weight: bold;
  font-size: 1.15rem;
  margin-bottom: 1rem;
`;
const CheckoutBtn = styled.button`
  width: 100%;
  background: #ffd166;
  color: #7c2d12;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #e85d04;
    color: #fff8f0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
