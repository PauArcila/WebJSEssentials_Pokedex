window.onload = function () {
	
var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Estadísticas"
	},
	axisX: {
		interval: 1
	},
	axisY: {
		title: "Habilidades",
		scaleBreaks: {
			type: "wavy",
			customBreaks: [{
				startValue: 80,
				endValue: 210
				},
				{
					startValue: 230,
					endValue: 600
				}
		]}
	},
	data: [{
		type: "bar",
		toolTipContent: "<img src=\"https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/\"{url}\"\" style=\"width:40px; height:20px;\"> <b>{label}</b><br>Budget: ${y}bn<br>{gdp}% of GDP",
		dataPoints: [
			{ label: "Australia", y: 24.3, gdp: 2.0, url: "australia.png" },
			{ label: "Japan", y: 46.1, gdp: 1.0, url: "japan.png" },
			{ label: "United Kingdom", y: 48.3, gdp: 1.9, url: "uk.png" },
			{ label: "India", y: 55.9, gdp: 2.5, url: "india.png" },
			{ label: "Russia", y: 69.2, gdp: 5.3, url: "russia.png" },
			{ label: "China", y: 215.7, gdp: 1.9, url: "china.png" },
			{ label: "United States", y: 611.2, gdp: 3.3, url: "us.png" }
		]
	}]
});
chart.render();

}
