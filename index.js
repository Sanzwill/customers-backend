const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();
app.use(cors());

app.use(express.json());

const newLocal = '/api/Customer';
app.use(newLocal, require('./routes/customer'));

app.get('/', (req, res) => {
	res.json({
		msg: 'TODO OK',
	});
});

app.listen(4000, () => {
	console.log('El servidor esta corriendo perfectamente');
});
