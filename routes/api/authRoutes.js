require("dotenv").config();

const Router = require("express").Router();
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
var randtoken = require('rand-token');
const mysqlConnection = require("../../database/DBConnection");
const validateCard = require('../../utils/cardValidator');
const {addNewCustomer, subscribeCustomerToPlan, createPaymentMethod, attachPaymentMethodToCustomer} = require("../../utils/paymentHandler");


// Router.get("/signIn", async (req, res) => {
//   mysqlConnection.query("SELECT * from users", (err, rows, fields) => {
//     if (!err) {
//       res.send(rows);
//     }
//   });
// });

Router.post("/signIn", async (req, res) => {
  const data = req.body;
  let getUser = `SELECT * FROM users WHERE email = "${data.email}"`;

  mysqlConnection.query(getUser, async (err, rows, fields) => {
    let userInfo = Object.values(JSON.parse(JSON.stringify(rows)));

    if (userInfo[0]?.userActive === 0) {
      return res.status(401).json({ error: "Please signup correctly" });
    }

    if (userInfo.length > 0 && userInfo[0]) {
      const isValidPassword = bcrypt.compareSync(
        data.password,
        userInfo[0].password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          { user_id: userInfo[0].id, email: userInfo[0].email, type: data.type },
          process.env.TOKEN_SECRET,
          {
            expiresIn: process.env.LOGIN_EXPIRY,
          }
        );

        res.status(200).json({
          status: "success",
          token,
          name: userInfo[0].name,
          email: userInfo[0].email,
          id: userInfo[0].id,
          userType: data.type,
        });

      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Looks like you haven't signup yet" });
    }
  });
});

// Router.get("/signUp", (req, res) => {
//   mysqlConnection.query("SELECT * from usres", (err, rows, fields) => {
//     if (!err) {
//       res.send(rows);
//     }
//   });
// });

Router.post("/signUpFlow1", (req, res) => {
  let requestData = req.body;
  let emailpresent = `SELECT * FROM users WHERE email = "${requestData.email}"`;

  mysqlConnection.query(emailpresent, async (err, rows, fields) => {
    if (rows.length >= 1) {
      return res.status(400).json({ data: rows, error: "This email is already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    requestData.password = await bcrypt.hash(requestData.password, salt);

    const sql = `INSERT INTO users (email, password) VALUES ("${requestData.email}", "${requestData.password}")`;

    mysqlConnection.query(sql, (err, rows) => {
      const token = jwt.sign(
        { email: requestData.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.LOGIN_EXPIRY,
        }
      );

      if (!err) {
        return res.status(200).json({
          status: "success",
          token: token,
          email: requestData.email,
        });
      }

      res.send(err);
    });
  });
});

Router.post("/signUpFlow2", (req, res) => {
  let requestData = req.body;
  const emailpresent = `SELECT * FROM users WHERE email = "${requestData.email}"`;

  mysqlConnection.query(emailpresent, async (err, rows, fields) => {
    if (rows.length < 1) {
      return res.status(400).json({ error: "Please fill and send the email form first." });
    }

    const sql = `UPDATE users SET 
      firstname = "${requestData.values.firstName}", 
      lastname = "${requestData.values.lastName}" ,
      companyName = "${requestData.values.companyName}" ,
      jobTitle = "${requestData.values.jobTitle}"
    WHERE email = '${requestData.email}'`;

    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        return res.status(200).json({
          status: "success",
        });
      }

      res.send(err);
    });
  });
});

Router.post("/signUpFlow3", (req, res) => {
  let requestData = req.body;
  const emailpresent = `SELECT * FROM users WHERE email = "${requestData.email}"`;

  mysqlConnection.query(emailpresent, async (err, rows, fields) => {
    if (rows.length < 1) {
      return res.status(400).json({ error: "Please fill and send the email form first." });
    }

    const sql = `UPDATE users SET plan = "${requestData.selectedPlan}" WHERE email = '${requestData.email}'`;

    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        return res.status(200).json({
          status: "success",
        });
      }
      res.send(err);
    });
  });
});

const sendFreeTrialEmail = async (user) => {
  try {
    console.log(user)
  } catch (e) {
    console.error(e);
  }
}

const validateCardDetails = async (details) => {
  const cardNumber = details.cardNumber.replace(/,/g, "")
  return validateCard(cardNumber)
}

Router.post("/signUpFlow4", (req, res) => {
  let requestData = req.body;
  const emailpresent = `SELECT * FROM users WHERE email = "${requestData.email}"`;

  mysqlConnection.query(emailpresent, async (err, rows, fields) => {
    if (rows.length < 1) {
      return res.status(400).json({ error: "Please fill and send the email form first." });
    }

    const isValidCard = await validateCardDetails(requestData.values);
    if (!isValidCard) return res.status(400).json({ error: "The provided card details are incorrect" });

    const customer = await addNewCustomer(requestData.email)

    const paymentMethod = await createPaymentMethod(requestData.values)
    await attachPaymentMethodToCustomer(paymentMethod.id, customer.id)
    await subscribeCustomerToPlan(customer.id)
    req.session.customerID = customer;
    req.session.email = requestData.email

    const sql = `UPDATE users SET 
      cardNumber = "${requestData.values.cardNumber}",
      cardDate = "${requestData.values.cardDate}",
      cvv = "${requestData.values.cvv}",
      cardHolder = "${requestData.values.cardHolder}",
      postalCode = "${requestData.values.postalCode}",
      userActive = 1
    WHERE email = '${requestData.email}'`;

    mysqlConnection.query(sql, async (err, _rows) => {
      if (!err) {
        await sendFreeTrialEmail(rows[0]);
        return res.status(200).json({
          status: "success",
        });
      }
      res.send(err);
    });
  });
});

function sendEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    from: process.env.GMAIL_EMAIL, // sender
    to: `${email}`, // list of receivers
    subject: "Forgot Password for Enablemint", // Subject line
    html: `
    <div>
      <div style='display: flex; justify-content: center;'>
        <p>You requested for reset password, kindly use this 
          <a 
            style='text-decoration: none; background-color: green; padding: 5px 20px; margin: 0 10px; border-radius: 5px; color: white;'
            href="${process.env.BACKEND_API_HOST}/reset-password/${token}"
          >
            link
          </a> 
          to reset your password
        </p>
      </div>
    </div>`, // html body
  }).then(info => {
    if (info) {
      return info.status(200).json({ status: "success" });
    }
  }).catch(console.error);
}

Router.post("/reset-password-email", (req, res) => {
  const { email } = req.body;
  let currentUser = `SELECT * FROM users WHERE email = "${email}"`;

  mysqlConnection.query(currentUser, async (err, rows, fields) => {
    if (err) throw err;
    if (rows[0]?.email.length > 0) {
      var token = randtoken.generate(20);
      var sent = sendEmail(email, token);

      if (sent != '0') {
        var data = {
          token: token
        }
        mysqlConnection.query('UPDATE users SET ? WHERE email ="' + rows[0].email + '"', data, function (err, result) {
          if (err) throw err
          return res.status(200).json({ message: 'success' });
        })
      } else {
        return res.status(500).json({ error: 'Something went to wrong. Please try again.' });
      }
    } else {
      return res.status(401).json({ error: 'This Email is not registered.' });
    }
  });
});

Router.post('/update-password', function (req, res, next) {
  var token = req.body.token;
  var password = req.body.password;

  mysqlConnection.query('SELECT * FROM users WHERE token ="' + token + '"', function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      // var saltRounds = 10;
      // var hash = bcrypt.hash(password, saltRounds);
      // bcrypt.genSalt(saltRounds, function(err, salt) {
      //   bcrypt.hash(password, salt, function(err, hash) {

      //   });
      // });
      var data = {
        password: password
      }
      mysqlConnection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function (err, result) {
        if (err) throw err;

        res.status(200).json({ message: 'success' });

      });
    } else {
      return res.status(401).json({ error: 'This link is not valid. Please try again.' });
    }
  });
})

module.exports = Router;