import express from 'express'
import { isStaffOrAdmin } from '../middleware/role.middleware'
import { getAllUsers } from '../controllers/users.controller'

const router = express.Router()

router.use(isStaffOrAdmin)

router.get("/", getAllUsers)

export default router;