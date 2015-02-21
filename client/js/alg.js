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

var industry = "Clothing";

var provinces = ["Ontario", "British Columbia", "Newfoundland and Labrador", "Prince Edward Island", "Nova Scotia", "New Brunswick", "Quebec", "Manitoba", "Saskatchewan",
				"Alberta", "Yukon", "Northwest Territories", "Nunavut"];

var cities = [];

for (var i=0; i < provinces.length; i++) {

	//Returns JSON object of best city/province/industry fit
	var city = find_best_industry(industry, provinces[i]);
	cities.push(city);

}


sorted_provinces = rankProv(cities);

//Multiply by 5 to alter ranking weight
for (var prov in sort_provinces) {
	prov.rank = prov.rank * 5;
}


//sorted_provinces[0].province is the best industry fit!
console.log(sorted_provinces[0].city);

function find_best_industry(industry, province) {

		var industry_results = search("Province", province, search("Industry", industry, data));
		var total_expend = search("Province", province, search("Industry", "Total expenditure", data));
		var result;

		if (len(industry_results) > 1) {

			if ((industry_results[0].value / total_expend[0].value) > (industry_results[1].value / total_expend[1].value)) {
				result.province = province;
				result.city = industry_results[0].city;
				result.value = industry_results[0].value / total_expend[0].value;
			} else {
				result.province = province;
				result.city = industry_results[1].city;
				result.value = industry_results[1].value / total_expend[1].value;
			}

		} else {
			result.province = province;
			result.city = industry_results[0].city;
			result.value = industry_results[0].value / total_expend[0].value;
		}

		return result;
}

function rankProv(provs) {

	var sort_prov = [];
	var count = 0, j = 0;

	//Returns a sorted array based off the proportions given in val
	for (var m=0; m < provs.length; m++) {

		j = count;
		var result = j;

		for (j; j < provs.length; j++) {

			if (provs[j].value > provs[result].value) {
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

//Returns array with the specified category and term to look for in that category
function search(category, keyTerm, data) {

        var temp = [];

        for (var i = 0; i < data.length; i++) {

            var search = keyTerm;

            if (data[i][category] === search) {
                temp.push(data[i]);
            }

        }
        return temp
    }