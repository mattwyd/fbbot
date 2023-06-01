const fs = require('fs');
const Ks = require('./KijijiSearch');
const SendEmail = require('./SendEmail');
const { send } = require('process');

let carDictionary = {};
const uniqueAds = [];

async function filterUniqueAds(ads) {
  const data = fs.readFileSync('car_dictionary.json', 'utf8');
  carDictionary = JSON.parse(data);
  
  const newAds = [];
  
  for (let i = 0; i < ads.length; i++) {
    const { url } = ads[i];
    
    if (!carDictionary[url]) {
      newAds.push(ads[i]);
      carDictionary[url] = ads[i];
    }
  }
  
  const jsonOutput = JSON.stringify(carDictionary, null, 2);
  fs.writeFileSync('car_dictionary.json', jsonOutput);
  console.log('Car dictionary updated with new ads');
  
  return newAds;
}


async function main() {
  try {
    const ads = await Ks();
    const uniqueAds = await filterUniqueAds(ads);

    // Dump carDictionary to JSON file
    const jsonOutput = JSON.stringify(carDictionary, null, 2);
    fs.writeFileSync('car_dictionary.json', jsonOutput);
    console.log('Car dictionary saved to car_dictionary.json');

    // Send emails using uniqueAds
    for (const ad of uniqueAds) {
      await SendEmail(ad);
      console.log('email sent ')
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
setInterval(main, 15 * 60 * 1000);
