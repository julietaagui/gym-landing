import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

export function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Todo el control de tu gimnasio, en un solo lugar</h1>

          <div className="container hero-images">
            <div className="hero-left">
              <img src={img3} alt="Entrenamiento" className="img-hero img-small" />
              <img src={img2} alt="Pesas" className="img-hero img-small" />
            </div>

            <div className="hero-right">
              <img src={img1} alt="Running" className="img-hero img-big" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}