// This is an asynchronous function for handling the login form submission when the user clicks on the submit button.
async function loginFormHandler(event) {
    event.preventDefault(); // This method stops the form from submitting and refreshing the page.
  
    // These two variables store the username and password entered by the user after trimming any whitespace.
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    // This condition checks whether the username and password fields are not empty.
    if (username && password) {
  
      // This is an HTTP POST request that sends the username and password data in the form of a JSON object to the '/api/users/login' endpoint.
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      // This condition checks whether the HTTP response is OK or not.
      if (response.ok) {
        document.location.replace("/dashboard"); // If the response is OK, then the user is redirected to the dashboard page.
      } else {
        alert(response.statusText); // If the response is not OK, then an alert is displayed with the error status message.
      }
    }
  }
  
  // This adds an event listener to the login form submit button, which will trigger the loginFormHandler function when clicked.
  document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
  