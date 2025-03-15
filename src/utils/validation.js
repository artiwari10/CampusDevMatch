const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateLoginData = (req) => {
  const allowedField = 
  ["firstName","middleName","lastName","age","gender","about","skills","photoUrl"];
  const isValidField =
   Object.keys(req.body).every(field => allowedField.includes(field));

  if(!isValidField){
    throw new Error("Invalid Field");
  }
  else return true;

};
module.exports = {
  validateSignUpData, validateLoginData
};
