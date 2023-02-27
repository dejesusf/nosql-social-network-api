const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  // deleteUser,
  deleteUserAndThoughts,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller')

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUserAndThoughts);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;