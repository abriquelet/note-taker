// packages
const path = require('path');
const app = express();
//port
const PORT = 3004;
//route variables
const apiRoute = require('Develop\routes\apiRoute.js');
const htmlRoute = require('Develop\routes\htmlRoute.js');
//middleware 
app.use(express.static('public'));

//routes

//listen() to check for incoming connections using the port you specified prior. 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


