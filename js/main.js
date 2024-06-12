let counter = 1;
let isPostDetailsPage = false;

// Function to get global posts
async function getGlobalPosts(countPage) {
    if (isPostDetailsPage) return; // إيقاف تحميل البوستات إذا كان في صفحة التفاصيل

    try {
        loader(show = true);
        let response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${countPage}`);
        let posts = response.data.data;
        let allPosts = document.querySelector('.posts');

        if (allPosts) {
            for (const post of posts) {
                let idPost = post.id;
                let userName = post.author.username;
                let userImg = post.author.profile_image || '../path/to/default-image.png'; // صورة افتراضية
                let userTitlePost = post.body;
                let postImg = post.image;
                let commentCount = post.comments_count;
                let createdAt = post.created_at;

                let createPost = document.createElement('div');
                createPost.classList.add('card', 'my-5', 'text-light', 'rounded', 'shadow-lg');
                createPost.innerHTML = `
                    <div class="card-header">
                        <div class="left">
                            <span class="elementId" id="${idPost}"></span>
                            <img id="imgPofilePost" class="rounded-circle border border-3" src="${userImg}" width="40px" height="40px">
                            <span class="userN"><b>${userName}</b></span>
                        </div>
                        <div class="details">
                            <button data-bs-toggle="modal" data-bs-target="#post-modal-update" class="shadow editPost">Edit</button>
                            <button class="shadow btn btn-primary delete-post-btn" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">Delete</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-title">${userTitlePost}</p>
                        <img src="${postImg}" class="img-post">
                        <h6 class="mt-2">${createdAt}</h6>
                        <hr>
                        <div>
                            <span class="d-flex">
                                <span class="material-symbols-outlined">edit</span>
                                <span class="countComment">
                                    ${commentCount} Comment
                                </span>
                            </span>
                        </div>
                    </div>`;

                allPosts.appendChild(createPost);
            }
            // تحديث `postDetails` هنا بعد إضافة البوستات الجديدة
            postDetails();
        } else {
            console.error('Element with class "posts" not found.');
            return;
        }
        loader(show = false);
        
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
    profile();
    // profileClicked();
    postEdit();
}

// Initial call to getGlobalPosts
getGlobalPosts(counter);

// Show details in header after register
function showDetailsProfile() {
    const detailsHeaderP = document.querySelector("#profile-header .user-name");
    const detailsHeaderImg = document.querySelector("#profile-header .user-img");
    const detailsHeader = document.getElementById("profile-header");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user != null) {
        detailsHeader.style.setProperty('display', 'flex', 'important');
        detailsHeaderP.textContent = user.username;
        detailsHeaderImg.src = user.profile_image;
    }
}

// Pagination and loading content posts 
window.addEventListener('scroll', function scrollingPage() {
    if (isPostDetailsPage) return; // إيقاف الpagination إذا كان في صفحة التفاصيل

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
        counter++;
        getGlobalPosts(counter);  
        loader(show = false);
    }
})

function postDetails() {
    let postClick = document.querySelectorAll('.card-body');
    postClick.forEach((post, id) => {
        post.addEventListener('click', async() => {
            // الحصول على جميع البوستات المخزنة في DOM
            let allPosts = document.querySelectorAll('.card');
            let currentPost = allPosts[id];

            if (currentPost) {
                // جلب معلومات البوست من DOM
                let idComment = currentPost.querySelector('.card-header .elementId').id;
                let userName = currentPost.querySelector('.card-header span b').innerText;
                let userImg = currentPost.querySelector('.card-header img').src;
                let userTitlePost = currentPost.querySelector('.card-body p').innerText;
                let postImg = currentPost.querySelector('.card-body img').src;
                let createdAt = currentPost.querySelector('.card-body h6').innerText;
                let commentCount = currentPost.querySelector('.card-body .d-flex .countComment').innerText;
                
                let currentPostData = {
                    author: {   
                        username: userName,
                        profile_image: userImg
                    },
                    id: idComment,
                    body: userTitlePost,
                    image: postImg,
                    created_at: createdAt,
                    comments_count: commentCount
                };

                sessionStorage.setItem('selectedPost', JSON.stringify(currentPostData));
                isPostDetailsPage = true;
                window.open(`../Pages/post-details.html?postId=${id}`, '_self');
            } else {
                console.error('Post not found:', index);
            }
        });
    });
}

async function loadPostDetails() {
    document.addEventListener('DOMContentLoaded', async() => {
        let postDetailsParent = document.getElementById('posts-details');
        let currentPost = JSON.parse(sessionStorage.getItem('selectedPost'));

        if (currentPost) {
            let postId = currentPost.id;
            let postTitleD = currentPost.body;
            let userNameD = currentPost.author.username;
            let nameD = currentPost.author.name;
            let userImgD = currentPost.author.profile_image || '../images/profile-img-defult.png'; // صورة افتراضية
            let postImgD = currentPost.image;
            let createdAtD = currentPost.created_at;
            let commentCountD = currentPost.comments_count;

            let textTest = `
                <h1 class="headPostDetails mt-5"><span>${userNameD}'</span> Post</h1>
                <div class="post my-4 text-light rounded shadow-lg">
                    <div class="card-header mb-3">
                        <div class = "left">
                            <img id="imgPofilePost" class="rounded-circle border border-3" src="${userImgD}" width="40px" height="40px"/>
                            <span">@<b>${userNameD}</b></span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-title">${postTitleD}</p>
                        <img src="${postImgD}" class="img-post" />
                        <h6 class="mt-2">${createdAtD}</h6>
                        <hr />
                        <div>
                            <span class="d-flex">
                                <span class="material-symbols-outlined">edit</span>
                                ${commentCountD}
                            </span>
                            <div class="comments">
                                <div class="all-comments">
                                
                                </div>
                                <div class="create-comment mt-4 d-flex justify-content-between gap-2">
                                    <input id="type-comment" type="text" class="col-10">
                                    <button id="add-comment" class="col-2 bg-primary">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            postDetailsParent.innerHTML = textTest;

            // Show the comments
            try {
                loader(show = true);
                const commentsData = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`);
                const comments = commentsData.data.data.comments;
                loader(show = false);
                

                // through loop on all comments 
                for (const comment of comments) {
                    // Access to the comment parent 
                    let allComments = document.querySelector ('.all-comments');

                    // access comment data to fill  
                    let userComment = comment.author.username;
                    let userCommentImg = comment.author.profile_image;
                    let userBodyComment = comment.body;
                                        
                    let newComment = `
                            <div class ="comment">
                                <div class= "head-comment mb-2">
                                    <img class = "rounded-circle border border-3" src ="${userCommentImg}" width="40px" height="40px">
                                    <span class ="userComment">${userComment} </span>
                                </div>
                                    <div class= "body-comment mt-2 flex-nowrap">
                                        ${userBodyComment}
                                    </div>
                                </div>
                            </div>`
                    allComments.innerHTML += newComment;
            }} catch (error) {
            console.error('Error fetching comments:', error);
            }

            // Create commeent by api
            try {
                // Access to send data comment btn
                let sendCommentBtn = document.getElementById ('add-comment');
                sendCommentBtn.addEventListener ('click', async() => {
                    loader(show = true);
                    // Access to the value input comment
                    let commentBody = document.getElementById ('type-comment').value;
                    if (!(commentBody == '' || commentBody == null) || commentBody == ' ') {
                        let getTocenAuth = localStorage.getItem ('token');
                        if (getTocenAuth) {
                            await axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,{"body": `${commentBody}`},{headers: {"Accept": "application/json","Authorization": `Bearer ${getTocenAuth}`}});
                                showAlertSuccessLogin('Comment Added Successfully', `${commentBody}`, 'success');
                                setTimeout (() => {
                                    location.reload();
                                },2000);
                                loader(show = false);

                            } else {
                                showAlertSuccessLogin('Please Login Before Commented !', ``, 'danger');
                        }
                    }
                })
            } catch (error) {
                console.log(`faild to create comment ${error}`);
            }

        } else {
            postDetailsParent.innerHTML = '<p>No post details found.</p>';
        }
    });
}

if (window.location.pathname.includes('post-details.html')) {
    isPostDetailsPage = true;
    loadPostDetails();
}

// Post edit and delet and another future... 
function postEdit() {
    // Access to the user From the localstorage 
    let getUserFromLocal = JSON.parse(localStorage.getItem('user')).username;
    let postCard = document.querySelectorAll('.card');
    
    postCard.forEach( function (p) {
        if (localStorage.getItem('token')) {
            // Get user name from post user
            let post = p.querySelector('.userN b').textContent;
            if (post == getUserFromLocal) {

                // Access to the button edit and delete if the condition is success!
                let editBtn = p.querySelector('.editPost');
                editBtn.style.display = 'block';
                
                // Get values from data post
                let thisId = p.querySelector('.elementId').id;
                let titlePostToPut = p.querySelector('.card-title').textContent;
                let imgPostToPut = p.querySelector('.img-post').src;
                                
                // Edit Posts by button
                // Event listener to open the modal and fill the form with existing data
                editBtn.addEventListener('click', async () => {
                    // Set data form values post to create post modal
                    document.getElementById('recipient-title-update').value = titlePostToPut;
                    
                    // Check if the element exists before setting the src
                    let currentPostImg = document.getElementById('current-post-img');
                    if (currentPostImg) {
                        currentPostImg.src = imgPostToPut; // Display current image
                    }
                    update(thisId);
                });
                
                async function update(thisId) {
                    let updatePostBtn = document.getElementById('send-update-post');
                    updatePostBtn.addEventListener('click', async () => {
                        loader(show = true);

                        try {
                            // Create form data to api
                            // Get updated values from the form
                            let updateTitle = document.getElementById('recipient-title-update').value;
                            let updateImg = document.getElementById('post-img-update').files[0]; // Get the new image file
                            let getToken = localStorage.getItem('token');

                            // Optionally, update the post on the page without reloading
                            p.querySelector('.card-title').textContent = updateTitle;
                            if (updateImg) {
                                p.querySelector('.img-post').src = URL.createObjectURL(updateImg);
                            }
                        
                            // set form api values
                            let formPostData = new FormData();
                            formPostData.append('body', updateTitle);
                            if (updateImg) {
                                formPostData.append('image', updateImg); // Append new image only if it's selected
                            }
                            formPostData.append('_method','put')
                            // Send Data by api 
                            let response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${thisId}`, formPostData, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${getToken}`
                                }
                            });
                            
                            if (response.status === 200) {
                                // Show alert to success create post in page
                                showAlertSuccessLogin('Post Updated Successfully!', '', 'success');
                
                                // Close the modal after update
                                const modalRegister = document.querySelector('#post-modal-update');
                                const modalInstance = bootstrap.Modal.getInstance(modalRegister);
                                modalInstance.hide();
                                loader(show = false);

                
                            } else {
                                showAlertSuccessLogin('Failed to update post!', '', 'danger');
                                console.log('Failed to update post:', response);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            }
        }
    });

    // Delete Posts by button
    // Access to the delete button Modal
    async function deletePost() {
        let getToken = localStorage.getItem('token');
        postCard.forEach((p) => {
            if (getToken) {
                let post = p.querySelector('.userN b').textContent;
    
                if (post === getUserFromLocal) {
                    let deleteBtnModal = document.querySelector('#exampleModalDelete #deletePost');
                    let thisId = p.querySelector('.elementId').id;
                    let deleteBtn = p.querySelector('.delete-post-btn');
                    deleteBtn.style.display = 'block';
    
                    deleteBtn.addEventListener('click', () => {
                        deleteBtnModal.addEventListener('click', async () => {
                            try {
                                loader(show = true);
                                let deleteRequest = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${thisId}`, {
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                        'Authorization': `Bearer ${getToken}`
                                    }
                                });
                                
                                // Close the modal after update
                                const modalRegister = document.querySelector('#exampleModalDelete');
                                const modalInstance = bootstrap.Modal.getInstance(modalRegister);
                                modalInstance.hide();

                                // Show alert to success create post in page
                                showAlertSuccessLogin('Post Deleted Successfully!', '', 'success');
                                setTimeout (() => {
                                    location.reload();
                                },2000);
                                loader(show = false);
                                
                            } catch (error) {
                                console.log(error);
                            }

                        }, { once: true });
                    }, { once: true });
                }
            }
        });
    }
    deletePost();
}

// Loader 
function loader(show = true) {
    if (show) {
        document.getElementById ('loader').style.visibility = 'visible';
    } else {
        document.getElementById ('loader').style.visibility = 'hidden';
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", showDetailsProfile);

