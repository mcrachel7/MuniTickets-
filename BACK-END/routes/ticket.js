const { Router } = require('express');
const router = Router();
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

//modules imports
const Ticket = require('../models/ticket');
const verifyToken = require('../routes/index');

//list the created tickets by user
router.get('/view-ticket', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [TICKETS / view-ticket]. ¡Un saludo!");

  const id = req.query.idUser;

   //find all tickets by user and sort them by status
  const allTickets = await Ticket.find({ id_user: id }).lean().sort({ status: 1 });

  if(!allTickets){
      return res.status(404).send('Id user does not exist');
  }
  res.status(201).send(allTickets);
});

//create a new ticket by user
router.post('/new-ticket', verifyToken, async (req, res) =>{
  console.log("\t\t[POST] Front llego al back [TICKETS / new-ticket]. ¡Un saludo!");

  Ticket.init();
  const { idUser, title, description, status, type, FullName, department, adminComment, createdAt } = req.body;
  console.log({ idUser, title, description, status, type, FullName, department, adminComment,  createdAt });

  //create a new ticket object
  const ticket = new Ticket({
      _id: new Types.ObjectId(),
      title: title,
      description: description,
      status: status,
      type: type,
      id_user: idUser,
      FullName: FullName,
      department: department,
      adminComment: adminComment,
      createdAt:createdAt
  });


  await ticket.save();
  const token = jwt.sign({id: ticket._id}, config.secret);
  res.json({auth: true, token});

});

//list the created tickets
router.get('/list-tickets', verifyToken, async(req, res) =>{
  console.log("\t\t[GET] Front llego al back [TICKETS / list-tickets]. ¡Un saludo!");

  try {
    const tickets = await Ticket.find().sort({ status: 1 });
    res.json(tickets)
  } catch (error) {
    console.log.apply(error);
    res.status(500).send('Hubo un error');
  }

});

//edit ticket by status
router.put('/edit-Ticket/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[PUT] Front llego al back [TICKETS / edit-Ticket]. ¡Un saludo!");

  try {
    const { status } = req.body;
    let ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        res.status(404).json({ msg: 'No ticket found' })
    }
    ticket.status = status;
    ticket = await Ticket.findOneAndUpdate({ _id: req.params.id },ticket, { new: true} )
    res.json(ticket);

} catch (error) {
    console.log(error);
    res.status(500).send('There was an error');
}
});

//edit ticket by comment and status
router.put('/update-ticket/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[PUT] Front llego al back [TICKETS / create-Comment]. ¡Un saludo!");

  try {
    const { status, adminComment } = req.body;
    let ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        res.status(404).json({ msg: 'No ticket found' })
    }

    ticket.adminComment = adminComment;
    ticket.status = status;

    ticket = await ticket.save();
    res.json(ticket);

} catch (error) {
    console.log(error);
    res.status(500).send('There was an error');
}
});

//obtain ticket by id
router.get('/obtain-Ticket/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[GET] Front llego al back [TICKETS / obtain-Ticket]. ¡Un saludo!");

  try {
    let ticket = await Ticket.findById(req.params.id);
    if(!ticket) {
        res.status(404).json({ msg: 'No ticket found' })
    }
    res.json(ticket);

} catch (error) {
    console.log(error);
    res.status(500).send('There was an error');
}
});

module.exports = router;
