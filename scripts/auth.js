//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({email: adminEmail}).then(result =>{
    console.log(result);
  })
  adminForm.reset();
})

//listen for auth status changes
auth.onAuthStateChanged(user =>{
  if(user){
    console.log('auth');
    user.getIdTokenResult().then(getIdTokenResult => {
      user.admin = getIdTokenResult.claims.admin;
      setUpUI(user);
    })
    console.log('user logged in:', user);
    //get chats and render
    chatroom.getChats(data => chatUI.render(data));
    chatUI.displayButtons()
    
    
    
  }else{
    setUpUI();
    console.log('user logged out', user);
    chatUI.clear();
    chatUI.clearButtons();
  }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const bio = signupForm['signup-bio'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';

  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  
}), err => {
  console.log(err.message) 
};

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {

    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';


  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});