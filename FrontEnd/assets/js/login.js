const form = document.querySelector(".login-form");

function submitBtn(event) {
  event.preventDefault();
  const formData = {
    email: form.email.value,
    password: form.password.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid email or password");
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid email or password");
    });
}

form.addEventListener("submit", submitBtn);
