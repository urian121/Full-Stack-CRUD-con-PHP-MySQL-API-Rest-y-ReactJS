import PropTypes from "prop-types";

const Titulo = ({ estado }) => {
  return (
    <h1 className="text-center mb-5 mt-3 font-weight-bold">
      {estado ? "Registrar alumno" : "Editar alumno"}
      <hr />
    </h1>
  );
};

// PropTypes
Titulo.propTypes = {
  estado: PropTypes.bool.isRequired,
};
export default Titulo;
