

//sign up
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const signupform = document.getElementById('signup-form');

if (signupform) {
  signupform.addEventListener('submit', (e) => {
      e.preventDefault();  
      if (username && password) {
        fetch('/signup-user', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify({
            username: username.value,
            email : email.value,
            password: password.value,
          })
        })
        .then(res => res.json())
        .then(data => {
          validateData(data);
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Something went wrong. Please try again later.');
        });
      }
  });
}

  const validateData =(data) => {
    if(!data.username){
      alert('Sign Up Failed');
    } else {
      alert('Sign Up Successful');
      location.href = '/home';
    }
  }

