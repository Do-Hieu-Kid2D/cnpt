const express = require("express");
const router = express.Router();
const path = require("path");

const authRepositories = require("../repositories/authRepositories");

router.post("/login", async (req, res) => {
    const db = new authRepositories();
    await db.connect();

    try {
        const username = req.body.username;
        const password = req.body.password;
        const loginResult = await db.login(username, password);
        console.log("Kết quả đăng nhập:", loginResult);
        if (loginResult.length > 0) {
            // có tk, mk này
            // Thiết lập cookie nếu đăng nhập thành công
            res.cookie("user", username, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("pass", password, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("name", password, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            // cuối cùng đưa về trang chọn game
            res.redirect("/choigame");
        } else {
            // dn sai thì về trang kia lặp lại
            res.redirect("/dnsai");
        }
    } catch (error) {
        console.error("Lỗi:", error);
    }
    await db.end();
});

router.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.clearCookie("pass");
    res.clearCookie("name");
    res.redirect("/");
});
module.exports = router;
