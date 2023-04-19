// This function is triggered when the user clicks on the delete button
async function deleteFormHandler(event) {
    // Prevent the default behavior of submitting the form
    event.preventDefault();
  
    // Get the ID of the post from the URL
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // Send a DELETE request to the server to delete the post with the given ID
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  
    // If the response is successful, redirect the user to the dashboard page
    if (response.ok) {
      document.location.replace('/dashboard');
    } 
    // Otherwise, show an alert with the status text
    else {
      alert(response.statusText);
    }
  }
  
  // Add an event listener to the delete button to trigger the deleteFormHandler function
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  