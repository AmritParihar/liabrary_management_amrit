const express = require('express');
const router = require('./Route/Route'); 


const app = express();
app.use(express.json()); 

app.use(router); // Use the router

const PORT = process.env.PORT || 3000;
const SERVER = process.env.SERVER || 'http://localhost:'; 

app.listen(PORT, () => {
    console.log(`Server running at ${SERVER}${PORT}`);
});
