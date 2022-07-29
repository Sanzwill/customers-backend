const Customer = require('../models/Customer');

const fs = 'fs-extra';

exports.findCustomer = async (req, res) => {
	try {
		const customers = await Customer.find();

		return res.status(202).json({
			ok: true,
			message: '',
			customers,
		});
	} catch (error) {
		console.log(error);
		x;
		return res.status(500).json({
			ok: false,
			message: 'Ocurrio un error',
		});
	}
};
exports.crearCustomer = async (req, res) => {
	try {
		const newCustomer = new Customer(req.body);
		console.log(newCustomer);
		await newCustomer.save();

		return res.status(202).json({
			ok: true,
			message: 'Customer guardado',
			customer: newCustomer,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			message: 'Ocurrio un error',
		});
	}
};

exports.obtenerCustomer = async (req, res) => {
	try {
		const customer = await Customer.find();
		res.json(customer);
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.actualizarCustomer = async (req, res) => {
	try {
		const { foto, cedula, nombre, apellido, interes, comentario } = req.body;
		let customer = await Customer.findById(req.params.id);

		if (!customer) {
			res.status(404).json({ msg: 'No existe persona' });
		}
		customer.foto = foto;
		customer.cedula = cedula;
		customer.nombre = nombre;
		customer.apellido = apellido;
		customer.interes = interes;
		customer.comentario = comentario;

		customer = await Customer.findOneAndUpdate({ _id: req.params.id }, customer, { new: true });
		res.json(customer);
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.obtenerCustomer = async (req, res) => {
	try {
		let customers = await Customer.findById(req.params.id);

		if (!customers) {
			res.status(404).json({ msg: 'No existe persona' });
		}

		res.json(customers);
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.eliminarCustomer = async (req, res) => {
	try {
		let customers = await Customer.findById(req.params.id);

		if (!customers) {
			res.status(404).json({ msg: 'No existe persona' });
		}

		await Customer.findOneAndRemove({ _id: req.params.id });
		res.json({ msg: 'se ha eliminado ' });
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}

	const photoCustomer = {
		async getImagen(req, res) {
			const type = req.params.type;
			const imagen = req.params.type;
			const pathImagen = path.resolve(__dirname, '../../${type}/{imagen}');
			if (await fs.existsSync(pathImagen)) {
				res.sendFile(pathImagen);
			} else {
				const pathImagen = path.resolve(__dirname, '../../uploads/no-imagen.png');
				res.sendFile(pathNoImagen);
			}
		},
	};
};
