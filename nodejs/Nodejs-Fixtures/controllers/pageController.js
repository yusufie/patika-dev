const nodemailer = require("nodemailer");
const Furniture = require('../models/Furniture');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {

  const furnitures = await Furniture.find().sort('-createdAt').limit(2);

  res.status(200).render('index', {
    page_name: 'index',
    furnitures,
  });
};

  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
      page_name: 'about',
    });
  };

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
      page_name: 'register',
    });
  };

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
      page_name: 'login',
    });
  };

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
      page_name: 'contact',
    });
  };

  exports.sendEmail = async (req, res) => {

    try {
      
    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "havvaarslann@gmail.com", // gmail account
        pass: "zqlzttsxiqzwdggz", // gmail password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Furniture Contact Form" <havvaarslann@gmail.com>', // sender address
      to: "eminmertpolatli@gmail.com", // list of receivers
      subject: "Furniture Contact Form New Message ✔", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash("success", "We Received your message succesfully");

    res.status(200).redirect('contact');
  } catch (err) {
    // req.flash("error", `Something happened! ${err}`);
    req.flash("error", `Something happened!`);
    res.status(200).redirect('contact');
  }
  
  };