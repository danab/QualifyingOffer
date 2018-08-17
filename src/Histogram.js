import React, { Component, Fragment } from 'react';

import {
	Histogram,
	BarSeries,
	withParentSize,
	XAxis,
	YAxis
} from '@data-ui/histogram';

// HT: https://stackoverflow.com/a/37377279, because I always forget the JS way.
const makeBins = max =>
	Array.from(Array(Math.ceil(max)), () => ({ count: 0, players: [] }));

const maxReducer = (max, obj) => (obj.salary > max ? obj.salary : max);
const binTheData = data => {
	const max = data.reduce(maxReducer, 0);
	let bins = makeBins(max / 1000000);

	data.forEach(player => {
		if (player.salary) {
			// Subtract 1 to have bins 0 indexed, round to center around even millions
			const binNum = Math.round(player.salary / 1000000 - 1);
			bins[binNum].count += 1;
			bins[binNum].players.push(player.player);
		}
	});
	return (
		bins
			.map(({ count, players }, i) => {
				return {
					id: '' + i,
					bin0: 1000000 * i + 500000,
					bin1: 1000000 * (i + 1) + 500000,
					count,
					players
				};
			})
			// Remove extra bins
			.filter(bin => bin.count)
	);
};

const ResponsiveHistogram = withParentSize(
	({ parentWidth, parentHeight, ...rest }) => {
		return <Histogram width={parentWidth} height={parentHeight} {...rest} />;
	}
);

const Title = ({ all, removeMin }) => {
	return (
		<Fragment>
			<h2 className="histogram-header">
				{all ? 'All MLB Players' : 'Top 125 Players'} Salary Distribution
			</h2>
			{all &&
				removeMin && <h4 className="histogram-subheader">(non ML min)</h4>}
		</Fragment>
	);
};

const Controls = ({ all, removeMin, toggle, toggleMin }) => {
	return (
		<div className="histogram-controls">
			<div>
				<input onChange={toggle} type="checkbox" value={all} id="view-all" />{' '}
				<label htmlFor="view-all">View All Players</label>
			</div>
			{all && (
				<div>
					<input
						onChange={toggleMin}
						type="checkbox"
						value={removeMin}
						id="remove-min"
					/>{' '}
					<label htmlFor="remove-min">Remove League Minimum Salaries</label>
				</div>
			)}
		</div>
	);
};
class Histo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			all: false,
			removeMin: false
		};
	}
	toggle = () => {
		this.setState({ all: !this.state.all });
	};
	toggleMin = () => {
		this.setState({ removeMin: !this.state.removeMin });
	};
	render() {
		let { sortedData, top125data } = this.props;
		const { all, removeMin } = this.state;
		sortedData = removeMin
			? sortedData.filter(p => p.salary !== 507500)
			: sortedData;

		const data = binTheData(all ? sortedData : top125data);

		return (
			<div className="histogram-wrapper">
				<Title all={all} removeMin={removeMin} />
				<Controls
					all={all}
					removeMin={removeMin}
					toggle={this.toggle}
					toggleMin={this.toggleMin}
				/>
				<div className="histogram">
					<ResponsiveHistogram
						ariaLabel="My histogram of MLB player salaries"
						orientation="vertical"
						binType="numeric"
						// An idea, too ugly for now
						// renderTooltip={({ event, datum, data, color }) => (
						// 	<div>
						// 		<strong style={{ color }}>
						// 			{datum.bin0 / 1000000}
						// 			MM to {datum.bin1 / 1000000}
						// 			MM
						// 		</strong>
						// 		<div>
						// 			<strong>Player Salary Distribution</strong>
						// 			{JSON.stringify(datum.players)}
						// 		</div>
						// 	</div>
						// )}
					>
						<BarSeries animated binnedData={data} />
						<XAxis
							label="Salaries (Millions)"
							tickFormat={tick => {
								const val = tick / 1000000;
								return Math.round(val) === val ? val + 'MM' : val;
							}}
						/>
						<YAxis label="Player Count" />
					</ResponsiveHistogram>
				</div>
			</div>
		);
	}
}

export default Histo;
