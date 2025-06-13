import React from 'react';
import styled from 'styled-components';
import { InventoryItem } from '../types';

// Mock inventory data
const mockInventory: InventoryItem[] = [
  { id: 'beef', name: 'Beef', quantity: 120, unit: 'kg' },
  { id: 'potato', name: 'Potato', quantity: 50, unit: 'kg' },
  { id: 'oil', name: 'Oil', quantity: 20, unit: 'L' },
];

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`;
const Th = styled.th`
  background: #222;
  color: #fff;
  padding: 10px;
`;
const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  color: #222;
`;

const Inventory: React.FC = () => (
  <Card>
    <h2 style={{ color: '#222', marginBottom: 24 }}>Inventory</h2>
    <Table>
      <thead>
        <tr>
          <Th>Ingredient</Th>
          <Th>Quantity</Th>
          <Th>Unit</Th>
        </tr>
      </thead>
      <tbody>
        {mockInventory.map((item) => (
          <tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.unit}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
    {/* In the future, show inventory usage based on fulfilled orders here */}
  </Card>
);

export default Inventory;
