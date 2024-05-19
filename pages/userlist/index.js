import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/templates/Sidebar';
import Navbar from '@/components/templates/Navbar';
import Swal from 'sweetalert2';
import ConnectToDB from '@/configs';
import { verify } from 'jsonwebtoken';
import model from '@/models/user';
import Userlist from '@/components/templates/Userlist';
import { io } from 'socket.io-client';
let socket;

function index({ user, userlist, onlineUsers, setOnlineUsers }) {

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket');

      socket = io()

      socket.on('connect', () => {
        console.log('connected')
      })

      socket.emit("new-user-add", user._id);

      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
    socketInitializer();
  }, [])

  useEffect(() => {
    // Tab has focus
    const handleFocus = async () => {
      socket.emit("new-user-add", user._id);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    };

    // Tab closed
    const handleBlur = () => {
      if (user) {
        socket.emit("offline")
      }
    };

    // Track if the user changes the tab to determine when they are online
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      <Sidebar role={user.role} />
      <Userlist userlist={userlist} onlineUsers={onlineUsers} />
    </>
  )
}

export async function getServerSideProps(context) {

  try {

    ConnectToDB();

    const { token } = context.req.cookies;

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "توکن نامعتبر می باشد !",
        confirmButtonText: "باشه",
      });
      return {
        redirect: { destination: "/login" }
      }
    }

    const tokenPayload = verify(token, process.env.PRIVATE_KEY);

    if (!tokenPayload) {
      return {
        redirect: { destination: "/" }
      }
    }

    const user = await model.findOne({ $or: [{ username: tokenPayload.identifier }, { email: tokenPayload.identifier }] }, "firstname lastname username role avatar")

    const resUsers = await fetch("http://localhost:3000/api/users/");
    const userlist = await resUsers.json();

    return {
      props: {
        userlist,
        user: JSON.parse(JSON.stringify(user))
      }
    }

  } catch (error) {
    console.log(error);
    return false;
  }
}

export default index