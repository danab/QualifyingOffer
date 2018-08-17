import React from 'react';

// Of course this is fragile...
const detangleName = name => {
	const [last, first] = name.split(', ');
	return `${first} ${last}`;
};
const sumPlayers = (sum, curr) => (curr.salary ? sum + curr.salary : sum);
const Copy = ({ sortedData, top125data }) => {
	const topSumSalaries = top125data.reduce(sumPlayers, 0);
	const qo = Math.round((topSumSalaries / 125) * 100) / 100;
	const sumSalaries = sortedData.reduce(sumPlayers, 0);

	const percent = Math.round((topSumSalaries / sumSalaries) * 1000) / 10;
	const playerPercent = Math.round((125 / sortedData.length) * 1000) / 10;

	const topPlayer = top125data[0];
	const bottomPlayer = top125data[124];
	const medianPlayer = top125data[62];

	return (
		<div>
			<h1>Predicting the Qualifying Offer</h1>
			<div>
				<p>
					According to the <em>latest</em> 2016 data, the qualifying offer will
					be <strong>${qo.toLocaleString()}</strong> in 2017.
				</p>
				<p>
					The top 125 contracts ranged from{' '}
					<strong>${bottomPlayer.salary.toLocaleString()}</strong> to{' '}
					<strong>{topPlayer.salary.toLocaleString()}</strong>.{' '}
					<strong>{detangleName(topPlayer.player)}</strong> had the largest
					contract of 2016.
				</p>
				<p>
					Of these top salaries, the median was{' '}
					<strong>{detangleName(medianPlayer.player)} </strong> with a salary of{' '}
					<strong>${medianPlayer.salary.toLocaleString()}</strong>.
				</p>
				<p>
					<strong>${topSumSalaries.toLocaleString()}</strong> in salaries went
					to the 125 highest paid players, which means <em>{percent}%</em> of
					MLB salaries went to <em>{playerPercent}%</em> of players.
				</p>
			</div>
		</div>
	);
};

export default Copy;
