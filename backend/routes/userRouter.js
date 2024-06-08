const { Router } = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController");

const isLoggedIn = require("../middlewares/isLoggedIn");

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/user", isLoggedIn, updateUserProfile);
router.get("/bulk", isLoggedIn, getUsers);

module.exports = router;
