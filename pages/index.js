import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/templates/Sidebar';
import Navbar from '@/components/templates/Navbar';
import ConnectToDB from '@/configs';
import { verify } from 'jsonwebtoken';
import model from '@/models/user';
import Tasks from '@/components/templates/Tasks';
import { io } from 'socket.io-client';
let socket;

function Home({ tasks, user, users, setOnlineUsers }) {

  const [tasksReal, setTasksReal] = useState(tasks);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket');

      socket = io()

      socket.on('connect', () => {
        console.log('websocket connected')
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
      <Tasks members={users} tasks={tasksReal} setTasksReal={setTasksReal} role={user.role} _id={user._id} />
    </>
  )
}

export async function getServerSideProps(context) {

  try {

    ConnectToDB();

    const { token } = context.req.cookies;

    if (!token) {
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

    const resTasks = await fetch("http://localhost:3000/api/tasks/userid/" + user._id);
    const tasks = await resTasks.json();

    const resUsers = await fetch("http://localhost:3000/api/users/");
    const users = await resUsers.json();

    return {
      props: {
        tasks,
        users,
        user: JSON.parse(JSON.stringify(user))
      }
    }

  } catch (error) {
    console.log(error);
    return false;
  }
}

export default Home