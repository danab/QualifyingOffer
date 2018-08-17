import React from 'react';

import 'react-table/react-table.css';
import ReactTable from 'react-table';

const defaultSortMethod = (a, b, desc) => {
	if (typeof a === 'object') {
		a = a.salary;
		b = b.salary;
	}
	// force null and undefined to the bottom
	a = a === null || a === undefined ? '' : a;
	b = b === null || b === undefined ? '' : b;
	// force any string values to lowercase
	a = typeof a === 'string' ? a.toLowerCase() : a;
	b = typeof b === 'string' ? b.toLowerCase() : b;
	// Return either 1 or -1 to indicate a sort priority
	if (a > b) {
		return 1;
	}
	if (a < b) {
		return -1;
	}
	// returning 0, undefined or any falsey value will use subsequent sorts or
	// the index as a tiebreaker
	return 0;
};
const columns = [
	{
		Header: 'Name',
		accessor: 'player',
		filterMethod: (filter, row) => {
			return row.player.indexOf(filter.value) !== -1;
		}
	},
	{
		Header: 'Salary',
		accessor: d => d,
		id: 'salary',
		Cell: ({ value: { salary, top125 } }) => {
			return !salary ? (
				<span> No Data Available</span>
			) : (
				<span>
					${salary.toLocaleString()}
					{top125 ? '*' : ''}
				</span>
			);
		},
		filterMethod: (filter, row) => {
			if (!row.salary.salary) {
				return false;
			}
			// Require it to begin with the filter value
			const filterValue = filter.value.replace(/\$|,/g, '');
			return ('' + row.salary.salary).indexOf(filterValue) === 0;
		}
	}
];

const Table = ({ sortedData }) => {
	return (
		<div>
			<h2>Complete Data</h2>

			<ReactTable
				defaultSorted={[{ id: 'salary', desc: true }]}
				filterable
				filterMethod={() => console.log(arguments)}
				data={sortedData}
				columns={columns}
				defaultSortMethod={defaultSortMethod}
			/>
			<div>
				<p>
					<em> * denotes salary included in top 125 </em>
				</p>
			</div>
		</div>
	);
};

export default Table;
