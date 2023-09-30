import React, { useState } from "react";
import {  Row, Col ,Button, Checkbox, Form, Input, message } from "antd";
import Logo from "../../assets/Images/suprabhathamlogo.svg";
import "./style.css";
import { POST } from "../../utils/api";
import { API } from "../../Config/API";
import { navigate } from "gatsby";
import { Link } from "gatsby";

const LoginScreen = (props: any) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    let body = {
      identifier: values.username,
      password: values.password,
    };
    let url = API.LOGIN;
    try {
      const response: any = await POST(url, body);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.user));
        typeof window !== "undefined" &&
          window.JSON.stringify(localStorage.getItem("user"));
        message.success({ content: "login successfully" });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      message.error({ content: "login failed" });
    }
  };

  

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <Row>
      <Col md={12} >
        <div className="firstsifnSection"
        style={{backgroundColor:"red"}}
        >
        <Logo className="firstsifnSectionsuprabhathamLogo" />
        </div>
      </Col>
      <Col md={12} >
      <div className="SecondsignSectionbox1">
        <div className="SecondsignSectionbox2">
          <div className="SecondsignSectionlogo">
            <Logo className="suprabhathamLogo" />
          </div>
          <div className="signin">
            Sign in
          </div>
          <div className="account">
             Don't have an account? <Link to="/signupscreen"> Create</Link> 
          </div>
          <div>
            <Form
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: "100%",
                textAlign: "center",
                marginTop:"10px"
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    message: "Please input your password!",
                    required: true,
                  },
                ]}
              >
                <Input.Password style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  className="antBttnLogin"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      </Col>
    </Row>
    </>
  );
};

export default LoginScreen;