function getSkin() {}

function changeColor() {
    const colors = [
        "#e81416",
        "#ffa500",
        "#faeb36",
        "#79c314",
        "#487de7",
        "#4b369d",
        "#70369d",
    ];

    const styles = document.documentElement.style;

    let i = 0;

    setInterval(() => {
        let shadowColor = (colors[i].replace("#", "0x") & 0xfefefe) >> 1;
        shadowColor = `#${shadowColor.toString(16).padStart(6, "0")}`;

        styles.setProperty(`--color`, colors[i]);
        styles.setProperty("--shadow-color", shadowColor);

        i = (i + 1) % colors.length;
    }, 1000);
}

window.addEventListener(
    "DOMContentLoaded",
    () => {
        changeColor();
    },
    false
);
