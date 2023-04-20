// This function is triggered when the user submits the edit post form
async function editFormHandler(event) {
    // Prevent the default behavior of submitting the form
    event.preventDefault();
  
    // Get the values of the title and post_body fields from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-content"]').value;

  
    // Get the ID of the post from the URL
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // Send a PUT request to the server to update the post with the given ID
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
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
  
  // Add an event listener to the edit post form to trigger the editFormHandler function
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  