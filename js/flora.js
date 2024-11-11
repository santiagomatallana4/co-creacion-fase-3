function expandirInfo(btn) {
    const infoExtra = btn.nextElementSibling;
    if (infoExtra.style.display === "none" || infoExtra.style.display === "") {
        infoExtra.style.display = "block";
        btn.textContent = "Mostrar menos";
    } else {
        infoExtra.style.display = "none";
        btn.textContent = "Saber más";
    }
}