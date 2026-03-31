// LabDashboardModals.jsx
import React, { useEffect } from 'react';
// import {
//   Modal, Form, Input, InputNumber, Upload, Row, Col, Select, Descriptions,
//   Tag, Divider, List, Avatar, Typography, Image, message
// } from 'antd';
import {
  Modal, Form, Input, InputNumber, Upload, Row, Col, Select, Descriptions,
  Tag, Divider, List, Avatar, Typography, Image, message, Button
} from 'antd';
import {
  UploadOutlined, ExperimentOutlined, UserOutlined, MedicineBoxOutlined,
  ClockCircleOutlined, CheckCircleOutlined, SafetyCertificateOutlined, DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function LabDashboardModals({
  isTestModalVisible, setIsTestModalVisible,
  isProfileModalVisible, setIsProfileModalVisible,
  isBookingModalVisible, setIsBookingModalVisible,
  selectedBooking, editingTest, lab, logoFile, setLogoFile,
  theme, loading, onTestSubmit, onProfileSubmit, onUpdateStatus,
  API_BASE_URL
}) {
  const [testForm] = Form.useForm();
  const [profileForm] = Form.useForm();

  // Set form values when editing
  useEffect(() => {
    if (editingTest) {
      testForm.setFieldsValue(editingTest);
    } else {
      testForm.resetFields();
    }
  }, [editingTest, testForm]);

  useEffect(() => {
    if (lab && isProfileModalVisible) {
      profileForm.setFieldsValue({
        name: lab.name,
        discount: lab.discount,
        branches: lab.branches
      });
    }
  }, [lab, isProfileModalVisible, profileForm]);

  // Test Modal
  const renderTestModal = () => (
    <Modal
      title={editingTest ? 'Edit Test' : 'Add New Test'}
      open={isTestModalVisible}
      onCancel={() => {
        setIsTestModalVisible(false);
        testForm.resetFields();
      }}
      onOk={() => testForm.submit()}
      confirmLoading={loading}
      okText={editingTest ? 'Update' : 'Create'}
    >
      <Form form={testForm} layout="vertical" onFinish={onTestSubmit}>
        {editingTest && (
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
        )}
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Test Name" rules={[{ required: true }]}>
              <Input placeholder="Enter test name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Price (Rs.)" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} placeholder="Enter price" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Enter test description" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            {/* <Form.Item name="discount" label="Discount (%)">
              <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="Enter discount" />
            </Form.Item> */}
          </Col>
          <Col span={12}>
            <Form.Item name="category" label="Category">
              <Select placeholder="Select category">
                <Option value="blood_test">Blood Test</Option>
                <Option value="urine_test">Urine Test</Option>
                <Option value="imaging">Imaging</Option>
                <Option value="pathology">Pathology</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* <Form.Item name="preparation" label="Patient Preparation">
          <TextArea rows={2} placeholder="Enter preparation instructions" />
        </Form.Item> */}

        {/* <Form.Item name="turnaroundTime" label="Turnaround Time (hours)">
          <InputNumber style={{ width: '100%' }} min={1} max={168} placeholder="Enter hours" />
        </Form.Item> */}
      </Form>
    </Modal>
  );

  // Profile Modal
  const renderProfileModal = () => (
    <Modal
      title="Edit Lab Profile"
      open={isProfileModalVisible}
      onCancel={() => {
        setIsProfileModalVisible(false);
        setLogoFile(null);
        profileForm.resetFields();
      }}
      onOk={() => profileForm.submit()}
      confirmLoading={loading}
      okText="Update Profile"
    >
      <Form form={profileForm} layout="vertical" onFinish={onProfileSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Laboratory Name" rules={[{ required: true }]}>
              <Input placeholder="Enter laboratory name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="discount" label="Discount (%)">
              <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Enter discount" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="branches" label="Branch Locations" extra="Separate branches with commas">
          <TextArea rows={3} placeholder="e.g., Main Branch, Downtown Branch, North Branch" />
        </Form.Item>

        <Form.Item label="Laboratory Logo">
          <Upload
            beforeUpload={(file) => {
              const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
              if (!isValid) {
                message.error('Only JPG/PNG files allowed!');
                return Upload.LIST_IGNORE;
              }
              if (file.size / 1024 / 1024 > 2) {
                message.error('Image must be smaller than 2MB!');
                return Upload.LIST_IGNORE;
              }
              setLogoFile(file);
              return false;
            }}
            onRemove={() => setLogoFile(null)}
            maxCount={1}
            accept=".jpg,.jpeg,.png"
            listType="picture-card"
            fileList={logoFile ? [{
              uid: '-1',
              name: logoFile.name,
              status: 'done',
              url: URL.createObjectURL(logoFile)
            }] : []}
          >
            {!logoFile && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Logo</div>
              </div>
            )}
          </Upload>
          {lab?.logo && !logoFile && (
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <Text type="secondary">Current Logo:</Text>
              <div>
                <Image width={100} src={`${API_BASE_URL}/uploads/${lab.logo}`} alt="Current Logo" style={{ borderRadius: 8, marginTop: 8 }} />
              </div>
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );

  // Booking Modal
  const renderBookingModal = () => (
    <Modal
      title="Booking Details"
      open={isBookingModalVisible}
      onCancel={() => setIsBookingModalVisible(false)}
      width={800}
      footer={[
        <Button key="close" onClick={() => setIsBookingModalVisible(false)}>Close</Button>,
        selectedBooking?.bookingStatus === 'pending' && (
          <Button key="confirm" type="primary" onClick={() => {
            onUpdateStatus(selectedBooking._id, 'confirmed');
            setIsBookingModalVisible(false);
          }}>
            Confirm Booking
          </Button>
        ),
        selectedBooking?.bookingStatus === 'confirmed' && (
          <Button key="complete" type="primary" onClick={() => {
            onUpdateStatus(selectedBooking._id, 'completed');
            setIsBookingModalVisible(false);
          }}>
            Mark Completed
          </Button>
        )
      ].filter(Boolean)}
    >
      {selectedBooking && (
        <div>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Booking Reference" span={2}>
              <Text copyable>{selectedBooking.bookingReference}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={
                selectedBooking.bookingStatus === 'pending' ? theme.warning :
                selectedBooking.bookingStatus === 'confirmed' ? theme.success :
                selectedBooking.bookingStatus === 'completed' ? theme.info :
                theme.error
              }>
                {selectedBooking.bookingStatus?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Booking Date">
              {dayjs(selectedBooking.createdAt).format('DD/MM/YYYY HH:mm')}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Patient Information</Divider>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Name">{selectedBooking.patientDetails?.name}</Descriptions.Item>
            <Descriptions.Item label="Age/Gender">
              {selectedBooking.patientDetails?.age} / {selectedBooking.patientDetails?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile">{selectedBooking.patientDetails?.mobile}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedBooking.patientDetails?.email}</Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>{selectedBooking.patientDetails?.address}</Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Tests Ordered</Divider>
          <List
            dataSource={selectedBooking.tests || []}
            renderItem={(test) => (
              <List.Item extra={<Text strong>Rs.{test.price}</Text>}>
                <List.Item.Meta
                  avatar={<Avatar icon={<ExperimentOutlined />} />}
                  title={test.name}
                  description={test.discount > 0 && (
                    <Space>
                      <Text delete>Rs.{test.price}</Text>
                      <Text strong>Rs.{test.price * (100 - test.discount) / 100}</Text>
                      <Tag color="success">-{test.discount}%</Tag>
                    </Space>
                  )}
                />
              </List.Item>
            )}
          />

          <Divider />
          <div style={{ textAlign: 'right' }}>
            <Text strong style={{ fontSize: 16 }}>
              Total: Rs.{selectedBooking.totals?.discounted || 0}
            </Text>
            {selectedBooking.totals?.original !== selectedBooking.totals?.discounted && (
              <div>
                <Text type="secondary" delete>Rs.{selectedBooking.totals?.original}</Text>
                <Text type="success" style={{ marginLeft: 8 }}>
                  Saved: Rs.{selectedBooking.totals?.original - selectedBooking.totals?.discounted}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <>
      {renderTestModal()}
      {renderProfileModal()}
      {renderBookingModal()}
    </>
  );
}