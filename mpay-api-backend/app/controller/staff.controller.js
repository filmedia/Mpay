
const {Staff} = require('../model/user.model.js');
const fetch=require('node-fetch')
const {generate_username}=require('../utils/helpers')
var bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.create = async(req, res) => {	
	
	await Staff.create({  
	  ...req.body,
	 }).then(user => {
		res.send(user);
	});
};


exports.findAll=(req,res)=>{
  
  return  Staff.findAll()
  .then(user=>{
        res.send(user)
    })
}

exports.show=(req,res)=>{
   return Staff.findByPk(req.params.id).then(user => {
		res.send(user);
	})
}

exports.update = (req, res) => {
	const id = req.params.id;
	
	return Staff.update({...req.body}, 
	{ where: {id: req.params.id} }
	).then(() => {
	res.status(200).send("updated successfully a customer with id = " + id);
	});
};


 


// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Staff.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a customer with id = ' + id);
	});
};