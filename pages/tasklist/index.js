import React, { useState } from 'react'
import Sidebar from '@/components/templates/Sidebar';
import Navbar from '@/components/templates/Navbar';
import ConnectToDB from '@/configs';
import { verify } from 'jsonwebtoken';
import model from '@/models/user';
import Tasklist from '@/components/templates/Tasklist';

function index({ user, tasklist }) {
  const [tasksReal, setTasksReal] = useState(tasklist);

  return (
    <>
      <Navbar user={user} />
      <Sidebar role={user.role} />
      <Tasklist tasks={tasksReal} setTasksReal={setTasksReal} {...user} />
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

    const resTasks = await fetch("https://task-management-nine-mu.vercel.app/api/tasks");
    const tasklist = await resTasks.json();

    return {
      props: {
        tasklist,
        user: JSON.parse(JSON.stringify(user))
      }
    }

  } catch (error) {
    console.log(error);
    return false;
  }
}

export default index