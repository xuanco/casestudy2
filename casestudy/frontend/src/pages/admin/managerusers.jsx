// Trang quản lý người dùng (Admin - Manager)  
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, Modal, Form, message } from "antd";

const API_URL = "http://localhost:3001/users";

const ManagerUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      message.error("Không thể tải danh sách người dùng");
    }
  };

  const handleSaveUser = async (values) => {
    try {
      if (isEditing && selectedUser) {
        await axios.put(`${API_URL}/${selectedUser.id}`, {
          ...values,
          blocked: selectedUser.blocked, // Giữ nguyên trạng thái blocked
          role: selectedUser.role // Giữ nguyên role
        });
        message.success("Cập nhật người dùng thành công");
      } else {
        await axios.post(API_URL, {
          ...values,
          blocked: false,
          role: "user" // Thêm role mặc định cho người dùng mới
        });
        message.success("Thêm người dùng thành công");
      }
      setIsModalOpen(false);
      form.resetFields(); // Reset form sau khi lưu
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
      message.error("Lỗi khi lưu người dùng");
    }
  };

  const handleBlockUser = async (id, role) => {
    if (role === "admin") {
      message.error("Không thể khóa tài khoản admin");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn khóa tài khoản này?")) {
      try {
        await axios.patch(`${API_URL}/${id}`, { blocked: true });
        message.success("Đã khóa tài khoản");
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi khóa người dùng:", error);
        message.error("Lỗi khi khóa tài khoản");
      }
    }
  };

  const handleUnblockUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn mở khóa tài khoản này?")) {
      try {
        await axios.patch(`${API_URL}/${id}`, { blocked: false });
        message.success("Đã mở khóa tài khoản");
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi mở khóa người dùng:", error);
        message.error("Lỗi khi mở khóa tài khoản");
      }
    }
  };

  const showModal = (user = null) => {
    setIsEditing(!!user);
    setSelectedUser(user);
    setIsModalOpen(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên đăng nhập", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => showModal(record)}
            style={{ marginRight: 10 }}
          >
            Sửa
          </Button>
          {record.blocked ? (
            <Button onClick={() => handleUnblockUser(record.id)}>
              Mở khóa
            </Button>
          ) : (
            <Button onClick={() => handleBlockUser(record.id, record.role)}>
              Khóa
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý người dùng</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 20 }}
      >
        + Thêm Người Dùng
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title={isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveUser}
          initialValues={{
            username: "",
            email: "",
            phone: "",
            password: "",
          }}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại phải là 10 chữ số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: !isEditing, message: "Vui lòng nhập mật khẩu!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUsers;