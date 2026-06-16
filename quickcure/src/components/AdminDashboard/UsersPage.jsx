import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, Edit, Trash2, Shield, 
  UserPlus, X, Check, AlertCircle, Stethoscope, 
  Microscope, Pill, RefreshCw, ChevronDown
} from 'lucide-react';
import { message, Modal, Select, Button, Tooltip } from 'antd';
import { getUsers, updateUserRole, deleteUser, createDoctorForUser, createLabForUser, createPharmacyForUser } from './adminApi';

const roleColors = {
  admin: 'bg-purple-100 text-purple-700',
  doctor: 'bg-blue-100 text-blue-700',
  lab: 'bg-emerald-100 text-emerald-700',
  pharmacy: 'bg-amber-100 text-amber-700',
  user: 'bg-gray-100 text-gray-700'
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [changeRoleModal, setChangeRoleModal] = useState({ open: false, user: null });
  const [createEntityModal, setCreateEntityModal] = useState({ open: false, user: null, type: '' });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response.success) {
        setUsers(response.users || []);
      } else {
        message.error('Failed to load users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      message.error(err.response?.data?.msg || 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!changeRoleModal.user || !changeRoleModal.newRole) return;
    try {
      const response = await updateUserRole(changeRoleModal.user._id, changeRoleModal.newRole);
      if (response.success) {
        message.success(`Role updated to ${changeRoleModal.newRole}`);
        setChangeRoleModal({ open: false, user: null, newRole: '' });
        fetchUsers();
      }
    } catch (err) {
      message.error(err.response?.data?.msg || 'Failed to update role');
    }
  };

  const handleDeleteUser = (user) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete ${user.name || user.email}? This will also delete associated data.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await deleteUser(user._id);
          if (response.success) {
            message.success('User deleted successfully');
            fetchUsers();
          }
        } catch (err) {
          message.error(err.response?.data?.msg || 'Failed to delete user');
        }
      }
    });
  };

  const handleCreateEntity = async () => {
    const { user, type } = createEntityModal;
    if (!user || !type) return;

    try {
      const formDataToSend = new FormData();
      
      if (type === 'lab') {
        formDataToSend.append('name', formData.name || `${user.name}'s Lab`);
        formDataToSend.append('branches', formData.branches || 'Main Branch');
        formDataToSend.append('discount', formData.discount || 0);
        if (formData.logo) formDataToSend.append('logo', formData.logo);
        
        const response = await createLabForUser(user._id, formDataToSend);
        if (response.success) {
          message.success('Lab created successfully');
          setCreateEntityModal({ open: false, user: null, type: '' });
          setFormData({});
          fetchUsers();
        }
      } else if (type === 'pharmacy') {
        formDataToSend.append('name', formData.name || `${user.name}'s Pharmacy`);
        formDataToSend.append('address', formData.address || '');
        formDataToSend.append('city', formData.city || '');
        formDataToSend.append('phone', formData.phone || '');
        if (formData.image) formDataToSend.append('image', formData.image);

        const response = await createPharmacyForUser(user._id, formDataToSend);
        if (response.success) {
          message.success('Pharmacy created successfully');
          setCreateEntityModal({ open: false, user: null, type: '' });
          setFormData({});
          fetchUsers();
        }
      } else if (type === 'doctor') {
        formDataToSend.append('name', formData.name || user.name);
        formDataToSend.append('speciality', formData.speciality || 'General Physician');
        formDataToSend.append('qualification', formData.qualification || '');
        formDataToSend.append('experience', formData.experience || '');
        formDataToSend.append('fee', formData.fee || 500);
        if (formData.services) formDataToSend.append('services', JSON.stringify(formData.services.split(',').map(s => s.trim())));
        if (formData.image) formDataToSend.append('image', formData.image);

        const response = await createDoctorForUser(user._id, formDataToSend);
        if (response.success) {
          message.success('Doctor created successfully');
          setCreateEntityModal({ open: false, user: null, type: '' });
          setFormData({});
          fetchUsers();
        }
      }
    } catch (err) {
      message.error(err.response?.data?.msg || `Failed to create ${type}`);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Total {users.length} users in the system</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'admin', 'doctor', 'lab', 'pharmacy', 'user'].map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${
                  roleFilter === role 
                    ? 'bg-[#2c6774] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500 text-sm">Loading users...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          user.role === 'admin' ? 'bg-purple-500' :
                          user.role === 'doctor' ? 'bg-blue-500' :
                          user.role === 'lab' ? 'bg-emerald-500' :
                          user.role === 'pharmacy' ? 'bg-amber-500' :
                          'bg-gray-500'
                        }`}>
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${roleColors[user.role] || 'bg-gray-100 text-gray-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tooltip title="Change Role">
                          <button
                            onClick={() => setChangeRoleModal({ open: true, user, newRole: user.role })}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Shield size={16} />
                          </button>
                        </Tooltip>
                        
                        {user.role !== 'admin' && (
                          <>
                            <Tooltip title="Create Doctor Profile">
                              <button
                                onClick={() => {
                                  setFormData({});
                                  setCreateEntityModal({ open: true, user, type: 'doctor' });
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Stethoscope size={16} />
                              </button>
                            </Tooltip>
                            <Tooltip title="Create Lab Profile">
                              <button
                                onClick={() => {
                                  setFormData({});
                                  setCreateEntityModal({ open: true, user, type: 'lab' });
                                }}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <Microscope size={16} />
                              </button>
                            </Tooltip>
                            <Tooltip title="Create Pharmacy Profile">
                              <button
                                onClick={() => {
                                  setFormData({});
                                  setCreateEntityModal({ open: true, user, type: 'pharmacy' });
                                }}
                                className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              >
                                <Pill size={16} />
                              </button>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Change Role Modal */}
      <Modal
        title="Change User Role"
        open={changeRoleModal.open}
        onCancel={() => setChangeRoleModal({ open: false, user: null, newRole: '' })}
        footer={null}
      >
        {changeRoleModal.user && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#2c6774] text-white flex items-center justify-center font-medium">
                {changeRoleModal.user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{changeRoleModal.user.name}</p>
                <p className="text-sm text-gray-500">{changeRoleModal.user.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full capitalize ${roleColors[changeRoleModal.user.role]}`}>
                  Current: {changeRoleModal.user.role}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Role</label>
              <select
                value={changeRoleModal.newRole}
                onChange={(e) => setChangeRoleModal({ ...changeRoleModal, newRole: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 outline-none"
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="lab">Lab</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="admin">Admin</option>
              </select>
              {(changeRoleModal.newRole === 'pharmacy' || changeRoleModal.newRole === 'lab' || changeRoleModal.newRole === 'doctor') && (
                <p className="text-xs text-amber-600 mt-2">
                  {changeRoleModal.newRole === 'pharmacy' && 'A pharmacy profile will be auto-created for this user.'}
                  {changeRoleModal.newRole === 'lab' && 'A lab profile will be auto-created for this user.'}
                  {changeRoleModal.newRole === 'doctor' && 'A doctor profile will be auto-created for this user.'}
                </p>
              )}
              {changeRoleModal.newRole === 'admin' && (
                <p className="text-xs text-red-600 mt-2">
                  Warning: Admin role has full system access. Only assign to trusted users.
                </p>
              )}
              {changeRoleModal.newRole === 'user' && (
                <p className="text-xs text-gray-600 mt-2">
                  Setting role to "user" will remove their specialist profile access.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setChangeRoleModal({ open: false, user: null, newRole: '' })}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handleRoleChange}
                style={{ backgroundColor: '#2c6774', borderColor: '#2c6774' }}
              >
                Update Role
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Entity Modal */}
      <Modal
        title={`Create ${createEntityModal.type.charAt(0).toUpperCase() + createEntityModal.type.slice(1)} Profile`}
        open={createEntityModal.open}
        onCancel={() => {
          setCreateEntityModal({ open: false, user: null, type: '' });
          setFormData({});
        }}
        footer={null}
        width={500}
      >
        {createEntityModal.user && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2c6774] text-white flex items-center justify-center font-medium">
                {createEntityModal.user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{createEntityModal.user.name}</p>
                <p className="text-sm text-gray-500">{createEntityModal.user.email}</p>
              </div>
            </div>

            {createEntityModal.type === 'doctor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiologist"
                    value={formData.speciality || ''}
                    onChange={(e) => setFormData({...formData, speciality: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MD"
                    value={formData.qualification || ''}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 years"
                      value={formData.experience || ''}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee (Rs)</label>
                    <input
                      type="number"
                      placeholder="500"
                      value={formData.fee || ''}
                      onChange={(e) => setFormData({...formData, fee: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Services (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Consultation, Checkup, Surgery"
                    value={formData.services || ''}
                    onChange={(e) => setFormData({...formData, services: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    className="w-full text-sm"
                  />
                </div>
              </>
            )}

            {createEntityModal.type === 'lab' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
                  <input
                    type="text"
                    placeholder="Lab name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
                  <input
                    type="text"
                    placeholder="Main Branch"
                    value={formData.branches || ''}
                    onChange={(e) => setFormData({...formData, branches: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.discount || ''}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, logo: e.target.files[0]})}
                    className="w-full text-sm"
                  />
                </div>
              </>
            )}

            {createEntityModal.type === 'pharmacy' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
                  <input
                    type="text"
                    placeholder="Pharmacy name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city || ''}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    className="w-full text-sm"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => {
                setCreateEntityModal({ open: false, user: null, type: '' });
                setFormData({});
              }}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handleCreateEntity}
                style={{ backgroundColor: '#2c6774', borderColor: '#2c6774' }}
              >
                Create {createEntityModal.type.charAt(0).toUpperCase() + createEntityModal.type.slice(1)}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}