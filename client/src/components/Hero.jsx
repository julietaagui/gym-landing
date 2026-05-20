import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

export function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-wrapper">
            <div className="hero-left-section">
              <p className="hero-subtitle">Todo lo que tu gym necesita</p>
              <h1>El control de tu gimnasio, en un <span className="text-02">solo lugar</span> </h1>

              <p className="hero-description">
                Gestiona entrenamientos, usuarios, rutinas y más. Simple, moderno y pensado para vos.
              </p>

              <div className="hero-buttons">
                <button className="btn-pri btn-large">Probar demo</button>
                <button className="btn-sec">
                  <span>▶</span> Ver cómo funciona
                </button>
              </div>

              <div className="hero-benefits">
                <div className="benefit-card">
                  <div className="benefit-icon"><i class="bi bi-lightning-charge"></i></div>
                  <h3>Más eficiencia</h3>
                  <p>Automatiza tareas y ahorra tiempo.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon"><i class="bi bi-people"></i></div>
                  <h3>Mejor experiencia</h3>
                  <p>Tus clientes más felices y comprometidos.</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon"><i class="bi bi-shield-check"></i></div>
                  <h3>Todo seguro</h3>
                  <p>Datos protegidos, siempre.</p>
                </div>
              </div>
            </div>

            <div className="hero-right-section">
              <div className="hero-images-layout">
                <div className="hero-big-image">
                  <img src={img1} alt="Running" className="img-hero img-big" />
                </div>
                <div className="hero-small-images">
                  <img src={img3} alt="Entrenamiento" className="img-hero img-small" />
                  <img src={img2} alt="Pesas" className="img-hero img-small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}