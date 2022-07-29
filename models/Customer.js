const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
	cedula: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	apellido: {
		type: String,
		required: true,
	},
	interes: {
		type: String,
	},
	comentario: {
		type: String,
	},
	foto: {
		type: String,
	},
});

module.exports = model('Customer', customerSchema);
