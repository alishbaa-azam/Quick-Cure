// LabDashboardSidebar.jsx
import React from 'react';
import { Layout, Menu, Avatar, Badge, Space, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  ProfileOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  LogoutOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text, Title } = Typography;

export default function LabDashboardSidebar({ activeTab, setActiveTab, lab, stats, theme, onLogout }) {
  return (
    <Sider width={280} style={{ background: theme.secondary, position: 'relative' }}>
      {/* Lab Info */}
      <div style={{ padding: '24px 16px', textAlign: 'center' }}>
        <Avatar
          size={80}
          src={lab?.logo ? `http://localhost:5000/uploads/${lab.logo}` : null}
          icon={!lab?.logo && <MedicineBoxOutlined />}
          style={{
            backgroundColor: lab?.logo ? 'transparent' : theme.primary,
            border: `4px solid ${theme.white}`,
            marginBottom: 12
          }}
        />
        <Title level={4} style={{ color: theme.white, margin: 0, marginBottom: 4 }}>
          {lab?.name || 'Lab Dashboard'}
        </Title>
        <Text style={{ color: theme.textLight, fontSize: 12 }}>
          Laboratory Management Portal
        </Text>
        <div style={{ marginTop: 8 }}>
          <StarOutlined style={{ color: '#faad14' }} />
          <StarOutlined style={{ color: '#faad14' }} />
          <StarOutlined style={{ color: '#faad14' }} />
          <StarOutlined style={{ color: '#faad14' }} />
          <StarOutlined style={{ color: '#faad14' }} />
        </div>
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeTab]}
        onClick={({ key }) => setActiveTab(key)}
        style={{ background: 'transparent', borderRight: 0, padding: '8px' }}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            style: {
              margin: '4px 0',
              borderRadius: 8,
              color: activeTab === 'dashboard' ? theme.white : theme.textLight,
              backgroundColor: activeTab === 'dashboard' ? theme.primary : 'transparent'
            }
          },
          {
            key: 'tests',
            icon: <ExperimentOutlined />,
            label: 'Test Management',
            style: {
              margin: '4px 0',
              borderRadius: 8,
              color: activeTab === 'tests' ? theme.white : theme.textLight,
              backgroundColor: activeTab === 'tests' ? theme.primary : 'transparent'
            }
          },
          {
            key: 'bookings',
            icon: <CalendarOutlined />,
            label: (
              <Space>
                <span>Bookings</span>
                {stats?.pendingBookings > 0 && (
                  <Badge count={stats.pendingBookings} size="small" style={{ backgroundColor: theme.warning }} />
                )}
              </Space>
            ),
            style: {
              margin: '4px 0',
              borderRadius: 8,
              color: activeTab === 'bookings' ? theme.white : theme.textLight,
              backgroundColor: activeTab === 'bookings' ? theme.primary : 'transparent'
            }
          },
          {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Lab Profile',
            style: {
              margin: '4px 0',
              borderRadius: 8,
              color: activeTab === 'profile' ? theme.white : theme.textLight,
              backgroundColor: activeTab === 'profile' ? theme.primary : 'transparent'
            }
          }
        ]}
      />

      {/* Stats Summary */}
      <div style={{
        margin: 16,
        padding: 16,
        background: `${theme.hover}40`,
        borderRadius: 8,
        border: `1px solid ${theme.hover}`
      }}>
        <Text strong style={{ color: theme.white, display: 'block', marginBottom: 12 }}>
          Lab Statistics
        </Text>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.textLight }}>Tests</Text>
            <Badge count={stats?.totalTests || 0} style={{ backgroundColor: theme.primary }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.textLight }}>Active Bookings</Text>
            <Badge count={(stats?.pendingBookings || 0) + (stats?.confirmedBookings || 0)} 
                   style={{ backgroundColor: theme.warning }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.textLight }}>Monthly Revenue</Text>
            <Text style={{ color: theme.success }}>Rs.{stats?.monthlyRevenue || 0}</Text>
          </div>
        </Space>
      </div>

      {/* User Profile & Logout */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        background: theme.hover,
        borderTop: `1px solid ${theme.secondary}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <Avatar size={40} src="https://api.dicebear.com/7.x/avataaars/svg?seed=LabManager" style={{ marginRight: 8 }} />
          <div>
            <Text style={{ color: theme.white }}>Lab Manager</Text>
            <br />
            <Text style={{ color: theme.textLight, fontSize: 12 }}>{lab?.name || 'Lab'} Admin</Text>
          </div>
        </div>
        <Space style={{ width: '100%' }}>
          <Button icon={<SettingOutlined />} block type="text" style={{ color: theme.textLight }}>
            Settings
          </Button>
          <Button icon={<LogoutOutlined />} block type="text" danger onClick={onLogout}>
            Logout
          </Button>
        </Space>
      </div>
    </Sider>
  );
}