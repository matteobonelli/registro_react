"use client";
import React, { useEffect, useState } from 'react'
import { Avatar, Dropdown } from "flowbite-react";
import axios from 'axios';
import { User } from '../../pages/users/Users';

export interface UserAvatar {
    id: string
    name:string
    surname: string
    email: string
    img: string
  }


const AvatarDropdown : React.FC = () => {

    const[data, setData] = useState<User>()

    const getUsers = () => {
      axios.get<User>(`${import.meta.env.VITE_BASE_URL}/users`).then((res : any) =>{
        setData(res[0]);
        console.log(res)
      })
    }

      useEffect(() => {
        getUsers();
      }, []);

  return (
    <div>
        <Dropdown
      label={<Avatar alt="User settings" img="https://picsum.photos/id/237/200/300" rounded />}
      arrowIcon={false}
      inline
    >
      <Dropdown.Header>
        <span className="inline-block text-sm">{data?.firstName}</span>
        <span className="text-sm"> {data?.lastName}</span>
        <span className="block truncate text-sm font-medium">{data?.email}</span>
      </Dropdown.Header>
      <Dropdown.Item href={`/profile/${data?.firstName.toLowerCase()}`}>My Profile</Dropdown.Item>
      <Dropdown.Item href="/">Dashboard</Dropdown.Item>
      <Dropdown.Item href="/settings">Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
    </div>
    
  )
}

export default AvatarDropdown