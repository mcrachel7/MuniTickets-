const { Router } = require('express');
const router = Router();

//modules imports
const Ticket = require('../models/ticket');
const FAQ = require('../models/FAQ')
const Inventory = require('../models/inventory.js');
const verifyToken = require('../routes/index');

//counts all tickets and shows it on the DASHBOARD
router.get('/Quantity', verifyToken, async (req, res) => {
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Quantity]. ¡Un saludo!");
  const allTickets = await Ticket.find().count();

  res.status(201).json(allTickets);
});

//counts all tickets with opened status and shows it on the DASHBOARD
router.get('/Opened-Tickets', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Opened-Tickets]. ¡Un saludo!");
  const allOpenedTickets = await Ticket.find({status: {$in: ['Abierto']}}).count();
    res.status(201).json(allOpenedTickets);
});

//counts all tickets with closed status and shows it on the DASHBOARD
router.get('/Closed-Tickets', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Closed-Tickets]. ¡Un saludo!");
  const allClosedTickets = await Ticket.find({status: {$in: ['Cerrado']}}).count();
    res.status(201).json(allClosedTickets);
});

//counts all tickets created by month and shows it on the DASHBOARD
router.get('/ByMonth-Tickets', verifyToken, async (req, res) => {
  console.log("\t\t[GET] Front llego al back [DASHBOARD / ByMonth-Tickets]. ¡Un saludo!");
  try {

    //define an array of all months
    const allMonths = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    //add the data about the number of tickets created each month
    const ticketsByMonth = await Ticket.aggregate([
      {
        $group: {
          _id: {
            $month: {
              $dateFromString: {
                dateString: "$createdAt"
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: {
            $let: {
              vars: {
                months: allMonths
              },
              in: {
                $arrayElemAt: ['$$months', { $subtract: ['$_id', 1] }]
              }
            }
          },
          count: 1
        }
      }
    ]);

    //find months with no tickets.
    const monthsWithNoTickets = allMonths.filter(month => !ticketsByMonth.some(item => item.month === month));

    //combine data for months with no tickets and the added data
    const ticketsByMonthWithEmpty = ticketsByMonth.concat(
      monthsWithNoTickets.map(month => ({ month, count: 0 }))
    );

    //sort the data by month in the correct order
    ticketsByMonthWithEmpty.sort((a, b) => allMonths.indexOf(a.month) - allMonths.indexOf(b.month));
    res.json(ticketsByMonthWithEmpty);
  } catch (error) {
    console.error(error);
  }
});

//counts all tickets created by type and shows it on the DASHBOARD
router.get('/Type-Tickets', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Type-Tickets]. ¡Un saludo!");
  try {

    //define an array with all the ticket types
    const allTypes = ['Impresora', 'Computadora', 'Periféricos', 'Carnet', 'Otros'];

    //add the data to count tickets by their type
    const ticketsByType = await Ticket.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    //create a result array containing ticket counts for each type
    const result = allTypes.map(type => {
      const ticketType = ticketsByType.find(ticket => ticket._id === type);
      return { _id: type, count: ticketType ? ticketType.count : 0 };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
  }

});

//counts all tickets by user and shows it on the DASHBOARD
router.get('/Ticket-Quantity', verifyToken, async( req, res) => {
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Ticket-Quantity]. ¡Un saludo!");

  const id= req.query.idUser;
  const allTickets = await Ticket.find({id_user: id}).count();

  res.status(201).json(allTickets);

});

//counts all the opened tickets by user and shows it on the DASHBOARD
router.get('/User-OpenedTickets', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / User-OpenedTickets]. ¡Un saludo!");
  const id= req.query.idUser;
  const allOpenedTickets = await Ticket.find({status: {$in: ['Abierto']}, id_user: id}).count();

    res.status(201).json(allOpenedTickets);
});

//counts all the closed tickets by user and shows it on the DASHBOARD
router.get('/User-ClosedTickets', verifyToken, async (req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / User-ClosedTickets]. ¡Un saludo!");
  const id= req.query.idUser;
  const allClosedTickets = await Ticket.find({status: {$in: ['Cerrado']}, id_user: id}).count();

    res.status(201).json(allClosedTickets);
});

//counts all the inventory by user and shows it on the DASHBOARD
router.get('/Inventory-Quantity', verifyToken, async (req, res) => {
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Inventory-Quantity]. ¡Un saludo!");

  const id = req.query.idUser;
  const allInventory = await Inventory.find({ id_user: id}).count();

  res.status(201).json(allInventory);
});

//shows the last three created FAQs on the DASHBOARD
router.get('/Dashboard-FAQ', verifyToken, async(req, res) =>{
  console.log("\t\t[GET] Front llego al back [DASHBOARD / Dashboard-FAQ]. ¡Un saludo!");

  try {

    //retrieve the last 3 FAQs sorted by creation date
    const last3FAQs = await FAQ.find()
      .sort({ createdAt: -1 })
      .limit(3);

    if (last3FAQs.length === 0) {
      return res.status(404).json('No FAQs found');
    }

    res.status(200).json(last3FAQs);
  } catch (error) {
    console.log(error);
    res.status(500).json('Server error');
  }

});



module.exports = router;












