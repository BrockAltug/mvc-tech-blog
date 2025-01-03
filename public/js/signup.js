const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard'); // Redirect to dashboard after successful signup
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to sign up.');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);