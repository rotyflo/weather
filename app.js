require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const indexFile = __dirname + "/index.html";
const cssFolder = __dirname + "/css";
const jsFolder = __dirname + "/js";

app.use("/css", express.static(cssFolder));
app.use("/js", express.static(jsFolder));

app.get("/", (req, res) => {
	res.sendFile(indexFile);
});

app.listen(PORT, () => {
	console.log(`app up at port ${PORT}`);
});