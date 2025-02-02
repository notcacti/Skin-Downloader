const modal = document.getElementById("modal");

function openModal() {
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

document.getElementById("savePath").addEventListener("click", (e) => {
    e.preventDefault(0);

    window.electron.sendData();
});

document.getElementById("modal-content").addEventListener("submit", (event) => {
    event.preventDefault();

    modal.style.display = "none";
});
