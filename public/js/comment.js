const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value;
  
    if (comment) {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ comment, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload(); // Reload the page to display the new comment
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to add comment.');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please write a comment before submitting.');
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);