export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GymCross</h3>
              <p>La plataforma de gestión para tu gimnasio</p>
            </div>

            <div className="footer-section">
              <h4>Producto</h4>
              <ul>
                <li>
                  <a href="#benefits">Beneficios</a>
                </li>
                <li>
                  <a href="#contact">Contacto</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Síguenos</h4>
              <ul>
                <li>
                  <a href="#instagram">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>&copy; {currentYear} GymCross. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
