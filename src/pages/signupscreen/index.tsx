import React,{useState} from 'react';
import {  Row, Col ,Button, Checkbox, Form, Input, message } from "antd";
import Logo from "../../assets/Images/suprabhathamlogo.svg";
import "./style.css";
import { POST } from "../../utils/api";
import { API } from "../../Config/API";
import { navigate } from "gatsby";
import { Link } from "gatsby";

function signupscreen() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        let body = {
          username: values.user.name,
          email: values.user.email,
          password: values.user.password,
        };
        let url = API.REGISTER;
        try {
          const response: any = await POST(url, body);
          if (response.user) {
            setLoading(false);
            navigate("/loginscreen");
            message.success("Created User SucessFully");
          } else {
            setLoading(false);
            message.error("Something went wrong....!");
          }
        } catch (error) {
          setLoading(false);
          message.error("Something went wrong......!");
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
        <div >
          <div className="SecondsignSectionlogo">
            <Logo className="suprabhathamLogo" />
          </div>
          <div className="signin">
            Sign up
          </div>
          <br/>
          <div className="account">
             Already have an account?<Link to="/loginscreen"> sign in</Link>
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
                name={["user", "name"]}
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
                label="Email"
                name={["user", "email"]}
                rules={[
                  {
                    message: "Please input your Email!",
                    required: true,
                  },
                ]}
              >
                <Input.Password style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label=" Create Password"
                name={["user", "password"]}
                rules={[
                  {
                    message: "Please input your password!",
                    required: true,
                  },
                ]}
              >
                <Input.Password style={{ width: "100%" }} />
              </Form.Item>

              <br/>
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
                  continue
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      </Col>
    </Row>
    </>
  )
}

export default signupscreen