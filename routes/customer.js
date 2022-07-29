const express = require('express');
const multer = require('multer');
const {
	createCustomer,
	getCustomers,
	getCustomerById,
	updateCustomer,
	deleteCustomer,
	uploadImagen,
	getImage,
} = require('../controllers/customersControllers');
const router = express.Router();

// Multer config and save in format image
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', createCustomer);
router.get('/get-customers', getCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

router.post('/upload', upload.single('file'), uploadImagen);
router.get('/get-image/:id', getImage);

module.exports = router;
