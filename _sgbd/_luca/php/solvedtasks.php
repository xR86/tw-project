<?php
session_start();
$pagina = 1;
if (!empty($_GET["pagina"]))
    $pagina = $_GET["pagina"];


$rez_per_pagina = 10;
if (!empty($_GET["rpp"]))
    $rez_per_pagina = $_GET["rpp"];

$filtru='ST_ID';
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


$stid = oci_parse($conn, 'SELECT COUNT(ST_ID) AS NB FROM SOLVEDTASKS');
oci_execute($stid);
oci_fetch($stid);
$nb = ceil(oci_result($stid, 'NB') / $rez_per_pagina);



echo "<b>Alege nr de rezultate per pagina: ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=5&filtru=$filtru&ordine=$ordine><b>5</b></a> ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=10&filtru=$filtru&ordine=$ordine><b>10</b></a> ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=20&filtru=$filtru&ordine=$ordine><b>20</b></a> ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=25&filtru=$filtru&ordine=$ordine><b>25</b></a> ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=50&filtru=$filtru&ordine=$ordine><b>50</b></a> ",
"<a href=/sgbd/solvedtasks.php?pagina=1&rpp=100&filtru=$filtru&ordine=$ordine><b>100</b></a> <br>";

if ($nb<=10){
	$pages = 0; //iterator
	while ($pages != $nb) {
		echo '<a href=\sgbd/solvedtasks.php?pagina=', $pages + 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', $pages + 1, '</b></a>', ' ';
		$pages = $pages + 1;
	}
} else{
	echo '<a href=\sgbd/solvedtasks.php?pagina=1&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>1</b></a>', ' ';
	
	if ($pagina>4 && $pagina<$nb-4){
		echo '<b>...</b>';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina-3,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina-3,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina-2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina-2,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina-1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina-1,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina+1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina+1,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina+2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina+2,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$pagina+3,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$pagina+3,'</b></a>', ' ';
		echo '<b>...</b>';
	} else if ($pagina<=4){
		echo '<a href=\sgbd/solvedtasks.php?pagina=2&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>2</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=3&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>3</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=4&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>4</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=5&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>5</b></a>', ' ';
		echo "...";
	} else if ($pagina>=$nb-4){
		echo "...";
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb-5,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-5,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb-4,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-4,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb-3,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-3,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb-2,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-2,'</b></a>', ' ';
		echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb-1,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb-1,'</b></a>', ' ';		
	}
	echo '<a href=\sgbd/solvedtasks.php?pagina=',$nb,'&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>',$nb,'</b></a>', ' ';
}

echo '<br>';
if ($nb != 1) {
    if ($pagina != 1)
        echo '<a href=/sgbd/solvedtasks.php?pagina=', $pagina - 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', htmlspecialchars('<<Previous page>>'), '</b></a>', str_repeat('&nbsp;', 5);
    if ($pagina != $nb)
        echo '<a href=/sgbd/solvedtasks.php?pagina=', $pagina + 1, '&rpp=',$rez_per_pagina,"&filtru=$filtru&ordine=$ordine",'><b>', htmlspecialchars('<<Next page>>'), '</b></a>';
}

switch($ordine){
	case 0:
		switch($filtru){
			case "ST_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY ST_ID ASC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "P_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY P_ID ASC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "TASK_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY TASK_ID ASC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "COMPLETEDDATE":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY COMPLETEDDATE ASC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "HASSOLUTION":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY HASSOLUTION ASC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
		}
		break;

	case 1:
		switch($filtru){
			case "ST_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY ST_ID DESC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "P_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY P_ID DESC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "TASK_ID":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY TASK_ID DESC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "COMPLETEDDATE":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY COMPLETEDDATE DESC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
			case "HASSOLUTION":
				$stid = oci_parse($conn, ' SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM(
														SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION,ROWNUM RN FROM(
															SELECT ST_ID,P_ID,TASK_ID,COMPLETEDDATE,HASSOLUTION FROM SOLVEDTASKS 
															ORDER BY HASSOLUTION DESC)
															WHERE ROWNUM<=:pagina*:rez_per_pagina)
															WHERE RN>(:pagina-1)*:rez_per_pagina 
				 ');
				 break;
		}
		break;
}

oci_bind_by_name($stid, ":pagina", $pagina);
oci_bind_by_name($stid, ":rez_per_pagina", $rez_per_pagina);

oci_define_by_name($stid, 'HASSOLUTION', $has_solution);
oci_define_by_name($stid, 'ST_ID', $solution_id);

oci_execute($stid);

echo "<table border='1'>\n";

echo "<td>
		unique id
		<a href=\sgbd/solvedtasks.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=ST_ID&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
echo "<td>
		person id
		<a href=\sgbd/solvedtasks.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=P_ID&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
echo "<td>
		task id
		<a href=\sgbd/solvedtasks.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=TASK_ID&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
echo "<td>
		data
		<a href=\sgbd/solvedtasks.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=COMPLETEDDATE&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
echo "<td>
		are solutie?
		<a href=\sgbd/solvedtasks.php?pagina=$pagina&rpp=$rez_per_pagina&filtru=HASSOLUTION&ordine=",abs($ordine-1),">
			<img src='filter.png' alt='filter' height='15' width='15'>
		</a>
	  </td>";
while ($row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)) {
    echo "<tr>\n";
    
    foreach ($row as $item) {
        echo "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
    }
	if ($has_solution=='Y'){
			echo "<td>
						<a href=\sgbd/viewSolution.php?solution_id=$solution_id>
							view solution
						</a>
				  </td>
				  ";
			echo "<td>
						<a href=\sgbd/viewResult.php?solution_id=$solution_id>
							view result
						</a>
				  </td>
				  ";
	}
	
    echo "</tr>\n";
}
echo "</table>\n";

?>