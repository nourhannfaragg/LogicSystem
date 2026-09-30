const signupSection = document.getElementById("signupSection");
const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");
const welcomeText = document.getElementById("welcomeText");

function showSignup() {
  signupSection.classList.remove("hidden");
  loginSection.classList.add("hidden");
  homeSection.classList.add("hidden");
}

function showLogin() {
  signupSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  homeSection.classList.add("hidden");
}

function showHome(user) {
  signupSection.classList.add("hidden");
  loginSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
  welcomeText.innerText = `Welcome, ${user.name}!`;
}

function registerUser() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(user => user.email === email)) {
    alert("Email already registered");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  showLogin();
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    showHome(user);
  } else {
    alert("Invalid email or password");
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  showLogin();
}

window.onload = function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    showHome(currentUser);
  } else {
    showSignup();
  }
};

