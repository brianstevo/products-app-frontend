const express = require("express");
const path = require('path');


const app = express();

app.use(express.static('./dist/products-app-frontend'));
app.get('/*', (request, response)=> {
    response.sendFile(path.join(__dirname, '/dist/products-app-frontend/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});