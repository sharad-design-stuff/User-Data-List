import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import UsersList from "./UsersList";

const CreateUser = ({ isModalOpen, handleCancel, getUser, userList, selectedUser, selectedState, setSelectedUser,setSelectedState }) => {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const initialValue = useMemo(()=>{
    const user = selectedUser?.data;
    let Payload = {
        name: user?.first_name? `${user?.first_name} ${user?.last_name}`: undefined,
        job: user?.job?user?.job: selectedState ==='edit' || selectedState ==='view'? 'UI' : undefined,
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        avatar: user?.avatar,
      };
      return Payload;
  },[selectedUser])
  const getToken = () => {
    const Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : "";
    return Token;
  };
  const createUserApi = async (Payload) => {
    try {
      const resp = await fetch("https://reqres.in/api/users", {
        method: "POST",
        mode: "cors",
        //   Origin: config.origin,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(Payload),
      });
      return resp.json();
    } catch (error) {
      console.error(error);
    }
  };
  const createUser = async (Payload) => {
    console.log(Payload);
    try {
      let user = await createUserApi(Payload);
      if (user) {
        getUser({ data: [user, ...userList] });
        handleClose();
        console.log(user);
        // setUserList(userList);
      }
    } catch (error) {}
  };
  const [form] = Form.useForm();
  const handleFormSubmit = () => {
    const { name, job, email, first_name, last_name } = form.getFieldsValue();
    console.log(name, job);
    // setLoading(true);
    let Payload = {
      name: name,
      job: job,
      email: email,
      first_name: first_name,
      last_name: last_name,
      avatar: "https://reqres.in/img/faces/9-image.jpg",
    };

    createUser(Payload);
  };

  const handleClose =()=>{
    handleCancel();
    form.resetFields();
    setSelectedUser({})
    setSelectedState('')
    
  }

  return (
    <>
      <Modal
        title={selectedState ==='edit' ? 'Edit User' : selectedState ==='view' ?  'View User' : 'Create User'}
        open={isModalOpen}
        onCancel={handleClose}
        footer={
          <div className='flex gap-2 justify-end'>
            <button className='bg-rose-500 text-white rounded-md p-1 min-w-[75px]' onClick={handleClose}>Cancel</button>
            <button className='bg-rose-500 text-white rounded-md p-1 min-w-[75px]' onClick={() => form.submit()}>Submit</button>
          </div>
        }
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical" initialValues={initialValue}>
          <div className="bg-white shadow-lg rounded-lg p-3 mx-auto w-[450px] flex flex-col gap-3.5">
            <div className={`relative ${errors.email ? "required" : ""}`}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "name is required" }]}
              >
                <Input type="text" placeholder="Name" disabled={selectedState==='view'} />
              </Form.Item>

              <Form.Item
                label="Job"
                name="job"
                rules={[{ required: true, message: "Job is required" }]}
              >
                <Input type="text" placeholder="Job" disabled={selectedState==='view'}/>
              </Form.Item>

              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input type="text" placeholder="First Name" disabled={selectedState==='view'} />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input type="text" placeholder="Last Name" disabled={selectedState==='view'} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input type="text" placeholder="Email" disabled={selectedState==='view'} />
              </Form.Item>
            </div>

            <div className="flex">{errors}</div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default CreateUser;
