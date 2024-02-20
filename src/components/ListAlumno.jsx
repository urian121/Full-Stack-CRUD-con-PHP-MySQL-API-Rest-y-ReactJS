import PropTypes from "prop-types";

const ListAlumno = ({ alumnos, eliminarAlumno, actualizarAlumno }) => {
  return (
    <div className="col-md-7">
      <h1 className="text-center mb-5 font-weight-bold">
        Lista de Alumnos <hr />
      </h1>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Alumno</th>
              <th scope="col">Curso</th>
              <th scope="col">Email</th>
              <th scope="col">Sexo</th>
              <th scope="col">Idioma</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{alumno.nombre_alumno}</td>
                <td>{alumno.curso_alumno}</td>
                <td>{alumno.email_alumno}</td>
                <td>{alumno.sexo_alumno}</td>
                <td>{alumno.habla_ingles == "1" ? "Sí" : "No"}</td>
                <td>
                  <span className="flex_btns">
                    <button
                      title="Borrar alumno"
                      className="btn btn-danger"
                      type="button"
                      onClick={() => eliminarAlumno(alumno.id)}>
                      <i className="bi bi-trash3"></i>
                    </button>
                    <button
                      title="Editar alumno"
                      className="btn btn-success btn_add"
                      type="button"
                      onClick={() => actualizarAlumno(alumno.id)}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ListAlumno.propTypes = {
  alumnos: PropTypes.array.isRequired,
  eliminarAlumno: PropTypes.func.isRequired,
  actualizarAlumno: PropTypes.func.isRequired,
};

export default ListAlumno;
