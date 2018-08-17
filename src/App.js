import React, { Component } from 'react';
import Loading from './Loading';
import Copy from './Copy';
import Histogram from './Histogram';
import Table from './Table';

import axios from 'axios';

// This could be done on the server side...
// Mark the top 125 players
const sortData = data => {
	// not strictly necessary...
	const copy = data.slice();
	copy.sort((a, b) => (a.salary < b.salary ? 1 : -1));
	return copy.map((val, i) => {
		return { ...val, top125: i < 125 };
	});
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}
	componentDidMount = async () => {
		const resp = await axios.get(
			'https://rvkaasnsr0.execute-api.us-east-1.amazonaws.com/prod'
		);
		const sortedData = sortData(resp.data);
		const top125data = sortedData.filter(obj => obj.top125);

		this.setState({
			loading: false,
			sortedData,
			top125data
		});
	};
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
