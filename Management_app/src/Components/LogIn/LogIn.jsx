import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import "./Login.css";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const LogIn = ({ setMessage }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const token = await login(values.username, values.password);
      if (token) {
        localStorage.setItem("token", token);
        message.success("Login successful!");
        setMessage("");
        navigate("/");
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error("Invalid username or password");
    }
  };

  return (
    <div className="form_login">
      <div>
        <Form onFinish={onFinish} className="form_login-content">
          <h1>Login</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <div className="login-options">
            <span>Or login with other methods</span>
            <div className="social-icons">
              <FaFacebook className="icon facebook" />
              <MdOutlineEmail className="icon email" />
              <FcGoogle />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
