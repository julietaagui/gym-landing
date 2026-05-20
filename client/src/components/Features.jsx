import { useState } from "react";
import demo1 from "../assets/demo1.png";
import demo2 from "../assets/demo2.png";
import demo3 from "../assets/demo3.jpg";

export function Features() {
  const tabs = [
    {
      id: "demo1",
      title: "Diseño interactivo",
      image: demo1,
    },
    {
      id: "demo2",
      title: "Colaboración en vivo",
      image: demo2,
    },
    {
      id: "demo3",
      title: "Presentación fluida",
      image: demo3,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeTab = tabs[displayedIndex];

  function handleTabClick(index) {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setIsFading(true);
    window.setTimeout(() => {
      setDisplayedIndex(index);
      setIsFading(false);
    }, 250);
  }

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="features-container">
          <h2>Una plataforma diseñada para simplificar la gestión</h2>
          <p className="section-subtitle">GymCross centraliza clientes, entrenamientos, agenda, pagos y métricas en una experiencia rápida, intuitiva y moderna.</p>

          <div className="features-content">
            <div className="features-left">
              <div className="mockup-placeholder">
                <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className={`img-features ${isFading ? "fade-out" : "fade-in"}`}
                />
              </div>

              <div className="feature-tabs">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`feature-tab ${index === selectedIndex ? "active" : ""}`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
