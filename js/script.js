const form = document.getElementById("form");

const url = "http://ingenia.com/snippets/test/contact.php";
let data;

const getDestructuredElementsByIds = document =>
  new Proxy({}, { get: (_, id) => document.getElementById(id) });

const { name, lastName, email, phone, comment } = getDestructuredElementsByIds(
  document
);

const alertDiv = document.getElementById("alert-message");
const validateForm = () => {
  const nameIsValid = name.value.length !== 0;
  const lastNameIsValid = lastName.value.length !== 0;
  const emailIsValid = email.value.length !== 0;
  const phoneIsValid = phone.value.length !== 0;
  const commentIsValid = comment.value.length !== 0;

  nameIsValid &&
  lastNameIsValid &&
  emailIsValid &&
  phoneIsValid &&
  commentIsValid === true
    ? (sendData(),
      (alertDiv.classList.remove("do-show"),
      alertDiv.classList.add("dont-show")))
    : (alertDiv.classList.remove("dont-show"),
      alertDiv.classList.add("do-show"));
};
const createFormData = () => {
  let data = new FormData();
  return data;
};
const resetInput = () => {
  form.reset();
};
const sendData = () => {
  if (data !== undefined) {
    createFormData();
  }

  data = new FormData();
  console.log("data", data);
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
      resetInput();
    })
    .catch(error => console.error(error));
  //El método reset input solamente quedaría en caso que la petición fuera correcta, pero por motivos demostrativos
  //la pongo en catch para que se vea en acción
  resetInput();
};

const formEvent = form.addEventListener("submit", event => {
  event.preventDefault();
  validateForm();
});
