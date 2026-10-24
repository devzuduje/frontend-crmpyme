import { useAuth } from '../../context/useAuth';

// Cada panel tiene su propia historia en el backlog. Por ahora solo saluda.
const HISTORIA_POR_ROL = {
  administrador: 'El panel del administrador se construye en HU-20.',
  gerente: 'El panel del gerente se construye en HU-21.',
  vendedor: 'El panel del vendedor se construye en HU-19.',
};

function DashboardPage() {
  const { usuario } = useAuth();

  return (
    <section>
      <h1 className="pagina-titulo">Hola, {usuario.nombre}</h1>
      <p className="pagina-subtitulo">{HISTORIA_POR_ROL[usuario.rol]}</p>
    </section>
  );
}

export default DashboardPage;
