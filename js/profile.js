// Function to handle profile interactions
function profile() {
    let posts = document.querySelectorAll('.card');
    
    posts.forEach((post, id) => {
        let userN = post.querySelector('.userN');

        userN.addEventListener('click', () => {
            let currentPost = posts[id];
            if (currentPost) {
                let userId = currentPost.querySelector('.card-header .elementId').id;
                let userName = currentPost.querySelector('.card-header span b').innerText;
                let userImg = currentPost.querySelector('.card-header img').src;

                // Create an object to store user details
                let userDetails = {
                    user_id: userId,
                    username: userName,
                    profile_image: userImg
                };

                // Save user details to sessionStorage
                sessionStorage.setItem('userDetails', JSON.stringify(userDetails));

                window.open(`../Pages/profile.html?userId=${userId}`, '_self');
            } else {
                console.error('Post not found:', id);
            }
        });
    });
}

// // Profile clicked in navbar
// function profileClicked () {
//     // Get data user logged from localStorage 
//     let getDataUser = JSON.parse(localStorage.getItem('user'));
//     // id
//     let idProfile = getDataUser.id;
//     // username
//     let userProfileName = getDataUser.username;
//     // img Profile
//     let imgProfile = getDataUser.profile_image;

//     // Create an object to store user details
//     let userDetails = {
//         user_id: idProfile,
//         username: userProfileName,
//         profile_image: imgProfile
//     };
    
//     // access to the btn click my profile
//     let profileLink = document.querySelector('.my-profile-link');
//     profileLink.addEventListener('click', () => {
//         // Save user details to sessionStorage
//         sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
//         window.open(`../Pages/profile.html?userId=${idProfile}`, '_blank');
//     });
// }

// Function to load profile details
async function loadProfileDetails() {
    document.addEventListener('DOMContentLoaded', async () => {
        let postDetailsParent = document.querySelector('.all-posts-user');
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        if (userDetails) {
            let postId = Number(userDetails.user_id);
            
            try {
                // Get user by post ID stored in sessionStorage
                const getUserByIdPost = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`);


                // Get the user ID from the post
                let userId = getUserByIdPost.data.data.author.id;
                
                // Get all posts to find the user by ID
                const postsResponse = await axios.get(`https://tarmeezacademy.com/api/v1/posts`);
                let allPosts = postsResponse.data.data;

                for (const post of allPosts) {
                    if (userId == post.author.id) {
                        
                        // Get user details (posts and comments count)
                        const userId2 = await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`);
                        let allPostsCount = userId2.data.data.posts_count;
                        let allCommentsCount = userId2.data.data.comments_count;

                        // Extract user profile details
                        let userProfileName = post.author.name;
                        let userName = post.author.username;
                        let userProfileEmail = post.author.email;
                        let userProfileImg = post.author.profile_image;
                        let userPostImg = post.image;

                        // Update profile image
                        let imgProfileUser = document.querySelector('.imgProfileUser');
                        if (imgProfileUser) {
                            imgProfileUser.src = userProfileImg;
                        }

                        // Update username
                        let usernameElement = document.querySelector('.username');
                        if (usernameElement) {
                            usernameElement.textContent = userName;
                        }

                        // Update name
                        let nameElement = document.querySelector('.name');
                        if (nameElement) {
                            nameElement.textContent = userProfileName;
                        }

                        // Update email
                        let emailElement = document.querySelector('.email');
                        if (emailElement) {
                            emailElement.textContent = userProfileEmail;
                        }

                        // Update posts count
                        let postsCountElement = document.querySelector('.posts-count span');
                        if (postsCountElement) {
                            postsCountElement.textContent = allPostsCount;
                        }

                        // Update comments count
                        let commentsCountElement = document.querySelector('.comments-count span');
                        if (commentsCountElement) {
                            commentsCountElement.textContent = allCommentsCount;
                        }

                        // Append user posts to the page
                        if (postDetailsParent) {
                            let postHtml = `
                                <h1 class= "mt-5">${userName} Post's</h1>
                                <div class="post post-profile my-4 text-light rounded shadow-lg">
                                    <div class="card-header mb-3">
                                        <div class="left">
                                            <span class="elementId" id="${post.id}"></span>
                                            <img id="imgPofilePost" class="rounded-circle border border-3" src="${userProfileImg}" width="40px" height="40px"/>
                                            <span class="userN">@<b>${userName}</b></span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-title">${post.body}</p>
                                        <img src="${userPostImg}" class="img-post" />
                                        <h6 class="mt-2">${post.created_at}</h6>
                                        <hr/>
                                        <span class="d-flex">
                                            <span class="material-symbols-outlined">edit</span>
                                            ${post.comments_count}
                                        </span>
                                    </div>
                                </div>`;
                            postDetailsParent.innerHTML += postHtml;
                        }
                        loader(show = false);
                    }
                }
                
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        } else {
            if (postDetailsParent) {
                postDetailsParent.innerHTML = '<p>No user details found.</p>';
            } else {
                console.error('Element with class "all-posts-user" not found.');
            }
        }
    });
}

loadProfileDetails();

// async function waitForElement(selector) {
//     return new Promise(resolve => {
//         if (document.querySelector(selector)) {
//             return resolve(document.querySelector(selector));
//         }

//         const observer = new MutationObserver(mutations => {
//             if (document.querySelector(selector)) {
//                 resolve(document.querySelector(selector));
//                 observer.disconnect();
//             }
//         });

//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     });
// }



// // Post edit and delet and another future... 
// function postEdit() {
//     // Access to the user From the localstorage 
//     let getUserFromLocal = JSON.parse(localStorage.getItem('user')).username;
//     let postCard = document.querySelectorAll('.all-posts-user .post-profile');
    
//     postCard.forEach( function (p) {
//         if (localStorage.getItem('token')) {
//             // Get user name from post user
//             let post = p.querySelector('.userN b').textContent;
//             if (post == getUserFromLocal) {

//                 // Access to the button edit and delete if the condition is success!
//                 let editBtn = p.querySelector('.editPost');
//                 editBtn.style.display = 'block';
                
//                 // Get values from data post
//                 let thisId = p.querySelector('.elementId').id;
//                 let titlePostToPut = p.querySelector('.card-title').textContent;
//                 let imgPostToPut = p.querySelector('.img-post').src;
                                
//                 // Edit Posts by button
//                 // Event listener to open the modal and fill the form with existing data
//                 editBtn.addEventListener('click', async () => {
//                     // Set data form values post to create post modal
//                     document.getElementById('recipient-title-update').value = titlePostToPut;
                    
//                     // Check if the element exists before setting the src
//                     let currentPostImg = document.getElementById('current-post-img');
//                     if (currentPostImg) {
//                         currentPostImg.src = imgPostToPut; // Display current image
                        
//                     }
//                     update(thisId);
//                 });
                
//                 async function update(thisId) {
//                     let updatePostBtn = document.getElementById('send-update-post');
//                     updatePostBtn.addEventListener('click', async () => {
//                         try {
//                             // Create form data to api
//                             // Get updated values from the form
//                             let updateTitle = document.getElementById('recipient-title-update').value;
//                             let updateImg = document.getElementById('post-img-update').files[0]; // Get the new image file
//                             let getToken = localStorage.getItem('token');

//                             // Optionally, update the post on the page without reloading
//                             p.querySelector('.card-title').textContent = updateTitle;
//                             if (updateImg) {
//                                 p.querySelector('.img-post').src = URL.createObjectURL(updateImg);
//                             }
                        
//                             // set form api values
//                             let formPostData = new FormData();
//                             formPostData.append('body', updateTitle);
//                             if (updateImg) {
//                                 formPostData.append('image', updateImg); // Append new image only if it's selected
//                             }
//                             formPostData.append('_method','put')
                
//                             // Send Data by api 
//                             let response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${thisId}`, formPostData, {
//                                 headers: {
//                                     'Accept': 'application/json',
//                                     'Content-Type': 'multipart/form-data',
//                                     'Authorization': `Bearer ${getToken}`
//                                 }
//                             });

//                             if (response.status === 200) {
//                                 // Show alert to success create post in page
//                                 showAlertSuccessLogin('Post Updated Successfully!', '', 'success');
                
//                                 // Close the modal after update
//                                 const modalRegister = document.querySelector('#post-modal-update');
//                                 const modalInstance = bootstrap.Modal.getInstance(modalRegister);
//                                 modalInstance.hide();

                
//                             } else {
//                                 showAlertSuccessLogin('Failed to update post!', '', 'danger');
//                                 console.log('Failed to update post:', response);
//                             }
//                         } catch (err) {
//                             console.log(err);
//                         }
//                     });
//                 }
//             }
//         }
//     });

// //     // Delete Posts by button
// //     // Access to the delete button Modal
// //     async function deletePost() {
// //         let getToken = localStorage.getItem('token');
// //         postCard.forEach((p) => {
// //             if (getToken) {
// //                 let post = p.querySelector('.userN b').textContent;
    
// //                 if (post == getUserFromLocal) {
// //                     let deleteBtnModal = document.querySelector('#exampleModalDelete #deletePost');
// //                     let thisId = p.querySelector('.elementId').id;
// //                     let deleteBtn = p.querySelector('.delete-post-btn');
// //                     deleteBtn.style.display = 'block';
    
// //                     deleteBtn.addEventListener('click', () => {
// //                         deleteBtnModal.addEventListener('click', async () => {
// //                             try {
// //                                 let deleteRequest = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${thisId}`, {
// //                                     headers: {
// //                                         'Accept': 'application/json',
// //                                         'Content-Type': 'multipart/form-data',
// //                                         'Authorization': `Bearer ${getToken}`
// //                                     }
// //                                 });

// //                                 // Close the modal after update
// //                                 const modalRegister = document.querySelector('#exampleModalDelete');
// //                                 const modalInstance = bootstrap.Modal.getInstance(modalRegister);
// //                                 modalInstance.hide();

// //                                 // Show alert to success create post in page
// //                                 showAlertSuccessLogin('Post Deleted Successfully!', '', 'success');
// //                                 setTimeout (() => {
// //                                     location.reload();
// //                                 },2000);
                                
// //                             } catch (error) {
// //                                 console.log(error);
// //                             }

// //                         }, { once: true });
// //                     }, { once: true });
// //                 }
// //             }
// //         });
// //     }
// }