const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;


app.get("/", (req, res) => {
	let indexPath = __dirname + "/index.html";
	res.sendFile(indexPath);
});

app.listen(PORT, () => {
	console.log(`app up at port ${PORT}`);
});