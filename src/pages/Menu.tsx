import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Cart from '../components/Cart';

const menuItems = [
	{ name: 'Ribeye Steak', desc: 'Juicy, marbled, flame-grilled perfection.', price: 38 },
	{ name: 'Filet Mignon', desc: 'Tenderloin, melt-in-your-mouth, classic.', price: 42 },
	{ name: 'NY Strip', desc: 'Bold, beefy, expertly seasoned.', price: 36 },
	{ name: 'Wagyu Burger', desc: 'Premium beef, aged cheddar, brioche bun.', price: 24 },
	{ name: 'Truffle Fries', desc: 'Hand-cut, parmesan, truffle oil.', price: 12 },
	{ name: 'Caesar Salad', desc: 'Crisp romaine, house dressing, croutons.', price: 14 },
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
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	padding: 32px 24px;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transition: transform 0.2s, box-shadow 0.2s;
	cursor: pointer;
	&:hover {
		transform: translateY(-8px) scale(1.03);
		box-shadow: 0 8px 32px rgba(224, 176, 75, 0.1);
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
const AddButton = styled.button`
	margin-top: 16px;
	background: #e0b04b;
	color: #181818;
	border: none;
	border-radius: 8px;
	padding: 10px 20px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
	&:hover {
		background: #b71c1c;
		color: #fff;
	}
`;
const CartButton = styled.button`
	position: fixed;
	bottom: 32px;
	right: 32px;
	background: #b71c1c;
	color: #fff;
	border: none;
	border-radius: 50%;
	width: 60px;
	height: 60px;
	font-size: 2rem;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
	cursor: pointer;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.2s;
	&:hover {
		background: #e0b04b;
		color: #181818;
	}
`;

const Menu: React.FC = () => {
	const [cart, setCart] = useState<{ name: string; price: number; quantity: number; id: string }[]>([]);
	const [cartOpen, setCartOpen] = useState(false);

	// Reset cartOpen when the Menu page is mounted to fix re-navigation issue
	useEffect(() => {
		setCartOpen(false);
	}, []);

	const addToCart = (item: { name: string; price: number }) => {
		setCart((prev) => {
			const found = prev.find((i) => i.name === item.name);
			if (found) {
				return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
			}
			return [...prev, { ...item, quantity: 1, id: item.name }];
		});
	};

	const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

	const handleCheckout = () => {
		alert('Order placed! (Demo)');
		setCart([]);
		setCartOpen(false);
		// When an order is fulfilled, update inventory usage here (future integration)
		// Example: deductInventoryForOrder(order: Order)
	};

	return (
		<div style={{ minHeight: '100vh', background: '#181818', padding: '80px 0 40px 0' }}>
			<h2
				style={{
					color: '#fff',
					fontFamily: 'Playfair Display',
					fontSize: '2.5rem',
					marginBottom: 32,
					textAlign: 'center',
				}}
			>
				Menu
			</h2>
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
						<ItemPrice>${item.price}</ItemPrice>
						<AddButton onClick={() => addToCart(item)}>Add to Cart</AddButton>
					</MenuCard>
				))}
			</MenuGrid>
			<CartButton aria-label="Open Cart" onClick={() => setCartOpen(true)}>
				🛒
			</CartButton>
			<Cart
				open={cartOpen}
				onClose={() => setCartOpen(false)}
				items={cart}
				total={total}
				onCheckout={handleCheckout}
			/>
		</div>
	);
};

export default Menu;
