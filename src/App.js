import React, { Component } from 'react';
import Loading from './Loading';
import Copy from './Copy';
import Histogram from './Histogram';
import Table from './Table';

// Data does not need to be pulled dynamically, since that's no longer the challenge...
import data from './data.json';

// This could be done on the server side...
// Mark the top 125 players
const sortData = data => {
	// not strictly necessary...
	const copy = [ ...data ];
	copy.sort((a, b) => (a.salary < b.salary ? 1 : -1));
	return copy.map((val, i) => {
		return { ...val, top125: i < 125 };
	});
};

// Manipulate data
const sortedData = sortData(data);
const top125data = sortedData.filter(obj => obj.top125);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			sortedData,
			top125data
		};
	}
	render() {
		if (this.state.loading) {
			return <Loading />;
		}

		const { sortedData, top125data } = this.state;

		return (
			<div id="wrapper">
				<Copy sortedData={sortedData} top125data={top125data} />
				<Histogram sortedData={sortedData} top125data={top125data} />
				<Table sortedData={sortedData} />
			</div>
		);
	}
}

export default App;
