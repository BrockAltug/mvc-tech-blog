const deletePostHandler = async (event) => {
    if (event.target.classList.contains('delete-post')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard after post deletion
      } else {
        alert('Failed to delete post.');
      }
    }
  };
  
  document
    .querySelector('.post-list')
    .addEventListener('click', deletePostHandler);