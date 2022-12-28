
import { createContext, FC } from 'react'
import { io, Socket } from "socket.io-client";
import { ClientToServerEvent, ServerToClientEvent } from '../interfaces';


const socket: Socket<ServerToClientEvent, ClientToServerEvent> = io('http://localhost:8000')

export const SocketContext = createContext(socket)

interface SocketProviderProps {
    children: React.ReactNode
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )

}
