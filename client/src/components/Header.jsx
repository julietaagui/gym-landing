export function Header() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h2>GymCross</h2>
        </div>
        <nav className="nav">
          <button onClick={() => handleScroll("hero")}>Inicio</button>
          <button onClick={() => handleScroll("features")}>Funcionalidades</button>
          <button onClick={() => handleScroll("benefits")}>Beneficios</button>
          <button onClick={() => handleScroll("features")}>Demo</button>
          <button onClick={() => handleScroll("contact")}>Contacto</button>
          <button className="btn-primary">Comenzar</button>
        </nav>
      </div>
    </header>
  );
}
