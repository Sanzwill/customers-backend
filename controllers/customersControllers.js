const Customer = require('../models/Customer');
const fs = require('fs-extra');
const { nanoid } = require('nanoid');

exports.getCustomers = async (req, res) => {
	try {
		const customers = await Customer.find({}, {}, { sort: { _id: -1 } });
		res.status(202).json(customers);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			message: 'Ocurrio un error',
		});
	}
};

exports.createCustomer = async (req, res) => {
	try {
		const newCustomer = new Customer(req.body);
		const customer = await newCustomer.save();

		res.status(202).json(customer);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			message: 'Ocurrio un error',
		});
	}
};

exports.updateCustomer = async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);

		if (!customer) {
			return res.status(404).json({ msg: 'No existe persona' });
		}

		const customerUpdated = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);

		res.json(customerUpdated);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Hubo un error');
	}
};

exports.getCustomerById = async (req, res) => {
	try {
		console.log(req.params.id);
		const customer = await Customer.findById(req.params.id);

		if (!customer) {
			return res.status(404).json({ msg: 'No existe el cliente' });
		}

		return res.json(customer);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			message: 'Ocurrio un error',
		});
	}
};

exports.deleteCustomer = async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);

		if (!customer) {
			return res.status(404).json({ msg: 'No existe el cliente' });
		}

		if (customer.foto) {
			const path = `./uploads/${customer.foto}`;
			await fs.unlink(path);
		}

		await Customer.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Cliente eliminado' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Ocurrio un error',
		});
	}
};

exports.uploadImagen = async (req, res) => {
	try {
		const { customerId } = req.query;

		const customer = await Customer.findById(customerId);
		if (!customer) {
			return res.status(404).json({ msg: 'No existe el cliente' });
		}

		if (customer.foto) {
			const path = `./uploads/${customer.foto}`;
			await fs.unlink(path);
		}
		// Obtenemos el buffer de la imagen
		const image = req.file.buffer;
		// Obtenemos la extensión de la imagen
		const ext = req.file.originalname.split('.')[1];
		// Creamos un nombre para la imagen
		const name = `${nanoid(10)}.${ext}`;
		// Creamos el path para la imagen
		const path = `./uploads/${name}`;

		await fs.writeFile(path, image);

		const customerUpdated = await Customer.findByIdAndUpdate(
			customerId,
			{
				$set: {
					foto: name,
				},
			},
			{ new: true }
		);

		res.json(customerUpdated);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Hubo un error');
	}
};

exports.getImage = async (req, res) => {
	try {
		const { id } = req.params;
		const path = `./uploads/${id}`;

		const imageBuffer = await fs.readFile(path);

		const ext = req.params.id.split('.')[1];

		res.type(`image/${ext}`);
		res.send(imageBuffer);
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};
