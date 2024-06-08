const { Router } = require("express");
const {
  getBalance,
  transferBalance,
} = require("../controllers/accountController");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = Router();

router.get("/balance", isLoggedIn, getBalance);
router.post("/transfer", isLoggedIn, transferBalance);

module.exports = router;
