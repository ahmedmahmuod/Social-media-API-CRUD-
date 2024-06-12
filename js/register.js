// Access to register and fetch api and ready to send data
function register() {
    // Access to button send data (Finish)
    let btnFinishData = document.getElementById('send-data');

    btnFinishData.addEventListener('click', async () => {
        // Access to the inputs value        
        let userNameValue = document.getElementById('recipient-username').value;
        let nameValue = document.getElementById('message-Name').value;
        let emailValue = document.getElementById('message-email').value;
        let imgValue = document.getElementById('message-img').files[0];
        let passValue = document.getElementById('message-Password').value;
        let imgPofilePost = document.getElementById('imgPofilePost');

        // Prepare form data for file upload
        let formData = new FormData();
        formData.append("username", userNameValue);
        formData.append("password", passValue);
        formData.append("name", nameValue);
        formData.append("email", emailValue);
        formData.append("image", imgValue);

        try {
            loader(show = true);
            // Send data to API
            let response = await axios.post('https://tarmeezacademy.com/api/v1/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            let result = response.data;

            // Store the token and user in localStorage
            localStorage.setItem('token', result.token); 
            localStorage.setItem('user', JSON.stringify(result.user)); 
            
            // Store the image in localStorage
            let reader = new FileReader();
            reader.onloadend = function() {
                localStorage.setItem('profile_image', reader.result);
                setupUiLogin();
            }
            reader.readAsDataURL(imgValue);



            // Access to login modal to disable
            const modalRegister = document.querySelector('#register-modal');
            const modalInstance = bootstrap.Modal.getInstance(modalRegister);
            modalInstance.hide();
            showIconPost('visible');
            
            // Show success after registering a new user
            showAlertSuccessLogin('New User Register Successfully!', `Hello ${result.user.name}`, 'success');

        } catch (error) {
            if (error.response && error.response.data) {
                // Handle validation errors
                validationRegister(error.response.data.username, error.response.data.email);
                
            }
            showAlertSuccessLogin('Faild to the sign up! !', `${error}`, 'danger');
        } finally {
            loader(show = false);
        }
    });
}
register();
