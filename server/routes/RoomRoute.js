import Router from 'express'
import { createRoom, joinRoom } from '../controllers/RoomControls.js'
const RoomRoutes = Router()

RoomRoutes.post('/create-room', createRoom)
RoomRoutes.post('/join-room', joinRoom)
export default RoomRoutes