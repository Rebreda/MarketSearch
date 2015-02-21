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
// "Yukon", "Northwest Territories", "Nunavut"

var industry = "Recreation";
var age = "0 to 24 years (4,10)";
var gender = "Males";
var income = "Persons with income of $150,000 and over (5)";

var provinces = ["Ontario", "British Columbia", "Newfoundland and Labrador", "Prince Edward Island", "Nova Scotia", "New Brunswick", "Quebec", "Manitoba", "Saskatchewan",
				"Alberta"];

var cities = [];

for (var i=0; i < provinces.length; i++) {

	//Returns JSON object of best city/province/industry fit
	var city = find_best_industry(industry, provinces[i]);
	cities.push(city);
}


sorted_provinces = rankProv(cities);

console.log(sorted_provinces);

//Multiply by 4 to alter ranking weight
for (var k = 0; k < sorted_provinces.length; k++) {
	sorted_provinces[k].rank = sorted_provinces[k].rank * 4;
}

var raw = [];

for (var i=0; i < provinces.length; i++) {

	//Returns JSON object of best city/province/industry fit
	var res = find_best_income(age, gender, income, provinces[i]);
	raw.push(res);
}

sorted_incomes = rankProv(raw);

//Multiply by 3 to alter ranking weight
for (var k = 0; k < sorted_incomes.length; k++) {
	sorted_incomes[k].rank = sorted_incomes[k].rank * 3;
}

//sorted_provinces[0].province is the best industry fit!
console.log(sorted_provinces[0].province);
console.log(sorted_provinces[0].rank);

console.log(sorted_incomes[0].province);
console.log(sorted_incomes[0].rank);

function find_best_industry(industry, province) {

		var industry_results = search("Province", province, search("Industry", industry, data));
		var total_expend = search("Province", province, search("Industry", "Total expenditure", data));
		var result = {};

		if (industry_results.length > 1) {

			if ((parseFloat(industry_results[0].Value) / parseFloat(total_expend[0].Value)) > (parseFloat(industry_results[1].Value) / parseFloat(total_expend[1].Value))) {
				result.province = industry_results[0].Province;
				result.city = industry_results[0].City;
				result.value = parseFloat(industry_results[0].Value) / parseFloat(total_expend[0].Value);
			} else {
				result.province = industry_results[1].Province;
				result.city = industry_results[1].City;
				result.value = parseFloat(industry_results[1].Value) / parseFloat(total_expend[1].Value);
			}

		} else {
			result.province = industry_results[0].Province;
			result.city = industry_results[0].City;
			result.value = parseFloat(industry_results[0].Value) / parseFloat(total_expend[0].Value);
		}

		return result;
}

function find_best_income(age, gender, income, province) {

	var province_results = search("Income", income, search("Gender", gender, search("Age", age, 
						   search("Province", province, income_data))));
	var total_results = search("Income", "Total persons with income (5)", search("Gender", "Both sexes", search("Age", "All age groups (4,10)", 
						search("Province", province, income_data))));

	var result = {};

	result.province = province_results[0].Province;
	result.value = province_results[0].Value / total_results[0].Value;

	return result;
}

function rankProv(provs) {

	var sort_prov = [];
	var count = 0, j = 0, result;
	var amt = provs.length;
	var hold;

	//Returns a sorted array based off the proportions given in val
	for (var m=0; m < amt; m++) {

		j = 0;
		result = 0;

		for (j; j < provs.length; j++) {

			if (provs[j].value > provs[result].value) {
				result = j;
			}

		}

		hold = provs.splice(result, 1);
		hold = hold[0];
		hold.rank = 10 - count;
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