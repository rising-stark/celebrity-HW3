import React, { useState, useEffect } from 'react';
import Form from 'antd/lib/form';
import { Button, Input, Row, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { currentPlayerLS } from '../constants';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const navigate = useNavigate();

  const onLogin = () => {
    const alphaNumeric = /^[0-9a-zA-Z]+$/;
    if (username === '') {
      message.error('Please enter username');
    } else if (!username.match(alphaNumeric)) {
      message.error('Only Alpha-Numeric chars');
    } else {
      localStorage.setItem(currentPlayerLS, username);
      navigate('/game');
    }
  };

  const testReq = async () => {
    try{
      const res = await fetch(`http://localhost:5000/`, {
        method: "GET"
      });
      if(res && res.status === 200){
        console.log("yes wre e");
      }
    } catch (error) {
      console.log(error);
      console.log("Server error. Message could not be delivered. Try again after sometime")
    }
  };

  useEffect(() => {
    testReq();
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Form>
          <Form.Item label="Username">
            <Input
              data-cy="username-input"
              type="text"
              placeholder="Please enter username"
              onChange={onUsernameChange}
            />
          </Form.Item>
          <Button data-cy="login-button" onClick={onLogin} type="default" className="w-full" icon={<LoginOutlined />} />
        </Form>
      </Row>
    </>
  );
};

export { Login };
