import React, { useState } from "react";
import { ConfigProvider, Form, Input } from "antd";
import { Navigate, useNavigate } from 'react-router-dom';

function LoginPage() {

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleFormSubmit = () => {
    const {email, password} = form.getFieldsValue();
    console.log(email,password);
    setLoading(true);
    const reqEmail = "user@mail.com";
    const reqPassword = "Test@1234";
    setTimeout(() => {
        if(reqEmail === email && reqPassword === password){
           localStorage.setItem('token',JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'));
           navigate('/users')
        }
        else{
            setErrors('Invalid Email or Password');
        }
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[#efefef] h-screen flex items-center justify-center">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
          },
        }}
      >
        <Form form={form} onFinish={handleFormSubmit} layout='vertical'>
          <div className="text-center text-[75px] flex items-center justify-center py-2 text-rose-500">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
              <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
              <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-3 mx-auto w-[450px] flex flex-col gap-2">
            <div className={`relative ${errors.email ? "required" : ""}`}>
              
              <Form.Item
              label="Email"
                name="email"
                rules={[{ required: true, message: "email is required" }]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "password is required" }]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
            </div>

            <div className="justify-end flex mt-2.5">
              <button
                type="submit"
                className="bg-rose-500 px-3.5 py-1.5 text-white rounded-lg"
                disabled = {loading}
              >
                {`${loading ? 'Loading...' : 'Login'}`}

                {/* {loading && <span>Loading....</span>} */}
              </button>
            </div>

{errors &&
            <div className='flex bg-rose-100 text-rose-500 items-center justify-center p-2 rounded-lg'>
                {errors}
            </div>
          }
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default LoginPage;
