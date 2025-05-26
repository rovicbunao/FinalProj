document.addEventListener("DOMContentLoaded", function () {
    loadShoes();

    document.getElementById("shoeForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        let isUpdate = document.getElementById("shoeId").value !== "";
        fetch("actions/" + (isUpdate ? "update.php" : "create.php"), {
            method: "POST",
            body: formData
        }).then(() => {
            this.reset();
            document.getElementById("shoeId").value = ""; // clear after update
            loadShoes();
        });
    });
});

function loadShoes() {
    // add timestamp to bust cache
    fetch("actions/read.php?" + new Date().getTime(), { cache: "no-store" })
        .then(res => res.text())
        .then(data => {
            document.getElementById("shoeList").innerHTML = data;
        });
}

function editShoe(id) {
    fetch("actions/read.php?id=" + encodeURIComponent(id))
        .then(res => res.json())
        .then(data => {
            document.getElementById("shoeId").value = data.id;
            document.querySelector("[name='brand']").value = data.brand;
            document.querySelector("[name='name']").value = data.name;
            document.querySelector("[name='size']").value = data.size;
            document.querySelector("[name='description']").value = data.description;
        });
}

function deleteShoe(id) {
    if (confirm("Delete this shoe?")) {
        fetch("actions/delete.php?id=" + encodeURIComponent(id))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error deleting shoe: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                alert(text);  // show server response (like "Deleted successfully")
                loadShoes();  // refresh list
            })
            .catch(error => {
                alert("Failed to delete: " + error.message);
                console.error("Delete error:", error);
            });
    }
}

function viewShoe(id) {
    fetch("actions/read.php?id=" + encodeURIComponent(id))
        .then(res => res.json())
        .then(data => {
            const modal = document.getElementById("viewModal");
            const image = document.getElementById("modalImage");
            const details = document.getElementById("modalDetails");

            if (data.image) {
                image.src = "uploads/" + data.image;
                image.style.display = "block";
            } else {
                image.style.display = "none";
            }

            details.innerHTML = `
                <p><strong>Brand:</strong> ${data.brand}</p>
                <p><strong>Model:</strong> ${data.name}</p>
                <p><strong>Size:</strong> ${data.size}</p>
                <p><strong>Description:</strong><br>${data.description}</p>
            `;

            modal.style.display = "block";
        });
}

function closeModal() {
    const modal = document.getElementById("viewModal");
    modal.style.display = "none";
}
document.getElementById("refreshBtn").addEventListener("click", function() {
    loadShoes();
});
