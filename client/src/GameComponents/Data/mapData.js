//Skrevet av Jørgen
const mapData= [
	{
		"id":1,
		"name": "World Map",
		"type": "",
		"minimumLevel": 0,
		"img": "/map.png"
	},
	{
		"id":2,
		"isDungeon": false,
		"name": "Pleasantville",
		"type": "Town",
		"img": "/mapBottomRight.png"
	},
	{
		"id":3,
		"isDungeon": true,
		"name": "Bandit Settlement",
		"type": "Settlement",
		"minimumLevel": 15,
		"img": "/mapBottomLeft.png"
	},
	{
		"id":4,
		"isDungeon": true,
		"name": "The Goblin Tombs",
		"type": "Tomb",
		"minimumLevel": 35,
		"img": "/mapTopRight.png"
	},
	{
		"id":5,
		"isDungeon": true,
		"name": "Castle of Boletaria",
		"type": "Castle",
		"minimumLevel": 60,
		"img": "/mapTopLeft.png"
	},
]

export default mapData