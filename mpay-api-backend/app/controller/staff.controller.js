
const {Staff,Account} = require('../model/user.model.js');
const fetch=require('node-fetch')
const {generate_username}=require('../utils/helpers')
var bcrypt = require("bcrypt");
const { Op } = require("sequelize");


exports.create = async(req, res) => {	
	const defaultAvatar=req.body.sexe=="M" 
	?"https://firebasestorage.googleapis.com/v0/b/projectx-98867.appspot.com/o/mpay_users%2Fmanager-96.png?alt=media&token=c5662ba1-f3fd-48ec-b6c9-1bdf49c22b92"
	:"https://firebasestorage.googleapis.com/v0/b/projectx-98867.appspot.com/o/mpay_users%2Fwoman-profile-96.png?alt=media&token=82e01630-0038-4b56-b8c3-9311f1d92b65"
	
	await Staff.create({  
	  ...req.body,"photoUrl":defaultAvatar
	 }).then(user => {
		Account.update({"user_type":"staff"}, 
			{ where: {id: user.accountId} }
			).then(() => {
			
			});
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

exports.findByUserKey = (req, res) => {
	return Staff.findAll({ where: {accountId: req.params.userId} }
	).then((user) => {
	res.status(200).send(user);
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