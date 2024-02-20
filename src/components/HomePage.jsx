import { useState, useEffect } from "react";
import axios from "axios";
import Titulo from "./Titulo";
import ListAlumno from "./ListAlumno";
import FormularioAlumno from "./FormularioAlumno";
// import FormularioEditarAlumno from "./FormularioEditarAlumno";

/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [alumnos, setAlumnos] = useState([]);

  const URL_API = "http://localhost/API-PHP/";

  useEffect(() => {
    // Obtener lista de alumnos al cargar la página
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const response = await axios.get(URL_API);
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

  const eliminarAlumno = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/?id=${id}`);
      console.log("Alumno eliminado:", response.data);
      toast.error("Alumno eliminado correctamente.");
      // Actualizar la lista de alumnos
      obtenerAlumnos();
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
    }
  };

  const actualizarAlumno = async (id) => {
    try {
      console.log("funcion actualizar", id);
      // Actualizar la lista de alumnos
      obtenerAlumnos();
    } catch (error) {
      console.error("Error al actualizar alumno:", error);
    }
  };

  const agregarAlumno = async (nuevoAlumno) => {
    console.log(nuevoAlumno);
    try {
      const response = await axios.post(URL_API, nuevoAlumno);
      toast.success("Alumno registrado correctamente.");
      console.log("Alumno agregado:", response.data);
      // Actualizar la lista de alumnos
      obtenerAlumnos();
    } catch (error) {
      console.error("Error al agregar alumno:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Titulo />
          <FormularioAlumno agregarAlumno={agregarAlumno} />
        </div>
        <ListAlumno
          alumnos={alumnos}
          eliminarAlumno={eliminarAlumno}
          actualizarAlumno={actualizarAlumno}
        />
      </div>
    </>
  );
};

export default HomePage;
