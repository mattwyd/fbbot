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
    to: ['stopspammingmebruh@gmail.com', 'seanquinn33@gmail.com'], 
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
          background-color: #f2f2f2;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
    
        .ad-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 600px;
          text-align: center;
        }
    
        .ad-image {
          margin-bottom: 20px;
        }
    
        .ad-title {
          font-size: 24px;
          color: #333333;
          margin-bottom: 10px;
        }
    
        .ad-description {
          font-size: 16px;
          color: #666666;
          margin-bottom: 20px;
        }
    
        .ad-details {
          text-align: left;
          margin-bottom: 20px;
        }
    
        .ad-details p {
          margin: 5px 0;
        }
    
        .ad-link {
          display: inline-block;
          font-size: 14px;
          color: #007bff;
          text-decoration: none;
          margin-top: 10px;
        }
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
        <a href="${car.url}" class="ad-link">Click here to view ad on Kijiji</a>
      </div>
    </body>
    </html>
    `;
        }
                
        module.exports = sendCarEmail;
        