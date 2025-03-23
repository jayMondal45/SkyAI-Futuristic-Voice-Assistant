 // Wait for the page and all resources to load
 window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    // Add a delay to simulate loading (optional)
    setTimeout(() => {
        // Hide the loader
        loader.classList.add("hidden");

        // Show the main content
        content.classList.add("visible");
    }, 3000); // Adjust the delay as needed
});