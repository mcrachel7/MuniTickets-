const { Router } = require('express');
const router = Router();
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

//modules imports
const verifyToken = require('../routes/index');
const Inventory = require('../models/inventory.js');

//lists all the inventory created by user
router.get('/view-inventory', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [INVENTORY / view-inventory]. ¡Un saludo!");

  const id = req.query.idUser;
  const allInventory = await Inventory.find({ id_user: id }).lean();

  if(!allInventory){
      return res.status(404).send('Id user does not exist');
  }
  res.status(201).send(allInventory);
});

//lists all the inventory created
router.get('/list-inventory', verifyToken, async(req, res) =>{
  console.log("\t\t[GET] Front llego al back [INVENTORY / list-inventory]. ¡Un saludo!");

  try {
    const allInventory = await Inventory.find().lean();
    res.json(allInventory)
  } catch (error) {
    console.log.apply(error);
    res.status(500).send('Hubo un error');
  }

})

//create a new inventory by user
router.post('/new-inventory', verifyToken, async (req, res) =>{
  console.log("\t\t[POST] Front llego al back [INVENTORY / new-inventory]. ¡Un saludo!");

  Inventory.init();
  const { idUser, BackUpDocumentType, BackUpDate, BackUpInventoryNumber, InvoiceDescription,
    SerialNumber, Color, Department, PhoneNumber, Floor, Building, ValuationDocumentType, DocumentNumber,
    DocumentDate, UnitPrice, OwnerNoId, OwnerName, Status, Observations, createdAt } = req.body;
  console.log({ idUser, BackUpDocumentType, BackUpDate, BackUpInventoryNumber, InvoiceDescription,
    SerialNumber, Color, Department, PhoneNumber, Floor, Building, ValuationDocumentType, DocumentNumber,
    DocumentDate, UnitPrice, OwnerNoId, OwnerName, Status, Observations, createdAt });

    //create a new inventory object
  const inventory = new Inventory({
      _id: new Types.ObjectId(),
      id_user: idUser,
      BackUpDocumentType: BackUpDocumentType,
      BackUpDate:BackUpDate,
      BackUpInventoryNumber:BackUpInventoryNumber,
      InvoiceDescription:InvoiceDescription,
      SerialNumber:SerialNumber,
      Color:Color,
      Department:Department,
      PhoneNumber:PhoneNumber,
      Floor:Floor,
      Building:Building,
      ValuationDocumentType:ValuationDocumentType,
      DocumentNumber:DocumentNumber,
      DocumentDate:DocumentDate,
      UnitPrice:UnitPrice,
      OwnerNoId:OwnerNoId,
      OwnerName:OwnerName,
      Status:Status,
      Observations:Observations,
      createdAt:createdAt
  });

  await inventory.save();
  const token = jwt.sign({id: inventory._id}, config.secret);
  res.json({auth: true, token});
});

//edit inventory by user
router.put('/update-inventory/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[PUT] Front llego al back [INVENTORY / update-inventory]. ¡Un saludo!");

  try {
    const { BackUpDocumentType, BackUpDate, BackUpInventoryNumber, InvoiceDescription,
      SerialNumber, Color, Department, PhoneNumber, Floor, Building, ValuationDocumentType, DocumentNumber,
      DocumentDate, UnitPrice, OwnerNoId, OwnerName, Status, Observations } = req.body;
    let inventory = await Inventory.findById(req.params.id);

    if(!inventory) {
        res.status(404).json({ msg: 'No inventory found' })
    }

    inventory.BackUpDocumentType = BackUpDocumentType;
    inventory.BackUpDate = BackUpDate;
    inventory.BackUpInventoryNumber = BackUpInventoryNumber;
    inventory.InvoiceDescription = InvoiceDescription;
    inventory.SerialNumber = SerialNumber;
    inventory.Color = Color ;
    inventory.Department = Department;
    inventory.PhoneNumber = PhoneNumber;
    inventory.Floor = Floor;
    inventory.Building = Building;
    inventory.ValuationDocumentType = ValuationDocumentType;
    inventory.DocumentNumber = DocumentNumber;
    inventory.DocumentDate = DocumentDate;
    inventory.UnitPrice = UnitPrice;
    inventory.OwnerNoId = OwnerNoId;
    inventory.OwnerName = OwnerName;
    inventory.Status = Status;
    inventory.Observations = Observations;

    inventory= await inventory.save();
    res.json(inventory);

} catch (error) {
    console.log(error);
    res.status(500).send('There was an error');
}
});


router.delete('/delete-inventory/:id', verifyToken, async (req, res) => {
  console.log("\t\t[DELETE] Front llego al back [INVENTORY / delete-inventory]. ¡Un saludo!");
  try {
    const inventoryIdToDelete = req.params.id;
    const deletedInventory = await Inventory.findByIdAndDelete(inventoryIdToDelete);

    if (!deletedInventory) {
      return res.status(404).json({ msg: 'Inventory item not found' });
    }
    res.status(200).json({ msg: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

//obtain inventory by id
router.get('/obtain-Inventory/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[GET] Front llego al back [INVENTORY / obtain-Inventory]. ¡Un saludo!");

  try {
    let inventory = await Inventory.findById(req.params.id);
    if(!inventory) {
        res.status(404).json({ msg: 'No Inventory found' })
    }
    res.json(inventory);

} catch (error) {
    console.log(error);
    res.status(500).send('There was an error');
}
});

module.exports = router;
