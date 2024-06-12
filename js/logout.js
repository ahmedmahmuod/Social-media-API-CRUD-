// function => if clicked on logout => remove localstorage to reset ui
function logOut() {
    // access to buttons
    const logOutBtn = document.getElementById('logOutBtn');
    const logInBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    logOutBtn.addEventListener('click', () => {
        // clear local storage keys
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profile_image');
        
        // hide logout button
        logOutBtn.style.setProperty('display', "none", "important");
        
        // show login and register buttons
        logInBtn.style.setProperty('display', "block", "important");
        registerBtn.style.setProperty('display', "block", "important");
        
        // Remove profile details 
        const detailsHeader = document.querySelector('#profile-header');
        detailsHeader.style.setProperty('display', 'none', 'important');
        
        const detailsHeaderP = document.querySelector('#profile-header .user-name');
        const detailsHeaderImg = document.querySelector('#profile-header .user-img');
        detailsHeaderP.textContent = '';
        detailsHeaderImg.src = '';

        // Hide the btn icon add post from page
        showIconPost('hidden');
        
        // Remove post details of current user login
        let editBtn = document.querySelector('.editPost');
        let deleteBtn = document.querySelector('.delete-post-btn');
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
        
    });
}
logOut();
