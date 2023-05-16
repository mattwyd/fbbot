const KijiSearch = require('../KijijiSearch');

const token = 'TOKEN';
const Discord = require('discord.js');

const client = new Discord.Client();

let searchCars = { starting: 'value'};

function sendAlert() {
    KijiSearch().then(ads => {
        searchCars = ads;
        console.log(JSON.stringify(searchCars, null, 2));
        //console.log(averageAdPriceOutliers(searchCars));
        
        //send alert here
    });
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
let interval;
function startInterval() {
    interval = setInterval(() => {
      // Code to be executed at the specified interval
      // For example, you can send a message to a specific channel
      
        let userId = '195656670855168012';
        let user = client.users.fetch(userId);
        console.log(JSON.stringify(searchCars, null, 2));

        user.then((user) => {
            user.send(JSON.stringify(searchCars, null, 2));
        });
    }, 60 * 1000); // Interval in milliseconds (e.g., 60 seconds)
  }
  

sendAlert();
startInterval();       
client.login(token);
