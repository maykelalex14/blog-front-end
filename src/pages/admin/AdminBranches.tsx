import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const mockManagers = [
  { id: '2', name: 'Bob' },
  { id: '6', name: 'Fay' },
];
const mockBranchesInit = [
  { id: 'b1', name: 'London', city: 'London', address: '123 Main St', manager: 'Bob', status: 'active', hours: '10:00–22:00', contact: '020-1234-5678', orders: 120, users: 8, inventoryAlert: false, prepTime: 18, revenue: 20000 },
  { id: 'b2', name: 'Manchester', city: 'Manchester', address: '456 King Rd', manager: 'Unassigned', status: 'inactive', hours: '10:00–22:00', contact: '', orders: 80, users: 5, inventoryAlert: true, prepTime: 20, revenue: 15000 },
];

type Branch = {
  id: string;
  name: string;
  city: string;
  address: string;
  manager: string;
  status: string;
  hours: string;
  contact: string;
  orders: number;
  users: number;
  inventoryAlert: boolean;
  prepTime: number;
  revenue: number;
};

const AdminBranches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>(() => {
    const stored = localStorage.getItem('branches');
    return stored ? JSON.parse(stored) : mockBranchesInit;
  });
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('All');
  const [filterManager, setFilterManager] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', address: '', hours: '', contact: '', manager: 'Unassigned', status: 'active' });
  const [editId, setEditId] = useState<string|null>(null);
  const navigate = useNavigate();

  const filtered = branches.filter((b: Branch) =>
    (filterCity === 'All' || b.city === filterCity) &&
    (filterManager === 'All' || b.manager === filterManager) &&
    (filterStatus === 'All' || b.status === filterStatus) &&
    (b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setBranches(branches.map((b: Branch) => b.id === editId ? { ...b, ...form } : b));
    } else {
      setBranches([...branches, { ...form, id: 'b'+(branches.length+1), orders: 0, users: 0, inventoryAlert: false, prepTime: 0, revenue: 0 }]);
    }
    setShowForm(false); setEditId(null); setForm({ name: '', city: '', address: '', hours: '', contact: '', manager: 'Unassigned', status: 'active' });
  };
  const handleEdit = (b: Branch) => {
    setEditId(b.id); setForm(b); setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setBranches(branches.map((b: Branch) => b.id === id ? { ...b, status: 'deleted' } : b));
  };
  const handleToggle = (id: string) => {
    setBranches(branches.map((b: Branch) => b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b));
  };

  // Save branches to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  return (
    <Container>
      <h1 style={{color:'#e0b04b',marginBottom:24}}>Branch Management</h1>
      {/* Search & Filter */}
      <Section>
        <Input placeholder="Search by name or ID" value={search} onChange={e=>setSearch(e.target.value)} style={{marginRight:12}} />
        <Select value={filterCity} onChange={e=>setFilterCity(e.target.value)}>
          <option>All</option>
          {Array.from(new Set(branches.map(b=>b.city))).map(c=>(<option key={c}>{c}</option>))}
        </Select>
        <Select value={filterManager} onChange={e=>setFilterManager(e.target.value)}>
          <option>All</option>
          {mockManagers.map(m=>(<option key={m.id}>{m.name}</option>))}
          <option>Unassigned</option>
        </Select>
        <Select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option>All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="deleted">Deleted</option>
        </Select>
        <Button type="button" onClick={()=>{setShowForm(true);setEditId(null);setForm({ name: '', city: '', address: '', hours: '', contact: '', manager: 'Unassigned', status: 'active' });}}>+ New Branch</Button>
      </Section>
      {/* Branch Table */}
      <Section>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th><Th>City</Th><Th>Address</Th><Th>Manager</Th><Th>Status</Th><Th>Hours</Th><Th>Contact</Th><Th>Performance</Th><Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b: Branch) => (
              <tr key={b.id} style={{background:b.status==='inactive'?'#333':b.status==='deleted'?'#444':'#181818'}}>
                <Td>{b.name}</Td>
                <Td>{b.city}</Td>
                <Td>{b.address}</Td>
                <Td>{b.manager}</Td>
                <Td>{b.status.charAt(0).toUpperCase()+b.status.slice(1)}</Td>
                <Td>{b.hours}</Td>
                <Td>{b.contact}</Td>
                <Td>
                  <div>Orders: {b.orders}</div>
                  <div>Users: {b.users}</div>
                  <div>Prep: {b.prepTime} min</div>
                  <div>Revenue: £{b.revenue}</div>
                  {b.inventoryAlert && <div style={{color:'#e0b04b'}}>Low Stock!</div>}
                </Td>
                <Td>
                  <Button type="button" onClick={()=>handleEdit(b)}>Edit</Button>
                  <Button type="button" onClick={()=>handleToggle(b.id)}>{b.status==='active'?'Deactivate':'Activate'}</Button>
                  <Button type="button" onClick={()=>handleDelete(b.id)} style={{background:'#b71c1c',color:'#fff'}}>Delete</Button>
                  <Button type="button" onClick={()=>navigate('/reports')}>Reports</Button>
                  <Button type="button" onClick={()=>navigate('/admin/inventory-config')}>Inventory</Button>
                  <Button type="button" onClick={()=>navigate('/admin/menu-management')}>Menu</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* Create/Edit Branch Form */}
      {showForm && (
        <Section>
          <form onSubmit={handleForm} style={{display:'flex',gap:16,flexWrap:'wrap',background:'#181818',padding:24,borderRadius:12}}>
            <Input placeholder="Branch Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required style={{minWidth:180}} />
            <Input placeholder="City" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} required style={{minWidth:120}} />
            <Input placeholder="Address" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} required style={{minWidth:220}} />
            <Input placeholder="Operating Hours" value={form.hours} onChange={e=>setForm(f=>({...f,hours:e.target.value}))} required style={{minWidth:120}} />
            <Input placeholder="Contact Info" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} style={{minWidth:120}} />
            <Select value={form.manager} onChange={e=>setForm(f=>({...f,manager:e.target.value}))}>
              <option>Unassigned</option>
              {mockManagers.map(m=>(<option key={m.id}>{m.name}</option>))}
            </Select>
            <Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Button type="submit">{editId?'Update':'Create'} Branch</Button>
            <Button type="button" style={{background:'#b71c1c',color:'#fff'}} onClick={()=>{setShowForm(false);setEditId(null);}}>Cancel</Button>
          </form>
        </Section>
      )}
    </Container>
  );
};

export default AdminBranches;
