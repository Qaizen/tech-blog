// Get references to the DOM elements we'll be using
const addPostBtn = document.querySelector('#add-post-btn');
const createPostCard = document.querySelector('#create-post-card');

// This function hides the 'add post' button and shows the 'create post' form when called
function toHide(event) {
  createPostCard.classList.remove('hide');
  addPostBtn.classList.add('hide');
};

// This function handles the submission of the new post form
async function newFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the post title and post body input fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_body = document.querySelector('input[name="post-body"]').value;

  // Send a POST request to the API to create a new post
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // If the response is successful, redirect the user to the dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    // If there was an error, display the error message
    alert(response.statusText);
  }
}

// Add event listeners to the add post button and new post form
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
addPostBtn.addEventListener('click', toHide);
