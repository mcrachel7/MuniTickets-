const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const fs = require('fs-extra');

//modules imports
const FAQ = require('../models/FAQ');
const verifyToken = require('../routes/index');
const config = require('../config/secret');
const uploadImage = require('../config/cloudinary');

//show all the created FAQs
router.get('/list-FAQ', verifyToken, async(req, res) =>{
  console.log("\t\t[GET] Front llego al back [FAQ / list-FAQ]. ¡Un saludo!");

  try {
    const FAQs = await FAQ.find();
    res.json(FAQs)
  } catch (error) {
    console.log.apply(error);
    res.status(500).send('Hubo un error');
  }

});

//create a new FAQs
router.post('/new-FAQ', verifyToken, async (req, res) =>{
  console.log("\t\t[POST] Front llego al back [FAQ / new-FAQ]. ¡Un saludo!");

  FAQ.init();
  const { title, description,type,createdAt } = req.body;
  console.log({ title, description, type, createdAt });

  //create a new FAQ object
  const FAQs = new FAQ({
      _id: new Types.ObjectId(),
      title: title,
      description: description,
      type: type,
      createdAt:createdAt
  });

  //handle image upload if it is present in the request files
  if (req.files?.image) {

    //upload the image and get the result
    const result = await uploadImage(req.files.image.tempFilePath);

    //assign the image URL to the FAQ object
    FAQs.image = result.secure_url;

    //delete the temporary image file
    await fs.unlink(req.files.image.tempFilePath);
  }

  await FAQs.save();
  const token = jwt.sign({id: FAQs._id}, config.secret);
  res.json({auth: true, token});
});

//obtain the specific FAQ by id
router.get('/obtain-FAQs/:id', verifyToken, async(req, res)=>{
  console.log("\t\t[GET] Front llego al back [FAQ / obtain-FAQs]. ¡Un saludo!");

  try {

    const faq = await FAQ.findById(req.params.id);
    if(!faq) {
        res.status(404).json({ msg: 'No existe el FAQ' })
    }

    const faqWithImageURL = { ...faq._doc };
    res.json(faqWithImageURL);

} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}
});



module.exports = router;
