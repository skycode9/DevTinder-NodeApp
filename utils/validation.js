const validator = require("validator");
const validateSignUpData = (req) => {
  console.log(req.body);

  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    console.log("sjj");

    throw new Error("Enter a valid Firstname and LastName");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email Id " + emailId);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Enter a strong password and Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 number, and 1 special characte"
    );
  }
};

module.exports = { validateSignUpData };
