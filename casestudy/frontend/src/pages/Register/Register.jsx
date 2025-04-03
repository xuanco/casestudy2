import { Card, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async () => {
        const { username, email, phone, password, confirmPassword } = formData;

        // Kiểm tra xem tất cả các trường đã nhập hay chưa
        if (!username || !email || !phone || !password || !confirmPassword) {
            message.error("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        // Kiểm tra mật khẩu xác nhận
        if (password !== confirmPassword) {
            message.error("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            // Kiểm tra xem tên đăng nhập đã tồn tại trong cơ sở dữ liệu hay chưa
            const res = await fetch("http://localhost:3001/users");
            const users = await res.json();

            const isUsernameTaken = users.some(user => user.username === username);
            if (isUsernameTaken) {
                message.error("Tên đăng nhập đã tồn tại.");
                return;
            }

            // Tạo ID mới cho người dùng
            const newId = (Math.max(...users.map(user => Number(user.id)), 0) + 1).toString();

            // Gửi yêu cầu POST để đăng ký người dùng mới
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: newId,
                    username,
                    email,
                    phone,
                    password,
                    role: "user", // Mặc định là user
                    blocked: false // Người dùng mới sẽ không bị khóa
                })
            });

            message.success("Đăng ký thành công!");
            navigate("/login"); // Điều hướng tới trang đăng nhập
        } catch (error) {
            console.error(error);
            message.error("Không thể kết nối đến server.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <Card title="Đăng ký" style={{ width: 350, textAlign: "center" }}>
                <Input
                    size="large"
                    placeholder="Tên đăng nhập"
                    prefix={<UserOutlined />}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input
                    size="large"
                    placeholder="Số điện thoại"
                    prefix={<PhoneOutlined />}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input.Password
                    size="large"
                    placeholder="Mật khẩu"
                    prefix={<LockOutlined />}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input.Password
                    size="large"
                    placeholder="Xác nhận mật khẩu"
                    prefix={<LockOutlined />}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Button type="primary" block size="large" onClick={handleRegister} style={{ marginBottom: 16 }}>
                    Đăng ký
                </Button>
                <div style={{ textAlign: "center" }}>
                    <Link href="/login">Đã có tài khoản? Đăng nhập</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
