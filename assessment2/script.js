// Access DOM elements
const button = document.getElementById("fetchUserBtn");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const profilePic = document.getElementById("profilePic");

// Fetch random user on button click
button.addEventListener("click", function () {

    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];

            nameEl.textContent = "Name: " + user.name.first + " " + user.name.last;
            emailEl.textContent = "Email: " + user.email;
            profilePic.src = user.picture.medium;
            profilePic.alt = "User Profile Picture";
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });

});
