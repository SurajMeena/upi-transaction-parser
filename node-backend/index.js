const PayU = require("payu-websdk");
const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

require("dotenv").config();

const key = process.env.PAYU_KEY;
const salt = process.env.PAYU_SALT_V1;
const env = "TEST";
const payuClient = new PayU(
  {
    key: key,
    salt: salt,
  },
  env
);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10, // Number of connections in the pool
});

// create a api route to handle for validateVPA
app.get("/api/validateVPA/:vpa", async (req, res) => {
  try {
    // find the vpa in the local database
    const [rows] = await pool.query("select * from vpa where vpa = ?", [
      req.params.vpa,
    ]);
    if (rows.length > 0) {
      res.status(200).json({
        details: {
          status: "SUCCESS",
          vpa: rows[0]["vpa"],
          isVPAValid: rows[0]["valid"],
          payerAccountName: rows[0]["name"],
        },
      });
      return;
    }

    const response = await payuClient.validateVPA(req.params.vpa);
    pool.query(
      "insert into vpa(vpa, name, valid) values(?,?,?)",
      [
        req.params.vpa,
        response["payerAccountName"],
        response["isVPAValid"],
      ]
    );
    res.status(200).json({ details: response });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
