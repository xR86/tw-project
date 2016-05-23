<?php
session_start();

$solution_id = $_GET["solution_id"];

// Connects to the XE service (i.e. database) on the "localhost" machine
$conn = oci_connect('TW_PROJ', 'TW_PROJ', 'localhost/XE');
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

$stid = oci_parse($conn, 'SELECT SOLUTION FROM SOLVEDTASKS WHERE ST_ID=:solution_id');

oci_bind_by_name($stid, ":solution_id", $solution_id);

$result = oci_execute($stid);
if ($result !== false){
	while($row = oci_fetch_assoc($stid)){
		echo nl2br(
					str_replace(' ', 
								'&nbsp;',
								htmlentities(
									$row['SOLUTION']->load()
								)
					)
		);
	}
}

?>