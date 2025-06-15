import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #232526;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  padding: 32px 40px 40px 40px;
  color: #fff;
`;
const Section = styled.section`
  margin-bottom: 40px;
`;
const SectionTitle = styled.h2`
  color: #e0b04b;
  font-size: 1.3rem;
  margin-bottom: 16px;
`;
const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;
const Table = styled.table`
  width: 100%;
  background: #181818;
  border-radius: 8px;
  margin-bottom: 18px;
  color: #fff;
`;
const Th = styled.th`
  background: #b71c1c;
  color: #fff;
  padding: 10px;
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
`;
const Button = styled.button`
  background: #e0b04b;
  color: #181818;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  &:hover { background: #b71c1c; color: #fff; }
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #444;
  background: #181818;
  color: #fff;
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #444;
  background: #181818;
  color: #fff;
`;

const branches = ['All', 'London', 'Manchester', 'Birmingham'];
const foodItems = ['All', 'Burger', 'Steak', 'Fries', 'Salad'];
const paymentMethods = ['All', 'Card', 'Cash', 'Online'];

const Reports: React.FC = () => {
  const [period, setPeriod] = useState('Month');
  const [branch, setBranch] = useState('All');
  const [food, setFood] = useState('All');
  const [payment, setPayment] = useState('All');

  return (
    <Container>
      <h1 style={{color:'#e0b04b',marginBottom:24}}>Admin Reports</h1>
      {/* 1. Global Overview Reports */}
      <Section>
        <SectionTitle>Global Overview</SectionTitle>
        <FilterRow>
          <Select value={period} onChange={e=>setPeriod(e.target.value)}>
            {['Day','Week','Month','Quarter','Year'].map(p=>(<option key={p}>{p}</option>))}
          </Select>
          <Select value={branch} onChange={e=>setBranch(e.target.value)}>
            {branches.map(b=>(<option key={b}>{b}</option>))}
          </Select>
          <Select value={food} onChange={e=>setFood(e.target.value)}>
            {foodItems.map(f=>(<option key={f}>{f}</option>))}
          </Select>
        </FilterRow>
        <Table>
          <thead><tr><Th>Metric</Th><Th>Value</Th></tr></thead>
          <tbody>
            <tr><Td>Orders Placed</Td><Td>1,234</Td></tr>
            <tr><Td>Revenue Generated</Td><Td>£45,000</Td></tr>
            <tr><Td>Customers Served</Td><Td>980</Td></tr>
            <tr><Td>Active Users</Td><Td>Cashiers: 5, Managers: 3, Customers: 200</Td></tr>
          </tbody>
        </Table>
      </Section>
      {/* 2. Branch Performance Comparison */}
      <Section>
        <SectionTitle>Branch Performance Comparison</SectionTitle>
        <Table>
          <thead><tr><Th>Branch</Th><Th>Revenue</Th><Th>Avg Prep Time</Th><Th>Usage/Waste</Th></tr></thead>
          <tbody>
            <tr><Td>London</Td><Td>£20,000</Td><Td>18 min</Td><Td>95% / 5%</Td></tr>
            <tr><Td>Manchester</Td><Td>£15,000</Td><Td>20 min</Td><Td>93% / 7%</Td></tr>
            <tr><Td>Birmingham</Td><Td>£10,000</Td><Td>22 min</Td><Td>90% / 10%</Td></tr>
          </tbody>
        </Table>
        <div style={{marginBottom:8}}>Top 5 Branches by Sales: London, Manchester, Birmingham, ...</div>
      </Section>
      {/* 3. Inventory Usage Reports */}
      <Section>
        <SectionTitle>Inventory Usage Reports</SectionTitle>
        <Table>
          <thead><tr><Th>Item</Th><Th>Estimated Usage</Th><Th>Actual Usage</Th><Th>Cost/Item</Th></tr></thead>
          <tbody>
            <tr><Td>Burger</Td><Td>120kg</Td><Td>125kg</Td><Td>£2.50</Td></tr>
            <tr><Td>Steak</Td><Td>200kg</Td><Td>198kg</Td><Td>£5.00</Td></tr>
            <tr><Td>Fries</Td><Td>80kg</Td><Td>85kg</Td><Td>£1.00</Td></tr>
          </tbody>
        </Table>
      </Section>
      {/* 4. Order Fulfillment Reports */}
      <Section>
        <SectionTitle>Order Fulfillment Reports</SectionTitle>
        <Table>
          <thead><tr><Th>Metric</Th><Th>Value</Th></tr></thead>
          <tbody>
            <tr><Td>Avg. Prep Time</Td><Td>19 min</Td></tr>
            <tr><Td>Delayed Orders</Td><Td>12</Td></tr>
            <tr><Td>Orders Canceled</Td><Td>8</Td></tr>
            <tr><Td>Orders Fulfilled</Td><Td>1,226</Td></tr>
          </tbody>
        </Table>
      </Section>
      {/* 5. Customer Feedback Summary */}
      <Section>
        <SectionTitle>Customer Feedback Summary</SectionTitle>
        <Table>
          <thead><tr><Th>Metric</Th><Th>Value</Th></tr></thead>
          <tbody>
            <tr><Td>Reviews Submitted</Td><Td>120</Td></tr>
            <tr><Td>Avg. Rating (All)</Td><Td>4.5 / 5</Td></tr>
            <tr><Td>Most Praised</Td><Td>Steak, Service</Td></tr>
            <tr><Td>Most Criticized</Td><Td>Wait Time</Td></tr>
          </tbody>
        </Table>
      </Section>
      {/* 6. Revenue Reports */}
      <Section>
        <SectionTitle>Revenue Reports</SectionTitle>
        <FilterRow>
          <Select value={payment} onChange={e=>setPayment(e.target.value)}>
            {paymentMethods.map(p=>(<option key={p}>{p}</option>))}
          </Select>
        </FilterRow>
        <Table>
          <thead><tr><Th>Metric</Th><Th>Value</Th></tr></thead>
          <tbody>
            <tr><Td>Total Sales Revenue</Td><Td>£45,000</Td></tr>
            <tr><Td>Refunds</Td><Td>£500</Td></tr>
            <tr><Td>Failed Payments</Td><Td>3</Td></tr>
            <tr><Td>By Payment Method</Td><Td>Card: £30,000, Cash: £10,000, Online: £5,000</Td></tr>
          </tbody>
        </Table>
      </Section>
      {/* 7. Export & Share Reports */}
      <Section>
        <SectionTitle>Export & Share Reports</SectionTitle>
        <Button>Export to PDF</Button>
        <Button>Export to CSV</Button>
        <Button>Email Report</Button>
        <Button>Print Summary</Button>
      </Section>
      {/* 8. Custom Reports */}
      <Section>
        <SectionTitle>Custom Reports</SectionTitle>
        <form style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:12}}>
          <Input type="text" placeholder="Custom filter (e.g. weekends, London)" style={{minWidth:220}} />
          <Button type="button">Apply</Button>
          <Button type="button">Save Filter</Button>
          <Button type="button">Schedule Report</Button>
        </form>
        <div style={{color:'#e0b04b'}}>Set up custom filters and schedule automated reports for any scenario.</div>
      </Section>
    </Container>
  );
};

export default Reports;
