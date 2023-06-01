const kijiji = require("kijiji-scraper");
const fs = require('fs');
const MAX_KMS = 180000
const MAX_RATIO = 0.3



async function KijijiSearch() {
  const options = {
    minResults: 5,
  };

  const params = {
    locationId: 1700273,
    categoryId: 27,
    sortByName: "dateDesc",
  };

  try {
    const ads = await kijiji.search(params, options);
    // Use the ads array
    const filteredAds = ads.filter((ad) => {
        return (
          !ad.attributes.hasOwnProperty('motorcyclesmake') &&
          ad.attributes['forsaleby'] === 'ownr' &&
          ad.attributes['carmileageinkms'] > 510 &&
          ad.attributes['vehicletype'] === 'used' &&
          ad.attributes['carmileageinkms'] < MAX_KMS && 
          ad.attributes['price'] / ad.attributes['carmileageinkms'] < MAX_RATIO

        );
      });
      
    console.log(filteredAds);
    return filteredAds;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


async function calculatePriceToKmsRatio() {
  try {
    const ads = await KijijiSearch();

    const priceToKmsRatio = {};

    ads.forEach((ad) => {
      const { caryear, carmake, carmodel, price, carmileageinkms, url } = ad.attributes;

      const key = `${caryear}_${carmake}_${carmodel}`;

      if (!priceToKmsRatio[key]) {
        priceToKmsRatio[key] = [];
      }

      const ratio = price / carmileageinkms;
      priceToKmsRatio[key].push(ratio);
    });

    const averageRatio = {};

    for (const key in priceToKmsRatio) {
      const ratios = priceToKmsRatio[key];
      const sum = ratios.reduce((total, ratio) => total + ratio, 0);
      const average = sum / ratios.length;
      averageRatio[key] = average;
    }

    const jsonOutput = JSON.stringify(averageRatio, null, 2);
    fs.writeFileSync('price_to_kms_ratio.json', jsonOutput);
    console.log('Price to kilometers ratio saved to price_to_kms_ratio.json');
  } catch (error) {
    console.error('Error:', error);
  }
}
module.exports = KijijiSearch;
