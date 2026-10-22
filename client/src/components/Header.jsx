import { useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id) => {
    setIsMenuOpen(false);

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

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
          </button>
          <div className="logo">
            <h2 className="text-white">GymCross</h2>
          </div>
        </div>
        {isMenuOpen && (
          <button
            className="nav-backdrop"
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <nav
          className={`nav ${isMenuOpen ? "nav-open" : ""}`}
          id="site-navigation"
          aria-label="Navegación principal"
        >
          <button onClick={() => handleScroll("hero")}>Inicio</button>
          <button onClick={() => handleScroll("features")}>Funcionalidades</button>
          <button onClick={() => handleScroll("benefits")}>Beneficios</button>
          <button onClick={() => handleScroll("contact")}>Contacto</button>
        </nav>
      </div>
    </header>
  );
}
