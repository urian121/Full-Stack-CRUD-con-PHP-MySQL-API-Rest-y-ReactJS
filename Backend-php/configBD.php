<?php
$usuario = "root";
$password = "";
$servidor = "localhost";
$basededatos = "bd_crud_react_php_mysql";

$con = mysqli_connect($servidor, $usuario, $password, $basededatos);

if (!$con) {
    die("Error al conectar a la Base de Datos: " . mysqli_connect_error());
}
