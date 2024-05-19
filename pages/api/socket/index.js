
import { Server } from 'socket.io'

let onlineUsers = [];
const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {
            // add new user
            socket.on("new-user-add", (newUserId) => {
                if (!onlineUsers.some((user) => user.userId === newUserId)) {
                    // if user is not added before
                    onlineUsers.push({ userId: newUserId, socketId: socket.id });
                    console.log("new user is here!", onlineUsers);
                }
                // send all active users to new user
                io.emit("get-users", onlineUsers);
            });

            socket.on("disconnect", () => {
                onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
                console.log("user disconnected", onlineUsers);
                // send all online users to all users
                io.emit("get-users", onlineUsers);
            });

            socket.on("offline", () => {
                // remove user from active users
                onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
                console.log("user is offline", onlineUsers);
                // send all online users to all users
                io.emit("get-users", onlineUsers);
            });
        });
    }
    res.end()
}

export default SocketHandler