// Role restriction utility
// Restricted roles: admin, doctor, lab, pharmacy
// These roles CANNOT: book appointments, order medicines, book lab tests, give reviews

/**
 * Get the current user's role from localStorage
 */
export const getUserRole = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user?.role || null;
  } catch {
    return null;
  }
};

/**
 * Check if the current user is restricted from patient actions
 * Returns true if the user has a restricted role (admin, doctor, lab, pharmacy)
 */
export const isRoleRestricted = () => {
  const role = getUserRole();
  if (!role) return false; // Not logged in, not restricted yet (will show login prompt)
  const restrictedRoles = ['admin', 'doctor', 'lab', 'pharmacy'];
  return restrictedRoles.includes(role);
};

/**
 * Check if the current user is a regular patient/user
 */
export const isRegularUser = () => {
  const role = getUserRole();
  return role === 'user' || role === null;
};

/**
 * Get a user-friendly message for restricted actions based on their role
 */
export const getRestrictionMessage = (action) => {
  const role = getUserRole();
  const roleName = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';
  
  const actionMap = {
    'book-appointment': 'book appointments',
    'order-medicine': 'order medicines',
    'book-lab-test': 'book lab tests',
    'give-review': 'submit reviews',
    'add-to-cart': 'add items to cart'
  };

  const actionName = actionMap[action] || 'perform this action';
  
  return `${roleName} accounts cannot ${actionName}. Please use a patient account to ${actionName}.`;
};

/**
 * Check if user is authenticated (has token and user data)
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};