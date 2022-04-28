const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const setUpUI = (user) => {
  if (user) {
    //check if admin
    if (user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc =>{
      const html = `
      <div> Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class='pink-text'>${user.admin ? 'Admin' : ''}</div>
    `;
      accountDetails.innerHTML = html;
    
    })
    
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');

  }else{
    //hide admin features
    adminItems.forEach(item => item.style.display = 'none');

    //hide account info
    accountDetails.innerHTML = '';

    //toggle UI elements
    loggedInLinks.forEach(item=> item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');

  }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });


 