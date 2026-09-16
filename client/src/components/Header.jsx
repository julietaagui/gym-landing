export function Header() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h2 className="text-white">GymCross</h2>
        </div>
        <nav className="nav">
          <button onClick={() => handleScroll("hero")}>Inicio</button>
          <button onClick={() => handleScroll("features")}>Funcionalidades</button>
          <button onClick={() => handleScroll("benefits")}>Beneficios</button>
          <button onClick={() => handleScroll("features")}>Demo</button>
          <button onClick={() => handleScroll("contact")}>Contacto</button>
          <button className="btn-pri">Comenzar</button>
        </nav>
      </div>
    </header>
  );
}
