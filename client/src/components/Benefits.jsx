import { useState } from "react";

export function Benefits() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const benefits = [
    {
      id: 0,
      title: "Mejora ROI",
      description:
        "Incrementa tus ingresos hasta 40% con una gestión eficiente de clientes y automatización de procesos",
    },
    {
      id: 1,
      title: "Integración fácil",
      description:
        "Se integra perfectamente con tus sistemas existentes. Migración sin complicaciones en pocas horas.",
    },
    {
      id: 2,
      title: "Experiencia mejorada",
      description:
        "Tus clientes disfrutarán de una experiencia moderna con app móvil, reservas online y seguimiento de progreso.",
    },
    {
      id: 3,
      title: "Costos reducidos",
      description:
        "Reduce gastos administrativos en 60% automatizando tareas repetitivas y eliminando procesos manuales.",
    },
    {
      id: 4,
      title: "Soporte 24/7",
      description:
        "Contamos con un equipo de soporte disponible las 24 horas para ayudarte con cualquier duda o problema.",
    },
    {
      id: 5,
      title: "Seguridad",
      description:
        "Tus datos y los de tus clientes están protegidos con encriptación de nivel empresarial y certificaciones de seguridad.",
    },
  ];

  return (
    <section className="benefits-section" id="benefits">
      <div className="benefits-container">
        <h2>Beneficios</h2>
        <div className="benefits-accordion">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className="accordion-item">
              <button
                className={`accordion-header ${activeAccordion === index ? "active" : ""}`}
                onClick={() => setActiveAccordion(index)}
              >
                <span className="accordion-number">
                  {String(benefit.id + 1).padStart(2, "0")}
                </span>
                <span className="accordion-title">{benefit.title}</span>
                <span className="accordion-icon">+</span>
              </button>
              {activeAccordion === index && (
                <div className="accordion-content">
                  <p>{benefit.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
