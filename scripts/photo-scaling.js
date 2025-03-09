/*document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".photos img");

    images.forEach(img => {
        img.addEventListener("click", (event) => {
            openImageViewer(event.target);
        });
    });
});

function openImageViewer(img) {
    const viewer = document.createElement("div");
    viewer.classList.add("image-viewer");

    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    imgClone.classList.add("zoomable");

    viewer.appendChild(imgClone);
    document.body.appendChild(viewer);

    viewer.addEventListener("click", () => {
        viewer.remove();
    });

    imgClone.addEventListener("mousemove", (event) => {
        zoomImage(event, imgClone);
    });
}

function zoomImage(event, img) {
    const rect = img.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    const y = (event.clientY - rect.top) / rect.height * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)";
}

document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("zoomable")) {
        event.target.style.transform = "scale(1)";
    }
});

const style = document.createElement("style");
style.textContent = `
    .image-viewer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .image-viewer img {
        max-width: 80vw;
        max-height: 80vh;
        transition: transform 0.2s ease-in-out;
    }
`;
document.head.appendChild(style);*/

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".photos img");

    images.forEach(img => {
        img.addEventListener("click", (event) => {
            openImageViewer(event.target);
        });
    });
});

function openImageViewer(img) {
    const viewer = document.createElement("div");
    viewer.classList.add("image-viewer");

    const imgClone = document.createElement("img");
    imgClone.src = img.src;
    imgClone.classList.add("zoomable");
    imgClone.dataset.scale = 1;

    viewer.appendChild(imgClone);
    document.body.appendChild(viewer);

    viewer.addEventListener("click", () => {
        viewer.remove();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            viewer.remove();
        }
    });

    imgClone.addEventListener("wheel", (event) => {
        zoomImage(event, imgClone);
    });
}

function zoomImage(event, img) {
    event.preventDefault();
    let scale = parseFloat(img.dataset.scale) || 1;
    let rect = img.getBoundingClientRect();
    let x = (event.clientX - rect.left) / rect.width * 100;
    let y = (event.clientY - rect.top) / rect.height * 100;

    scale += event.deltaY * -0.01;
    scale = Math.min(Math.max(1, scale), 3);
    img.dataset.scale = scale;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = `scale(${scale})`;
}

const style = document.createElement("style");
style.textContent = `
    .image-viewer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .image-viewer img {
        max-width: 80vw;
        max-height: 80vh;
        transition: transform 0.2s ease-in-out;
    }
`;
document.head.appendChild(style);
