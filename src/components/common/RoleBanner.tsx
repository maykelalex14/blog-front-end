import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RoleBanner: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  return (
    <div style={{ background: '#e0b04b', color: '#222', padding: 8, textAlign: 'center', fontWeight: 600 }}>
      Current Role: {user.role}
    </div>
  );
};

export default RoleBanner;
