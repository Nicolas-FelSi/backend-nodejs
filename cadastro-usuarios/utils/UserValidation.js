class UserValidation {
    nameIsValid(name) {
        if (name.length < 3) {
            return { error: "O nome precisa ter mais que 2 caracteres." };
        }

        return true;
    }

    emailIsValid(email) {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

        if (!regex.test(email)) {
           return { error: "E-mail em formato incorreto." };
        }

        return true;
    }

    passwordIsValid(password) {
        if (password.length < 6) {
            return { error: "A senha precisa ter mais que 5 caracteres." };
        }

        return true;
    }
}

module.exports = new UserValidation();