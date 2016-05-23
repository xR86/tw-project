<?php
session_start();
$pagina = 1;
if (!empty($_GET["pagina"]))
    $pagina = $_GET["pagina"];


$rez_per_pagina = 10;
if (!empty($_GET["rpp"]))
    $rez_per_pagina = $_GET["rpp"];

$filtru='P_ID';
if (!empty($_GET["filtru"]))
	$filtru=$_GET["filtru"];

$ordine=0;
if (!empty($_GET["ordine"]))
	$ordine=$_GET["ordine"];



// Connects to the XE service (i.e. database) on the "localhost" machine
$conn = oci_connect('TW_PROJ', 'TW_PROJ', 'localhost/XE');
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

$stid = oci_parse($conn, 'SELECT COUNT(P_ID) AS NB FROM PERSONS');
oci_execute($stid);
oci_fetch($stid);
$nb = ceil(oci_result($stid, 'NB') / $rez_per_pagina);


echo "<b>Alege nr de rezultate per pagina: ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=5&filtru=$filtru&ordine=$ordine><b>5</b></a> ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=10&filtru=$filtru&ordine=$ordine><b>10</b></a> ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=20&filtru=$filtru&ordine=$ordine><b>20</b></a> ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=25&filtru=$filtru&ordine=$ordine><b>25</b></a> ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=50&filtru=$filtru&ordine=$ordine><b>50</b></a> ",
"<a href=/sgbd/persoane.php?pagina=1&rpp=100&filtru=$filtru&ordine=$ordine><b>100</b></a> <br>";

if ($nb<=10){
	$pages = 0; //iterator
	while ($pages != $nb) {
		echo '<a href=\sgbd/persoane.php?pagina=', $pages + 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', $pages + 1, '</b></a>', ' ';
		$pages = $pages + 1;
	}
} else{
	echo '<a href=\sgbd/persoane.php?pagina=1&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>1</b></a>', ' ';
	
	if ($pagina>4 && $pagina<$nb-4){
		echo '<b>...</b>';
		echo '<a href=\sgbd/persoane.php?pagina=',$pagina-2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina-2,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$pagina-1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina-1,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$pagina,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$pagina+1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina+1,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$pagina+2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina+2,'</b></a>', ' ';
		echo '<b>...</b>';
	} else if ($pagina<=4){
		echo '<a href=\sgbd/persoane.php?pagina=2&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>2</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=3&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>3</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=4&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>4</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=5&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>5</b></a>', ' ';
		echo "...";
	} else if ($pagina>=$nb-4){
		echo "...";
		echo '<a href=\sgbd/persoane.php?pagina=',$nb-5,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-5,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$nb-4,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-4,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$nb-3,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-3,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$nb-2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-2,'</b></a>', ' ';
		echo '<a href=\sgbd/persoane.php?pagina=',$nb-1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-1,'</b></a>', ' ';		
	}
	echo '<a href=\sgbd/persoane.php?pagina=',$nb,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb,'</b></a>', ' ';
}

echo '<br>';
if ($nb != 1) {
    if ($pagina != 1)
        echo '<a href=/sgbd/persoane.php?pagina=', $pagina - 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', htmlspecialchars('<<Previous page>>'), '</b></a>', str_repeat('&nbsp;', 5);
    if ($pagina != $nb)
        echo '<a href=/sgbd/persoane.php?pagina=', $pagina + 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', htmlspecialchars('<<Next page>>'), '</b></a>';
}

//////////////////////////////////////FILTRAREA DATELOR/////////////////////////////////////////////////////////////////
switch ($ordine){
	case 0:
		switch($filtru){
			case "P_ID":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY P_ID ASC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
			case "TASKS_ATTEMPTED_COUNTER":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY TASKS_ATTEMPTED_COUNTER ASC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
			case "TASKS_COMPLETED_COUNTER":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY TASKS_COMPLETED_COUNTER ASC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
		}
	break;
	
	case 1:
		switch($filtru){
			case "P_ID":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY P_ID DESC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
			case "TASKS_ATTEMPTED_COUNTER":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY TASKS_ATTEMPTED_COUNTER DESC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
			case "TASKS_COMPLETED_COUNTER":
				$stid = oci_parse($conn, 'SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM(
										SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER,ROWNUM RN FROM(
											SELECT P_ID,TASKS_ATTEMPTED_COUNTER,TASKS_COMPLETED_COUNTER FROM PERSONS 
											ORDER BY TASKS_COMPLETED_COUNTER DESC)
											WHERE ROWNUM<=:pagina*:rez_per_pagina)
											WHERE RN>(:pagina-1)*:rez_per_pagina');
				break;
		}
	break;	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

oci_bind_by_name($stid, ":pagina", $pagina);
oci_bind_by_name($stid, ":rez_per_pagina", $rez_per_pagina);


oci_execute($stid);

echo "<table border='1'>\n";

echo "<td>
		persoana 
		<a href=\sgbd/persoane.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=P_ID&ordine=",abs($ordine-1),">	
			<img src='filter.png' alt='filter' height='15' width='15'>
	    </a>
	  </td>";
echo "<td>
		task-uri incercate 
		<a href=\sgbd/persoane.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=TASKS_ATTEMPTED_COUNTER&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
echo "<td>
		task-uri completate 
		<a href=\sgbd/persoane.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=TASKS_COMPLETED_COUNTER&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
while ($row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)) {
    echo "<tr>\n";
    
    foreach ($row as $item) {
        echo "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
    }
    echo "</tr>\n";
}
echo "</table>\n";

?>