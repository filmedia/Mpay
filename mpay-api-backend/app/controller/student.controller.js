
const {Student,Account} = require('../model/user.model.js');
const fetch=require('node-fetch')
const {generate_username}=require('../utils/helpers')
var bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.create = async(req, res) => {	
	const defaultAvatar=req.body.sexe=="M" 
	?"https://firebasestorage.googleapis.com/v0/b/projectx-98867.appspot.com/o/mpay_users%2Fstudent-male-96.png?alt=media&token=4f3e6528-1535-471f-878d-a9cb5845e4a7"
	:"https://firebasestorage.googleapis.com/v0/b/projectx-98867.appspot.com/o/mpay_users%2Fstudent-female.png?alt=media&token=2670f916-6648-4cfe-8d01-e76d847ba3c4"
	
	await Student.create({  
	  ...req.body,"photoUrl":defaultAvatar
	 }).then(user => {
		Account.update({"user_type":"student"}, 
			{ where: {id: user.accountId} }
			).then(() => {
			
			});
		res.send(user);
	});

};


exports.findAll=(req,res)=>{
  
  return  Student.findAll()
  .then(user=>{
        res.send(user)
    })
}

exports.show=(req,res)=>{
   return Student.findByPk(req.params.id).then(user => {
		res.send(user);
	})
}

exports.update = (req, res) => {
	const id = req.params.id;
	
	return Student.update({...req.body}, 
	{ where: {id: req.params.id} }
	).then(() => {
	res.status(200).send("updated successfully a customer with id = " + id);
	});
};

exports.findByUserKey = (req, res) => {
	return Student.findOne({ where: {accountId: req.params.userId} }
	).then((user) => {

	res.send(user);
	});
};

 


// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Student.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a customer with id = ' + id);
	});
};