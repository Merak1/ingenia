const form = document.getElementById("form");

const url = "http://ingenia.com/snippets/test/contact.php";

const getDestructuredElementsByIds = document =>
  new Proxy({}, { get: (_, id) => document.getElementById(id) });

const { name, lastName, email, phone, comment } = getDestructuredElementsByIds(
  document
);

name.addEventListener("input", function(event) {
  // isValidEmail = name.checkValidity();

  if (name.validity.valid) {
    // okButton.disabled = false;
    name.setCustomValidity("I am expecting an e-mail address!");
  } else {
    // okButton.disabled = true;
    email.setCustomValidity("");
  }
});

// okButton.addEventListener("click", function(event) {
//   signUpForm.submit();
// });

const validateForm = () => {
  if (name.validity.tooShort) {
    console.log("es valido ");
    // okButton.disabled = false;
    // name.setCustomValidity("I am expecting an e-mail address!");
  } else {
    console.log("no es valido");
    // okButton.disabled = true;
    // email.setCustomValidity("");
  }
  // });
};
// const isValidName = name.checkValidity();
// const isValidLastName = lastName.checkValidity();
// const isValidEmail = email.checkValidity();
// const isValidPhone = phone.checkValidity();
// const isValidComment = comment.checkValidity();
// console.log(isValidEmail, "is valid ocmment");

// const { isValidName,
//   isValidLastName,
//   isValidEmail,
//   isValidPhone,
//   isValidComment, } = this.checkValidity
// };

const sendData = () => {
  let data = new FormData();

  const fullname = name.value + " " + lastName.value;
  data.append("fullname", fullname);
  data.append("email", email.value);
  data.append("phone", phone.value);
  data.append("comment", comment.value);

  console.log(...data);
  axios({
    method: "post",
    url: url,
    data: data,
    headers: { "Content-Type": " multipart/form-data" }
  })
    .then(response => {
      const responseData = response.data;
      console.log(`Succsesfully posted : `, responseData);
    })
    .catch(error => console.error(error));
};
const formEvent = form.addEventListener("submit", event => {
  event.preventDefault();
  validateForm();
});
