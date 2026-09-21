export function validateFirstName(firstName) {

      if (firstName.length < 2) {
            return "Ad bilgisi hatali";
      }

      return "";
}

export function validateLastName(lastName) {

      if (lastName.length < 2) {
            return "Soyad bilgisi hatali";
      }

      return "";
}

export function validateEmail(email) {

      if (!email.includes("@") || !email.includes(".")) {
            return "E-mail bilgisi hatali";
      }

      return "";
}

export function validatePhone(phone) {

      if (!/^[0-9]{10}$/.test(phone)) {
            return "Telefon bilgisi hatali";
      }

      return "";
}

export function validatePassword(pass) {

      if (pass.length < 6) {
            return "Parola bilgisi hatali";
      }

      return "";
}

export function validateRepeatPassword(pass, repeatPass) {

      if (pass !== repeatPass) {
            return "Parolalar eslesmiyor";
      }
      return "";
}

export function validateCheck(check) {

      if (!check) {
            return "Lutfen kutucugu onaylayiniz";
      }

      return "";
}





