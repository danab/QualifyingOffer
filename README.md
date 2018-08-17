## Calculating the Qualifying Offer

This is a basic web app to calculate (predict) what the qualifying offer will be. It consists of a few parts.

## Proxy Server

The data is given in an HTML table. The table contains some data that needs to be cleaned up (extra '$' characters mostly and some missing data. Unfortunately the website does not have CORS enabled so I set up a simple proxy server to feed me the JSON data I wanted. The code is not included in this repo, but it shown in it's entirety below.

```
const axios = require('axios');
const tabletojson = require('tabletojson');

const cleanData = ({ Salary, Player }) => {
	return {
		player: Player,
		salary: parseFloat(Salary.replace(/\$|,/g, ''))
	};
};

exports.handler = async event => {
	const salaryData = await axios
		.get('https://questionnaire-148920.appspot.com/swe/data.html')
		.then(res => tabletojson.convert(res.data)[0])
		.then(jsonArr => jsonArr.map(cleanData));

	return salaryData;
};
```

The code was uploaded to AWS Lambda and served via API gateway. The whole process of the proxy server is quite slow, but I didn't get a chance to debug it. My suspicion is that AWS lambda gives you so little memory by default that it may be slow to parse the HTML.

## Web App

First and foremost the web app sorts the data by salary, marks the top 125 salaries, and computes the information necessary to determine the qualifying offer (as well as some other interesting tidbits).

### Distribution

Just for fun I added a histogram to visualize the salary data given. By default it shows only the top 125, but you can toggle to see every salary, or all salaries except for league minimum.

To help create this histogram I used [@data-ui/histogram](https://github.com/williaster/data-ui/tree/master/packages/histogram)

### Table

Frankly, this data was given in a table, and is probably most useful to view in a table.
To create this "data table" I used [react-table](https://react-table.js.org/). I created some basic filters that allow the user to search the data a little more easily. A range sliders for salaries was considered and would be possible to implement next.

### Running the App

Assuming you have node installed you should be able to run the repository with

```
npm install
npm start
```

You can also view the code live at [https://vigorous-keller-7b65e5.netlify.com/](https://vigorous-keller-7b65e5.netlify.com/)
