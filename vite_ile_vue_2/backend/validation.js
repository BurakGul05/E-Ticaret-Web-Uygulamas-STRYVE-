function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z]+$/.test(name);
}

function validateSurname(surname) {
    return surname.length >= 2 && /^[a-zA-Z]+$/.test(surname);
}

function validateTel(tel) {
    return /^[0-9]{10}$/.test(tel);
}


module.exports = {
    validateEmail,
    validateName,
    validateSurname,
    validateTel
};