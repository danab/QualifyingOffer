import React from 'react';

const Loading = () => {
	return (
		<div id="wrapper">
			<h1>Predicting the Qualifying Offer</h1>
			<h2 className="loader">
				Loading
				<span className="pulse">...</span>
			</h2>
		</div>
	);
};

export default Loading;
