const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routers/authRoute");

const app = express();
app.use(cors());

// Đặt đường dẫn tĩnh cho các tài nguyên như CSS, JavaScript và hình ảnh
app.use("/static", express.static(path.join(__dirname, "public")));

// Sử dụng body-parser để phân tích dữ liệu từ request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Định tuyến cho trang chính
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/dnsai", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/indexDNSai.html"));
});

app.get("/choigame", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/chosegame.html"));
});

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
