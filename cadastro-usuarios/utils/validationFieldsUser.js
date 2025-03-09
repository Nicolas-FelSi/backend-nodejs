const UserValidation = require("./UserValidation");

function validationUser(name, email, password) {
    const errors = [];

    const nameValidation = UserValidation.nameIsValid(name);

    if (nameValidation.error) {
        errors.push(UserValidation.nameIsValid(name).error);
    }

    const emailValidation = UserValidation.emailIsValid(email);

    if (emailValidation.error) {
        errors.push(UserValidation.emailIsValid(email).error);
    }

    const passwordValidation = UserValidation.passwordIsValid(password);
    
    if (passwordValidation.error) {
        errors.push(UserValidation.passwordIsValid(password).error);
    }

    return errors;
}

module.exports = validationUser;

