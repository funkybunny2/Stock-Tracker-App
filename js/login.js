

// Function to sign up a user
function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        alert("User signed up: " + user.email);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }
  
  // Function to log in a user
  function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        alert("User logged in: " + user.email);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }
  
  // Function to log out a user
  function logout() {
    firebase.auth().signOut()
      .then(() => {
        alert("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  // Get references to HTML elements (existing code, no changes here)

// Event listener for the sign-up button
document.getElementById('signupButton').addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    signUp(email, password);
  });
  
  // Event listener for the login button
  document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
  });
  
  // Event listener for the logout button
  document.getElementById('logoutButton').addEventListener('click', () => {
    logout();
  });