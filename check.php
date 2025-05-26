<?php
$file = "C:/xampp/htdocs/shoe_inventory/inventory.xml";

if (is_writable($file)) {
    echo "File is writable";
} else {
    echo "File is NOT writable";
}
?>
