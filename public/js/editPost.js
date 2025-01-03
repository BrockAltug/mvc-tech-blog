const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const postId = window.location.pathname.split('/').pop(); // Extract post ID from URL
    const errorMessage = document.querySelector('#error-message');
  
    if (title && content) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard'); // Redirect to dashboard after successful update
        } else {
          const errorData = await response.json();
          errorMessage.textContent = errorData.message || 'Failed to update post. Please try again.';
          errorMessage.classList.remove('d-none');
        }
      } catch (err) {
        console.error(err);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.classList.remove('d-none');
      }
    } else {
      errorMessage.textContent = 'Please fill out both the title and content fields.';
      errorMessage.classList.remove('d-none');
    }
  };
  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostHandler);