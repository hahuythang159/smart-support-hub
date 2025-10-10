import express from 'express'
import { isStaffOrAdmin } from '../middleware/role.middleware'
import { changePassword, getAllUsers } from '../controllers/users.controller'
import { validateChangePassword } from '../validators/auth'

const router = express.Router()

router.get("/", isStaffOrAdmin, getAllUsers)

router.patch("/change-password", validateChangePassword, changePassword)

export default router;