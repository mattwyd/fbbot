const kijiji = require("kijiji-scraper");

function KijiSearch(){

    const options = {
        minResults: 50
    };

    const params = {
        locationId: 1700273,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
        categoryId: 27,  // Same as kijiji.categories.CARS_AND_VEHICLES
        sortByName: "dateDesc",  // Show the cheapest listings first
        minPrice: 2000,
        maxPrice: 6000
    };

    // Scrape using returned promise 
    return kijiji.search(params, options).then(ads => {
        // Use the ads array
        return 'testcase'
        //return ads.filter((Ad) => Ad.attributes['carmileageinkms'] < 180000 && Ad.attributes['carmileageinkms'] > 510)
        //    .filter((Ad) => Ad.attributes.hasOwnProperty('motorcyclesmake') ? false : true)
            //.filter((Ad) => Ad.attributes['caryear'] > 2006)
            //.filter((y) => y.attributes['carmake'] === 'honda' || y.attributes['carmake'] === 'toyota')
            //.filter((y) => y.attributes['carmodel'] === 'civic' || y.attributes['carmodel'] === 'accord' || y.attributes['carmodel'] === 'civic')
    }).catch(console.error);

}

module.exports = KijiSearch;
