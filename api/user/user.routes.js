const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser, updateUsersFriends} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/friends/:id', requireAuth, updateUsersFriends)
router.put('/:id', requireAuth, requireAdmin, updateUser)
router.delete('/:id',  requireAuth, requireAdmin, deleteUser)


module.exports = router