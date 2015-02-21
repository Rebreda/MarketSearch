//Main algorithm for determining the best location, based off the of specified inputs

//Identify lucrative/under-served business markets for Canadian entrepreneurs

//Input:
//	-Industry
//(Target Market)
//	-Age
//	-Income Range
//	-Gender
//	-Profession
//	-Children (If time)
//	-Market Size (If time)

//Output:
// -Best location in Canada for the business

var industry = (input industry);

var provinces = ["Ontario", "British Columbia", "Newfoundland and Labrador", "Prince Edward Island", "Nova Scotia", "New Brunswick", "Quebec", "Manitoba", "Saskatchewan",\
				"Alberta", "Yukon", "Northwest Territories", "Nunavut"];

var cities = [];

for (var i=0; i < provinces.length; i++) {

	//Returns JSON object of best city/province/industry fit
	var city = findBestCity(industry, provinces[i]);
	cities.push(city);

}


sorted_provinces = rankProv(cities);

//Multiply by 5 to alter ranking weight
for (var prov in sort_provinces) {
	prov.rank = prov.rank * 5;
}


//sorted_provinces[0].province is the best industry fit!






function findBestCity(industry, province) {



}

function rankProv(provs) {

	var sort_prov = [];
	var count = 0, j = 0;

	//Returns a sorted array based off the proportions given in val
	for (var m=0; m < provs.length; m++) {

		j = count;
		var result = j;

		for (j; j < provs.length; j++) {

			if (provs[j].val > provs[result].val) {
				result = j;
			}

		}

		var hold = provs.splice(result, 1);
		hold.rank = 13 - count;
		sort_prov.push(hold);

		count++;

	}

	return sort_prov;
}