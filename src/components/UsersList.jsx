import { ConfigProvider, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [userList, setUserList] = useState([]);
  const getToken = () => {
    const Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : "";
    return Token;
  };

  const getUserListApi = async () => {
    const resp = await fetch("https://reqres.in/api/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return resp.json();
  };
  const getUserApi = async (id) => {
    const resp = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return resp.json();
  };
  const getUser = async (id) => {
    try {
      let user = await getUserApi(id);
      if (user) {
        setSelectedUser(user);
        setIsModalOpen(true);
      }
    } catch (error) {}
  };
  console.log(selectedUser);
  const getUserList = async () => {
    try {
      let userList = await getUserListApi();
      if (userList) {
        setUserList(userList);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUserList();
  }, []);
  console.log(userList);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "key",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "key",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "key",
    },
    {
      title: "User Pic",
      dataIndex: "avatar",
      key: "key",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "key",
    },
  ];
  const dataSource = useMemo(() => {
    return userList?.data?.map((item) => {
      return {
        key: item?.id,
        firstName: item?.first_name,
        lastName: item?.last_name,
        email: item?.email,
        avatar: (
          <span>
            <img className='h-[35px] w-[35px] rounded-full border-[2px] border-rose-500' src={item?.avatar} />
          </span>
        ),
        action: (
          <div className='gap-1 flex'>
            <button className='bg-rose-500 text-white min-w-[25px] min-h-[25px] p-1 rounded-md flex items-center justify-center'
              onClick={() => {
                actionHandle("edit", item.id);
              }}
            >
            <Tooltip title="Edit">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>
              </Tooltip>
            </button>
            <button className='bg-rose-500 text-white min-w-[25px] min-h-[25px] p-1 rounded-md flex items-center justify-center'
              onClick={() => {
                actionHandle("view", item.id);
              }}
            >
            <Tooltip title="View">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"></path><path d="M12 3.5c3.432 0 6.124 1.534 8.054 3.241 1.926 1.703 3.132 3.61 3.616 4.46a1.6 1.6 0 0 1 0 1.598c-.484.85-1.69 2.757-3.616 4.461-1.929 1.706-4.622 3.24-8.054 3.24-3.432 0-6.124-1.534-8.054-3.24C2.02 15.558.814 13.65.33 12.8a1.6 1.6 0 0 1 0-1.598c.484-.85 1.69-2.757 3.616-4.462C5.875 5.034 8.568 3.5 12 3.5ZM1.633 11.945a.115.115 0 0 0-.017.055c.001.02.006.039.017.056.441.774 1.551 2.527 3.307 4.08C6.691 17.685 9.045 19 12 19c2.955 0 5.31-1.315 7.06-2.864 1.756-1.553 2.866-3.306 3.307-4.08a.111.111 0 0 0 .017-.056.111.111 0 0 0-.017-.056c-.441-.773-1.551-2.527-3.307-4.08C17.309 6.315 14.955 5 12 5 9.045 5 6.69 6.314 4.94 7.865c-1.756 1.552-2.866 3.306-3.307 4.08Z"></path></svg>
              </Tooltip>
            </button>
            <button className='bg-rose-500 text-white min-w-[25px] min-h-[25px] p-1 rounded-md flex items-center justify-center'
            >
            <Tooltip title="Files">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h2"></path><path d="M8 17h2"></path><path d="M14 13h2"></path><path d="M14 17h2"></path></svg>
              </Tooltip>
            </button>
          </div>
        ),
      };
    });
  }, [userList]);
  console.log(dataSource);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const actionHandle = (state, id) => {
    setSelectedState(state);
    getUser(id);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
        },
      }}
    >
      <div className="bg-white p-3.5 shadow-lg">
        <div className="container px-28 flex justify-between">
          <div className='text-4xl text-rose-500'>
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
          <div className='flex gap-2'>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-rose-500 px-2.5 py-1 text-white rounded-md flex gap-2 items-center justify-center"
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg>
              Create User
            </button>
            <button onClick={logOut} className="bg-rose-500 px-2.5 py-1 text-white rounded-md flex gap-2 items-center justify-center">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg>
            Logout
            </button>
          </div>
        </div>
      </div>
      <div className="container px-28 mt-3">
        <Table columns={columns} dataSource={dataSource} />
        {isModalOpen && (
          <CreateUser
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            getUser={setUserList}
            userList={userList.data}
            selectedUser={selectedUser}
            selectedState={selectedState}
            setSelectedUser={setSelectedUser}
            setSelectedState={setSelectedState}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default UsersList;
