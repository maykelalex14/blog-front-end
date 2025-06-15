import React from 'react';
import styled from 'styled-components';
import { useStaff } from '../../context/StaffContext';

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
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #444;
  background: #181818;
  color: #fff;
`;

const statuses = ['active', 'on leave', 'terminated'];

const AdminStaff: React.FC = () => {
  const { staff: employees, updateStatus } = useStaff();
  const [selected, setSelected] = React.useState<string|null>(null);
  const [editStatus, setEditStatus] = React.useState('');

  const handleSelect = (id: string) => {
    setSelected(id);
    setEditStatus(employees.find(e => e.id === id)?.status || '');
  };
  const handleStatusChange = (id: string, status: string) => {
    updateStatus(id, status);
    setEditStatus(status);
  };

  const selectedEmp = employees.find(e => e.id === selected);

  return (
    <Container>
      <h1 style={{color:'#e0b04b',marginBottom:24}}>Employee Management</h1>
      {/* Employee List */}
      <Section>
        <h2 style={{color:'#e0b04b',fontSize:'1.1rem'}}>All Employees</h2>
        <Table>
          <thead><tr><Th>Name</Th><Th>Role</Th><Th>Contact</Th><Th>Branch</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {employees.map(e=>(
              <tr key={e.id} style={{background:selected===e.id?'#333':'inherit'}}>
                <Td>{e.name}</Td>
                <Td>{e.role}</Td>
                <Td>{e.contact}</Td>
                <Td>{e.branch}</Td>
                <Td>{e.status}</Td>
                <Td><Button type="button" onClick={()=>handleSelect(e.id)}>View</Button></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* Employee Details & Management */}
      {selectedEmp && (
        <Section>
          <h2 style={{color:'#e0b04b',fontSize:'1.1rem'}}>Employee Details</h2>
          <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            <div>
              <b>Name:</b> {selectedEmp.name}<br/>
              <b>Role:</b> {selectedEmp.role}<br/>
              <b>Contact:</b> {selectedEmp.contact}<br/>
              <b>Branch:</b> {selectedEmp.branch}<br/>
              <b>Status:</b> <Select value={editStatus} onChange={e=>handleStatusChange(selectedEmp.id, e.target.value)}>{statuses.map((s: string)=>(<option key={s}>{s}</option>))}</Select>
            </div>
            <div>
              <b>Payroll:</b><br/>
              <div>Current Salary: ${selectedEmp.salary}</div>
              <div>Salary History: {selectedEmp.salaryHistory.map((s,i)=>(<span key={i}>${s}{i<selectedEmp.salaryHistory.length-1?', ':''}</span>))}</div>
            </div>
            <div>
              <b>Reports:</b><br/>
              <div>Attendance: {selectedEmp.attendance}%</div>
              <div>Performance: {selectedEmp.performance} / 5.0</div>
            </div>
          </div>
        </Section>
      )}
    </Container>
  );
};

export default AdminStaff;
