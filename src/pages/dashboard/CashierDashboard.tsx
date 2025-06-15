import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ManagerOrders from './ManagerOrders';
import ManagerKitchen from './ManagerKitchen';
import CashierPaymentProcessing from './CashierPaymentProcessing';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 1100px;
  margin: 32px auto;
`;
const Section = styled.div`
  margin-bottom: 32px;
`;

const tabList = [
  { key: 'orders', label: 'Order Management', component: <ManagerOrders hideKitchenAndCashier /> },
  { key: 'payment', label: 'Payment Processing', component: <CashierPaymentProcessing /> },
  { key: 'kitchen', label: 'Kitchen Queue', component: <ManagerKitchen /> },
];

interface CashierDashboardProps {
  tab?: string;
}

const CashierDashboard: React.FC<CashierDashboardProps> = ({ tab: propTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tabKey = propTab || params.get('tab') || 'orders';
  const tab = tabList.find(t => t.key === tabKey) || tabList[0];

  // If an invalid tab is provided, redirect to default
  React.useEffect(() => {
    if (!tabList.some(t => t.key === tabKey)) {
      navigate('/dashboard/cashier?tab=orders', { replace: true });
    }
  }, [tabKey, navigate]);

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Cashier POS Dashboard</h2>
      <Section>
        {tab.component}
      </Section>
    </Card>
  );
};

export default CashierDashboard;
