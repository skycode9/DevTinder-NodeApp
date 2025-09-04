const validator = require("validator");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid Firstname and LastName");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email Id " + emailId);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Enter a strong password and Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 number, and 1 special characte"
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "about",
    "skills",
    "gender",
    "photoUrl",
  ];

  const isUpdateAllowed = Object.keys(req.body).every((fields) =>
    allowedUpdates.includes(fields)
  );
  return isUpdateAllowed;
};

const validateOldPassword = async (req) => {
  const { oldPassword } = req.body;
  const loggedInUser = req.user;
  const isOldPasswordValid = await bcrypt.compare(
    oldPassword,
    loggedInUser.password
  );
  return isOldPasswordValid;
};

const validateNewPasswordData = (req) => {
  const { newPassword, confirmedPassword, oldPassword } = req.body;
  if (!newPassword || !confirmedPassword || !oldPassword) {
    throw new Error("Enter a valid data");
  } else if (newPassword != confirmedPassword) {
    throw new Error("Your new password is not matched with confirmed password");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "Enter a strong password and Password must be at least 8 characters long and include: 1 uppercase, 1 lowercase, 1 number, and 1 special characte"
    );
  }
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateOldPassword,
  validateNewPasswordData,
};
