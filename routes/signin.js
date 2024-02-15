const express = require('express');
const _ = require("lodash")
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const {  validateAuth } = require("../validators")

router.post("", async (req, res)=> {
       const {error, value} = validateAuth(req.body)
       if (error) return res.status(400).send(error.details[0].message)

       let user = await User.findOne({ email: req.body.email})
       if (!user) return res.status(400).send("Invalid") 

       let validPassword = await bcrypt.compare(req.body.password, user.password)
       if (!validPassword) return res.status(400).send("Invalid")

       const token = user.generateAuthToken();
       res.status(200).json({..._.pick(user, ["_id","name","email"]), token});

       // res.header("x-auth-token", token).jsoon({..._.pick(user, ["_id","name","email"]),token});
       // await user.save()  
       // res.send( _.pick(user, ["_id","name", "email"]));
 });




















// const express = require('express');
// const router = express.Router();
// const { User } = require("../models/user");
// const _ = require("lodash");
// const { validateAuth } = require("../validators");
// const bcrypt = require('bcryptjs');



// router.post("", async (req, res)=> {
//     const {error, value} = validateAuth(req.body)
//     if (error) return res.status(400).send(error.details[0].message)  

//     let user = await User.findOne({ email: req.body.email})
//     if ( !user ) return res.status(400).send("Invalid Email")

//     let validPassword = await bcrypt.compare(req.body.password, user.password)
//     if (!validPassword) return res.status(400).send("Invalid password")

//     const token = user.generateAuthToken()
//     res.status(200).json({..._.pick(user, ["_id", "name", 'email']), token})
//     // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", 'email']))
// });

// await user.save()
// const token = jwt.sign(req.body, config.get ("jwtPrivateKey"))
// res.send(token)
    // res.send(_.pick(req.body, ["_id", "name", "email"]))
// });

module.exports = router;