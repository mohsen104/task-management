import React from 'react'
import Sidebar from '@/components/templates/Sidebar';
import Navbar from '@/components/templates/Navbar';
import ConnectToDB from '@/configs';
import { verify } from 'jsonwebtoken';
import model from '@/models/user';
import AccessUser from '@/components/templates/AccessUser';

function index({ user, userlist,  }) {
  return (
    <>
      <Navbar user={user} />
      <Sidebar role={user.role} />
      <AccessUser userlist={userlist} />
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

    if (user.role !== "MASTER") {
      return {
        redirect: { destination: "/" }
      }
    }

    const resUsers = await fetch("https://task-management-nine-mu.vercel.app/api/users/members/" + user._id);
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