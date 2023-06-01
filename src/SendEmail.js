const nodemailer = require('nodemailer');
const { setDefaultHighWaterMark } = require('nodemailer/lib/xoauth2');
const config = require('../config.js')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inkyyhd@gmail.com',
        pass: config.EMAIL_KEY
    }
});


async function sendCarEmail(car) {
  const result = await transporter.sendMail({
    from: 'inkyyhd@gmail.com',
    to: 'stopspammingmebruh@gmail.com', 
    subject: 'Car Details',
    html: generateCarEmailTemplate(car)
  });
  
  console.log(JSON.stringify(result, null, 4));
}

function generateCarEmailTemplate(car) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
  <style>
  body {
    font-family: 'Open Sans', sans-serif;
  }
  
  h1, h2, p {
    font-family: 'Open Sans', sans-serif;
  }
  
  /* Styles for your email template */
  </style>
  </head>
  <body>
  <div class="ad-container">
  <div class="ad-image">
  <img src="${car.image}" alt="Car Image" style="max-width: 100%;">
  </div>
  <h2 class="ad-title">${car.title}</h2>
  <p class="ad-description">${car.description}</p>
  <div class="ad-details">
          <p>Date: ${car.date}</p>
          <p>Vehicle Type: ${car.attributes.vehicletype}</p>
          <p>Year: ${car.attributes.caryear}</p>
          <p>Make: ${car.attributes.carmake}</p>
          <p>Model: ${car.attributes.carmodel}</p>
          <p>Mileage: ${car.attributes.carmileageinkms}</p>
          <p>Price: ${car.attributes.price}</p>
          <p>Location: ${car.attributes.location}</p>
          </div>
          <a href="${car.url}" class="ad-link">matt@swift: click here to view ad on kijiji </a>
          </div>
          </body>
          </html>
          `;
        }
                
        module.exports = sendCarEmail;
        