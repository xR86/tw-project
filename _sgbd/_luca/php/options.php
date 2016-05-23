<?php

// Connects to the XE service (i.e. database) on the "localhost" machine
$conn = oci_connect('TW_PROJ', 'TW_PROJ', 'localhost/XE');
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

echo "<br> <a href=\"persoane.php\"><b>Vizualizati persoanele</b></a> sau <br>";


?>