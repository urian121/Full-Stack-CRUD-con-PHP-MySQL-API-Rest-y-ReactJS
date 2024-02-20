import { useState } from "react";
import PropTypes from "prop-types";

const FormularioAlumno = ({ agregarAlumno, alumno }) => {
  const [nombre, setNombre] = useState(alumno ? alumno.nombre_alumno : "");
  const [email, setEmail] = useState(alumno ? alumno.email_alumno : "");
  const [curso, setCurso] = useState(alumno ? alumno.curso_alumno : "");
  const [sexo, setSexo] = useState(alumno ? alumno.sexo_alumno : "masculino");
  const [hablaIngles, setHablaIngles] = useState(
    alumno ? alumno.habla_ingles === "1" : false
  );

  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarAlumno({
      id: alumno ? alumno.id : null,
      nombre_alumno: nombre,
      email_alumno: email,
      curso_alumno: curso,
      sexo_alumno: sexo,
      habla_ingles: hablaIngles ? "1" : "0",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{alumno ? "Editar Alumno" : "Registrar Alumno"}</h2>
      <h2>Editar Alumno</h2>
      <div className="mb-3">
        <label className="form-label">Nombre del Alumno</label>
        <input
          type="text"
          name="nombre_alumno"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email del Alumno</label>
        <input
          type="text"
          name="email_alumno"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Seleccione el Curso</label>
        <select
          name="curso_alumno"
          className="form-select"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required>
          <option value="">Seleccione el Curso</option>
          <option value="ReactJS">ReactJS</option>
          <option value="Python">Python</option>
          <option value="NodeJS">NodeJS</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Sexo del alumno</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sexo_alumno"
            id="masculino"
            value="masculino"
            checked={sexo === "masculino"}
            onChange={handleChangeSexo}
            required
          />
          <label className="form-check-label" htmlFor="masculino">
            Masculino
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sexo_alumno"
            id="femenino"
            value="femenino"
            checked={sexo === "femenino"}
            onChange={handleChangeSexo} // Aquí debe ser handleChangeSexo
          />
          <label className="form-check-label" htmlFor="femenino">
            Femenino
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">¿Hablas Ingles?</label>
        <div className="form-check form-switch">
          <input
            name="habla_ingles"
            className="form-check-input"
            type="checkbox"
            id="ingles"
            checked={hablaIngles}
            onChange={(e) => setHablaIngles(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="ingles">
            {hablaIngles ? "Sí" : "No"}
          </label>
        </div>
      </div>
      <div className="d-grid gap-2 mb-5">
        <button type="submit" className="btn btn-primary block btn_add">
          Registrar
        </button>
      </div>
    </form>
  );
};

FormularioAlumno.propTypes = {
  agregarAlumno: PropTypes.func.isRequired,
  alumno: PropTypes.object, // Datos del alumno para editar
};

export default FormularioAlumno;
