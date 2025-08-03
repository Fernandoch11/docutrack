import React, { useState, useEffect } from 'react';

function Requests() {
  const [datos, setDatos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCargando(true);
        const response = await fetch(
          `https://api.ejemplo.com/datos?page=${pagina}&limit=10`
        );
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const { data, totalPages } = await response.json();
        setDatos(data);
        setTotalPaginas(totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [pagina]);

  const handlePrevPage = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const handleNextPage = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  if (cargando) return <div className="cargando">Cargando datos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="lista-container">
      <h2>Lista de Elementos</h2>
      
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>
                <button onClick={() => console.log('Editar', item.id)}>
                  Editar
                </button>
                <button onClick={() => console.log('Eliminar', item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginacion">
        <button 
          onClick={handlePrevPage} 
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button 
          onClick={handleNextPage} 
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Requests;
