<?php

/**
 * Creando una API RESTful con los métodos GET, POST, PUT y DELETE utilizando PHP y MySQLi
 */
// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require('configBD.php');
$metodo = $_SERVER['REQUEST_METHOD'];
$tbl_alumnos = 'tbl_alumnos';


switch ($metodo) {
    case 'GET':
        // Verificar si se ha proporcionado un ID en la cadena de consulta
        if (isset($_GET['id'])) {
            // Obtener el ID de la cadena de consulta y escaparlo para evitar la inyección SQL
            $id = mysqli_real_escape_string($con, $_GET['id']);

            $query = "SELECT * FROM $tbl_alumnos WHERE id = $id";
            $resultado = mysqli_query($con, $query);

            // Verificar si se encontró el registro
            if (mysqli_num_rows($resultado) > 0) {
                // Si se encontró, obtener los datos y devolverlos como JSON
                $usuario = mysqli_fetch_assoc($resultado);
                echo json_encode($usuario);
            } else {
                // Si no se encontró el registro, devolver un mensaje de error
                echo json_encode(array('mensaje' => 'No se encontró ningún usuario con el ID proporcionado'));
            }
        } else {
            $query = "SELECT * FROM $tbl_alumnos";
            $resultado = mysqli_query($con, $query);

            $usuarios = array();
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $usuarios[] = $fila;
            }
            echo json_encode($usuarios);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre_alumno = mysqli_real_escape_string($con, $data['nombre_alumno']);
        $email_alumno = mysqli_real_escape_string($con, $data['email_alumno']);
        $curso_alumno = mysqli_real_escape_string($con, $data['curso_alumno']);
        $sexo_alumno = mysqli_real_escape_string($con, $data['sexo_alumno']);
        $habla_ingles = $data['habla_ingles'] === true ? 1 : 0;


        $query = "INSERT INTO $tbl_alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES ('$nombre_alumno', '$email_alumno', '$curso_alumno', '$sexo_alumno', '$habla_ingles')";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Nuevo usuario creado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al crear usuario: ' . mysqli_error($con)));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nombre_alumno = mysqli_real_escape_string($con, $data['nombre_alumno']);
        $email_alumno = mysqli_real_escape_string($con, $data['email_alumno']);
        $curso_alumno = mysqli_real_escape_string($con, $data['curso_alumno']);
        $sexo_alumno = mysqli_real_escape_string($con, $data['sexo_alumno']);
        $habla_ingles = mysqli_real_escape_string($con, $data['habla_ingles']);

        if ($habla_ingles == "true") {
            $habla_ingles = 1;
        } else {
            $habla_ingles = 0;
        }


        $query = "UPDATE $tbl_alumnos SET nombre_alumno='$nombre_alumno', email_alumno='$email_alumno', curso_alumno='$curso_alumno', sexo_alumno='$sexo_alumno', habla_ingles='$habla_ingles' WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Usuario actualizado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al actualizar usuario: ' . mysqli_error($con)));
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        // Realizar la eliminación del usuario
        $query = "DELETE FROM $tbl_alumnos WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Usuario eliminado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al eliminar usuario: ' . mysqli_error($con)));
        }
        break;

    default:
        echo json_encode(array('error' => 'Método no permitido'));
        break;
}

mysqli_close($con);
