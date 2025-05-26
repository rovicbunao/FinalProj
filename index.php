<!DOCTYPE html>
<html>
<head>
    <title>Shoes Inventory</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- Top Navigation -->
<div class="top-nav">
    <a href="about.html">About Us</a>
    <a href="contact.html">Contact</a>
</div>

<h1>Real Kicks Shoes Inventory</h1>

<div class="container">
    <!-- Left: Form -->
    <form id="shoeForm" enctype="multipart/form-data">
        <input type="hidden" id="shoeId" name="id">
        <input type="text" name="brand" placeholder="Brand" required>
        <input type="text" name="name" placeholder="Model Name" required>
        <input type="number" name="size" placeholder="Size" required>
        <input type="file" name="image">
        <textarea name="description" placeholder="Description" required></textarea>
        <button type="submit">Save</button>
    </form>

    <!-- Right: Table -->
    <div id="shoeList"></div>
</div>

<!-- Modal for Viewing Shoe Details -->
<div id="viewModal" class="modal" onclick="closeModal(event)">
    <div class="modal-content" onclick="event.stopPropagation();">
        <span class="close-btn" onclick="closeModal()">&times;</span>
        <h2>Shoe Details</h2>
        <div style="display: flex; gap: 20px; align-items: flex-start;">
            <img id="modalImage" src="" alt="Shoe Image" style="width: 150px; height: auto; border-radius: 5px; flex-shrink: 0;"/>
            <div id="modalDetails">
                <!-- JavaScript will populate this -->
            </div>
        </div>
        <button onclick="closeModal()">Close</button>
    </div>
</div>



<script src="shoes.js"></script>
</body>
</html>
