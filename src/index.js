import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Typography from 'typography';

const typography = new Typography({
	baseFontSize: '18px',
	baseLineHeight: 1.45,
	headerFontFamily: [
		'Avenir Next',
		'Helvetica Neue',
		'Segoe UI',
		'Helvetica',
		'Arial',
		'sans-serif'
	],
	bodyFontFamily: ['Georgia', 'serif']
	// See below for the full list of options.
});

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
