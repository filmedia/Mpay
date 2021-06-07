const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const {sequelize}=require('../config/db.config.js')
const {getCountPost}=require('../utils/helpers')
const generateUniqueId = require('generate-unique-id');
const fetch=require('node-fetch')
var bcrypt = require("bcrypt");
class Account extends Model {}

Account.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  telephone:{
    type:DataTypes.STRING,
    unique:true
  },
  accountKey:{
    type: DataTypes.STRING,
    defaultValue:bcrypt.hashSync(generateUniqueId({
      length:8,
      useLetters: false,
      excludeSymbols: ['@','#','|','-','_'],
    }),8),
    unique: true
  },
  password: {
    type: DataTypes.STRING,
  },
  logout_at:{
      type:DataTypes.DATE,
  },
  user_type:{
    type:DataTypes.STRING,
    defaultValue:'none',
  },
  status:{
    type:DataTypes.STRING,
    defaultValue: 'logged'
}
},{
  sequelize, 
  updatedAt:false,
  modelName: 'Account',
  
});


 class  Student extends Model{}
 Student.init({
  accountId:{
    type: DataTypes.UUID,
    references: {
      model: 'accounts', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
   }

  },
  studentId: {
    type: DataTypes.STRING,
    unique:true
  },
  firstname:{
    type: DataTypes.STRING,
  },
  lastname:{
    type: DataTypes.STRING,
  },
  sexe:{
    type:DataTypes.CHAR(1),
    validate:{
      isIn: [['M', 'F','f','m']]
    }
  },
  photoUrl:{
    type: DataTypes.TEXT,
  },
  telephone:{
    type: DataTypes.STRING,
  },
  email:{
    type: DataTypes.STRING,
    unique:true,
    validate:{
      isEmail: true,
    }
  },
  address:{
    type: DataTypes.TEXT,
  },
  option: {
    type: DataTypes.STRING,
  },
  level:{
    type:DataTypes.STRING
  },
  vacation: {
    type: DataTypes.STRING,
  },
},{
  createdAt: false,
  sequelize, 
  modelName: 'Student'
});


class  Staff extends Model{}
Staff.init({
  accountId:{
    type: DataTypes.UUID,
    references: {
      model: 'accounts', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
   }

  },
  firstname:{
    type: DataTypes.STRING,
  },
  lastname:{
    type: DataTypes.STRING,
  },
  sexe:{
    type:DataTypes.CHAR(1),
  },
  photoUrl:{
    type: DataTypes.TEXT,
  },
  telephone:{
    type: DataTypes.STRING,
  },
  email:{
    type: DataTypes.STRING,
    unique:true,
    validate:{
      isEmail: true,
    }
  },
  address:{
    type: DataTypes.TEXT,
  },
  status:{
    type: DataTypes.STRING,
  }
},{
  createdAt: false,
  sequelize, 
  modelName: 'Staff'
});








module.exports={Account,Student,Staff};