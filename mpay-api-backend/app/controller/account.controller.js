
const {Account} = require('../model/user.model.js');
const fetch=require('node-fetch')
const {generate_username}=require('../utils/helpers')
var bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.createUser = async(req, res) => {	
	try {
		
		await Account.create({  
		  ...req.body,"password":req.body.password,
		 }).then(user => {
			res.send(user);
		}).catch(e=>res.send('bobo'));
	} catch (error) {
		res.send(error)
		console.error(error);
	}
};

exports.testLogin=(req,res)=>{
	
	
	const login=JSON.parse(req.params.login)
	 Account.findAll(
	{ 
		where: {
			[Op.and]: [{ telephone: login.telephone }, { password: login.password }],  
		}
	 }
	)
	.then((user) => {
	  res.send(user);
	});
}
exports.findAll=(req,res)=>{
  
  return  Account.findAll()
  .then(user=>{
        res.send(user)
    })
}

exports.show=(req,res)=>{
   return Account.findByPk(req.params.id).then(user => {
		res.send(user);
	})
}

exports.update = (req, res) => {
	const id = req.params.id;
	
	return Account.update({...req.body}, 
	{ where: {id: req.params.id} }
	).then(() => {
	res.status(200).send("updated successfully a customer with id = " + id);
	});
};

exports.findByPhone=(req,res)=>{
	return Account.findAll({where:{"telephone":req.params.tel}}).then(user => {
		 res.send(user);
	 })
 }

 exports.login=(req,res)=>{
	const id = req.params.id;
	
	return Account.update({"status":"logged"}, 
	{ where: {id: req.params.id} }
	).then(() => {
	res.status(200).send("updated successfully a customer with id = " + id);
	});
 }

 exports.logout=(req,res)=>{
	const id = req.params.id;
	
	return Account.update({"status":"logout","logout_at":new Date().getTime()}, 
	{ where: {id: req.params.id} }
	).then(() => {
	res.status(200).send("updated successfully a customer with id = " + id);
	});
 }


// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Account.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a customer with id = ' + id);
	});
};