const $ = (id) => document.getElementById(id);
const modal = $("modal");

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

$("modal-content").addEventListener("submit", (event) => {
    event.preventDefault();

    const savePath = $("savePath").value;

    window.electron.sendData(savePath);

    modal.style.display = "none";
});
