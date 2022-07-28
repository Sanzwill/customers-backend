const express = require("express");
const {
  actualizarCustomer,
  crearCustomer,
  eliminarCustomer,
  findCustomer,
  obtenerCustomer,
} = require("../controllers/customersControllers");
const router = express.Router();

// router.post('/', ()=>{
//     console.log('coneccion')
// });
router.post("/", crearCustomer,);
router.get("/", findCustomer,);
router.get("/:id",obtenerCustomer,);
router.put("/:id", actualizarCustomer,);
router.delete("/:id", eliminarCustomer);

module.exports = router;
