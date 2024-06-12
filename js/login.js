// Get data from user
function getUserAndPass() {
    // Access to inputs value
    let userNinput = document.querySelector('.username-Input');
    let passInput = document.querySelector('.password-Input');
    let btnLogin = document.querySelector('.modal-footer .btn-login');

    // If clicked on btn login => get Data from user
    btnLogin.addEventListener('click', function() {
        let userNameV = userNinput.value;
        let passInputV = passInput.value;
        
        // check and validation values before login
        if (userNameV !== '' && userNameV !== null && passInputV !== '' && passInputV !== null) {
            loader(show = true);
            axios.post('https://tarmeezacademy.com/api/v1/login', {
                username: userNameV,
                password: passInputV
            }, {
                headers: {
                    'Accept': 'application/json',
                }
            }).then((response) => {
                // Store value token and user in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('profile_image', JSON.stringify(response.data.user.profile_image));

                // Access to login modal to disable
                const modalLogin = document.querySelector('#login-modal');
                const modalInstance = bootstrap.Modal.getInstance(modalLogin);
                modalInstance.hide();
                // Show alert success login
                showAlertSuccessLogin('Login Successfully!', `Hello ${userNameV}`, 'success');
                removeModalBackdrop();
                setTimeout (() => {
                    location.reload();
                },1000);
    
                postEdit();
                
            }).catch(() => {
                validationLogin();
            });
        }
        loader(show = false);
    });
}
getUserAndPass();



// Check user name and password correct or incorrect!
function validationLogin() {
    const errorLoginMsg = document.getElementById('password-error');
    errorLoginMsg.textContent = 'Username and password is incorrect, try again!';
}

