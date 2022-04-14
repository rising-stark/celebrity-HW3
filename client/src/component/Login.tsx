import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Form from "antd/lib/form";
import { Button, Input, Row, message } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../service";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [cookies, setCookie] = useCookies();
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const navigate = useNavigate();

  const onLogin = () => {
    const alphaNumeric = /^[0-9a-zA-Z]+$/;
    if (username === "") {
      message.error("Please enter username");
    } else if (!username.match(alphaNumeric)) {
      message.error("Only Alpha-Numeric chars");
    } else {
      login(username)
        .then((res) => {
          if (res && res.status === 200) {
            setCookie("jwt", res.data.jwt);
            setCookie("username", res.data.username);
            alert("LoggedIn Successfully");
            navigate("/game");
          } else {
            alert("Server error. Try again after sometime");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Server error. Try again after sometime");
        });
    }
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      <Row
        //@ts-ignore
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}>
        <Form>
          <Form.Item label="Username">
            <Input
              data-cy="username-input"
              type="text"
              placeholder="Please enter username"
              onChange={onUsernameChange}
            />
          </Form.Item>
          <Button
            data-cy="login-button"
            onClick={onLogin}
            type="default"
            className="w-full"
            icon={<LoginOutlined />}
          />
        </Form>
      </Row>
    </>
  );
};

export { Login };
