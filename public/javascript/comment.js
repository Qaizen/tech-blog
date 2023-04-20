

// This function is triggered when the user submits the comment form
async function commentFormHandler(event) {
  // Prevent the default behavior of submitting the form
  event.preventDefault();

  // Get the ID of the post from the URL
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Get the value of the comment input field
  const commentText = document.querySelector('#comment-text').value.trim();

  // If the comment text is not empty, send a POST request to the server to create a new comment
  if (commentText) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        comment_text: commentText
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // If the response is successful, reload the page to display the new comment
    if (response.ok) {
      document.location.reload();
    } 
    // Otherwise, show an alert with the status text
    else {
      alert(response.statusText);
    }
  }
}

// Add an event listener to the comment form submit button to trigger the commentFormHandler function
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

