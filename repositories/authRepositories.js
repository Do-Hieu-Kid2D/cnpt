const mysql = require("mysql");

class authRepositories {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "cnpt",
        });
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results, fields) => {
                console.log(`===>NEW query SQL: `, sql);
                if (error) {
                    reject(error);
                } else {
                    // console.log(`===>OKE: fields`, fields);
                    resolve(results);
                }
            });
        });
    }

    register(username, password) {
        const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
        return this.query(sql);
    }

    login(username, password) {
        const sql = `Select * from user where user_name = '${username}' and password = '${password}';`;
        return this.query(sql);
    }
    // Thêm các hàm khác tại đây cho các hoạt động khác với cơ sở dữ liệu

    async connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Lỗi kết nối:", err);
                return;
            }
            console.log("Kết nối thành công đến MySQL");
        });
    }

    async end() {
        this.connection.end();
    }
}

module.exports = authRepositories;
