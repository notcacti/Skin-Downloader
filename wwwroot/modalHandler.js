const modal = $("modal");

function openModal() {
    console.log("here");
    modal.style.display = "block";
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === "P") {
        event.preventDefault();
        openModal();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === "O") {
        event.preventDefault();
        openModal();
    }
});
