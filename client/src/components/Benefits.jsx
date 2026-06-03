export function Benefits() {
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

        <div
          className="accordion benefits-accordion"
          id="benefitsAccordion"
        >
          {benefits.map((benefit, index) => (
            <div
              className="accordion-item benefit-item"
              key={benefit.id}
            >
              <h2
                className="accordion-header"
                id={`heading-${benefit.id}`}
              >
                <button
                  className={`accordion-button ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${benefit.id}`}
                  aria-expanded={index === 0}
                  aria-controls={`collapse-${benefit.id}`}
                >
                  <span className="accordion-number">
                    {String(benefit.id + 1).padStart(2, "0")}
                  </span>

                  <span className="accordion-title">
                    {benefit.title}
                  </span>
                </button>
              </h2>

              <div
                id={`collapse-${benefit.id}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading-${benefit.id}`}
                data-bs-parent="#benefitsAccordion"
              >
                <div className="accordion-body">
                  {benefit.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}