const $ = (id) => document.getElementById(id);

$("details").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = $("nameInput").value;
    const fileName = $("fileInput").value;
    await window.electron.getSkin64(username, fileName);
});
