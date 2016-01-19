requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'libs/jquery.min',
		'react': 'libs/react.min',
		'react-dom': 'libs/react-dom.min',
	}
});

require(['react', 'react-dom'], function(React, ReactDOM) {
	// Main application
	var App = React.createClass({
		getInitialState: function() {
			return {
				title: 'Template application'
			}
		},
		render: function() {
			return (
				<div>
					<h1>{this.state.title}</h1>
				</div>
			);
		}
	});
	
	// Render in main element
	ReactDOM.render(
		<App />,
		document.getElementById('main')
	);
});