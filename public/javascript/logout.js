// This function sends a POST request to log the user out
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      // If the response is successful, redirect the user to the home page
      document.location.replace('/');
    } else {
      // Otherwise, show an alert with the status text
      alert(response.statusText);
    }
  }
  
// This function resets the timer for idling after a user performs an action
function resetTimer() {
    let time;
    clearTimeout(time);
    // Set a new timer for 30 minutes (in milliseconds)
    time = setTimeout(logout, (1000 * 60 *30));
};

// This function listens for idle user activity and resets the timer accordingly
function idleTimer() {
    window.onmousemove = resetTimer;
    window.onclick = resetTimer;
    window.onscroll = resetTimer;
    window.onkeypress = resetTimer;
}

// Start the idle timer
idleTimer();

// Add an event listener to the logout button to trigger the logout function
document.querySelector('#logout').addEventListener('click', logout);
