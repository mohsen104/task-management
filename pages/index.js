import React, { useState } from 'react'
import Sidebar from '@/components/templates/Sidebar';
import Navbar from '@/components/templates/Navbar';
import ConnectToDB from '@/configs';
import { verify } from 'jsonwebtoken';
import model from '@/models/user';
import Tasks from '@/components/templates/Tasks';

function Home({ tasks, user, users }) {

  const [tasksReal, setTasksReal] = useState(tasks);

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

    const resTasks = await fetch("https://task-management-nine-mu.vercel.app/api/tasks/userid/" + user._id);
    const tasks = await resTasks.json();

    const resUsers = await fetch("https://task-management-nine-mu.vercel.app/api/users/");
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