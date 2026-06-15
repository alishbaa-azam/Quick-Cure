import React, { createContext, useContext, useState } from 'react';

const AdminSearchContext = createContext();

export const useAdminSearch = () => {
  const context = useContext(AdminSearchContext);
  if (!context) {
    return { searchTerm: '', setSearchTerm: () => {} };
  }
  return context;
};

export const AdminSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </AdminSearchContext.Provider>
  );
};

export default AdminSearchContext;