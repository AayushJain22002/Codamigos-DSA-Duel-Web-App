import Router from 'express'
const RoomRoutes = Router()

RoomRoutes.get('/create-room', (req, res) => {
    res.send({message: "Room Generated"})
})
export default RoomRoutes