function showNotification(message, duration) {
        const notification = document.querySelector(".notification");
        const notificationMessage = document.getElementById("notificationMessage");

        notificationMessage.innerText = "Login Success";
        notification.style.display = "block";

        // Hide the notification after the specified duration
        setTimeout(function () {
                notification.style.display = "none";
        }, duration);
}

// Example: Show the notification for 3 seconds when the page loads
window.onload = function () {
        showNotification("", 3000); // 3000 milliseconds (3 seconds)
};

// Check if the user is authenticated
var isLoggedIn = sessionStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
        // If not authenticated, redirect to the login page
        window.location.href = 'login-page/login.html';
}