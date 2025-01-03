const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard after successful login
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to log in.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    }
  } else {
    alert('Please fill out both fields.');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);