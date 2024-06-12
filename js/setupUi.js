// Setup UI login and register by localStorage
function setupUiLogin() {
  // Access to token and btns to hide/show
  let token = localStorage.getItem("token");
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logOutBtn = document.getElementById("logOutBtn");

  // Check if token is here
  if (token == null) {
    logOutBtn.style.setProperty("display", "none", "important");
    registerBtn.style.setProperty("display", "block", "important");
    loginBtn.style.setProperty("display", "block", "important");

  } else {
    // Show icon add post
    showIconPost('visible');
    logOutBtn.style.setProperty("display", "block", "important");
    registerBtn.style.setProperty("display", "none", "important");
    loginBtn.style.setProperty("display", "none", "important");

    // Show profile details in the heeader after registertion
    showDetailsProfile();
}}
setupUiLogin();


// // Add post icon
function showIconPost(property) {
  // Access the btn icon to show post
  const btnAddPost = document.querySelector(".add-post-icon");
  if (btnAddPost) {
    btnAddPost.style.setProperty("visibility", `${property}`, "important");
  } else {
    console.error('Element with class "add-post-icon" not found.');
  }
}

// Alert success login!
function showAlertSuccessLogin(message, name, type) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message} ${name}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
        setTimeout(() => {
            wrapper.remove();
        }, 5000);
    };
    appendAlert(message, type);
}


