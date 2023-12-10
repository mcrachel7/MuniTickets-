const {Router} = require('express');
const router = Router();
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


//modules import
const User = require('../models/user');
const config = require('../config/secret');
const transporter = require('../config/nodemailer');

//create a new user
router.post('/register', async (req, res) =>{
  console.log("\t\t[POST] Front llego al back [API / register]. ¡Un saludo!");
     User.init();
     const {username, email, password, rol} = req.body;

     //create a new User object
     const user = new User({
          _id: new Types.ObjectId(),
          username: username,
          email: email,
          password: password,
          roles: rol
     });

    //encrypt the user's password
     user.password = await user.encryptPassword(user.password);
     await user.save();

     //generate a token for the user
     const token = jwt.sign({id: user._id}, config.secret);
     res.json({auth: true, token});
});

//show the username by user
router.get('/Profile', verifyToken, async (req, res, next) =>{
  console.log("\t\t[GET] Front llego al back [API / Profile]. ¡Un saludo!");

     const id = req.query.idUser;
     try {
      const user = await User.findOne({ _id: id });
       if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }
       const { username } = user;
       res.status(200).json({ username });
     } catch (error) {
       console.error('Error fetching user:', error);
       res.status(500).json({ message: 'Internal server error' });
     }
});

//login for already registered users
router.post('/login', async (req, res) =>{
  console.log("\t\t[POST] Front llego al back [API / login]. ¡Un saludo!");

     const {email} = req.body;

     //find a user with the provided email
     const user = await User.findOne({email: email});

     if(!user){
          return res.status(404).send('Email does not exist');
     }

     //compare the provided password with the stored password hash
     const validPassword = await user.comparePassword(
          req.body.password,
          user.password
     );
     if(!validPassword){
          return res.status(401).send({auth: false, token: null});
     }

     //generate a token for the user
     const token = jwt.sign({id: user._id}, config.secret);
     res.json({auth: true, token, id_user: user._id, role: user.roles[0]});
});


router.post('/reset-password-request', async (req, res) => {
  console.log("\t\t[POST] Front llego al back [API / reset-password-request]. ¡Un saludo!");
  const { email } = req.body;
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Generate a reset token and set its expiration date (e.g., 1 hour)
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

  try {
    // Save the user with the reset token
    await user.save();

    // Construct the reset link with query parameter
    const resetLink = `http://localhost:4200/auth/forgot-password?resetToken=${resetToken}`;

    const mailOptions = {
      from: 'munitickets@gmail.com',
      to: email,
      subject: 'Cambio de Contraseña',
      html: `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 20px;
          }
          .content {
            padding: 20px;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Cambio de Contraseña</h1>
          </div>
          <div class="content">
            <p>Ingresa al siguiente vínculo para cambiar tu contraseña:</p>
            <a class="button btn btn-info btn-block" href="${resetLink}">Cambiar Contraseña</a>
          </div>
        </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send password reset email' });
      } else {
        console.log('Password reset email sent:', info.response);
        res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/reset-password', async (req, res) => {
  console.log("\t\t[POST] Front llego al back [API / reset-password]. ¡Un saludo!");
  const { resetToken, newPassword } = req.body;

  // Find the user by resetToken
  const user = await User.findOne({ resetToken });

  if (!user) {
    return res.status(404).json({ message: 'Invalid or expired reset token' });
  }

  // Check if the reset token is still valid (e.g., not expired)
  if (user.resetTokenExpiration <= Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  // Update the user's password and clear the reset token
  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  // Encrypt and save the new password
  user.password = await user.encryptPassword(newPassword);
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
});

//verify that exists in the header
async function verifyToken(req, res, next){
     const token= req.headers.authorization;

     //check if a token exists in the header
     if(!token){
          return res
          .status(401)
          .send({auth: false, message: 'No token was Provided'});
     }

     //verify the token
     const decoded = await jwt.verify(token, config.secret);

     //attach the decoded user ID to the request object for use in other middlewares
     req.userId = decoded._id;

     next();
}

module.exports = router;
