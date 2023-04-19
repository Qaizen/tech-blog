// This function is triggered when the user submits the sign-up form
async function signupFormHandler(event) {
    // Prevent the default behavior of submitting the form
    event.preventDefault();
  
    // Get the values of the username and password fields from the form
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    // Check if the username and password fields are not empty
    if (username && password) {
      // Send a POST request to the server to create a new user with the given username and password
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          password
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Check the response status
      if (response.ok) {
        // If the response is successful, redirect the user to the dashboard page
        document.location.replace("/dashboard");
      } else {
        // Otherwise, show an alert with the status text
        alert(response.statusText);
      }
    }
  }
  
  // Add an event listener to the sign-up form to trigger the signupFormHandler function
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
  