const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard after post creation
      } else {
        alert('Failed to create post.');
      }
    } else {
      alert('Please fill out both the title and content fields.');
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);