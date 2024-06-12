// create post function
function createPost () {
    // Access to the btn send create the post Api
    const btnCreatePost = document.getElementById ('send-data-post');
    btnCreatePost.addEventListener ('click', () => {
        // get values from the post inputs
        const titlePost = document.getElementById ('recipient-title').value || '';
        const imgPost = document.getElementById ('post-img').files[0] || '';
        const token = localStorage.getItem('token');

        // Create form data to api
        let formPostData = new FormData();
        formPostData.append ('body',titlePost);
        formPostData.append ('image',imgPost);

        axios.post('https://tarmeezacademy.com/api/v1/posts', formPostData,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // Access to login modal to disable
            const modalRegister = document.querySelector('#post-modal');
            const modalInstance = bootstrap.Modal.getInstance(modalRegister);
            modalInstance.hide();
            
            // Show alert to success create post in page
            showAlertSuccessLogin('Created Post Successfully!', ``, 'success');
            // reload the page after 2 seceond
            setTimeout(() => {
                location.reload(); 
            },2000)
        })
        .catch((err) => {
            // Access to login modal to disable
            const modalRegister = document.querySelector('#post-modal');
            const modalInstance = bootstrap.Modal.getInstance(modalRegister);
            modalInstance.hide();

            // Show alert to success create post in page
            showAlertSuccessLogin('Created Post Faild!: ', `${err.response.data.message}`, 'danger');

        })
    });
}
createPost();