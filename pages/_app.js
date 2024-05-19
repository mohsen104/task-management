import "@/styles/globals.css";
import { useState } from "react";
import { Tooltip } from 'react-tooltip';

export default function App({ Component, pageProps }) {
  const [onlineUsers, setOnlineUsers] = useState();

  return (
    <>
      <Tooltip id="my-tooltip" />
      <main className='grid grid-cols-12 grid-rows-6 gap-4 bg-gray-50'>
        <Component {...pageProps} onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers} />
      </main>
    </>
  );
}
