import tennisRacket from "../assets/gymcross-raqueta-tenis-loop.gif";

export function Benefits() {
  const benefits = [
    {
      id: 0,
      title: "Una operación conectada desde el inicio",
      description:
        "Organizá actividades, planes y grupos de turnos en un mismo flujo. Al reutilizar la información del gimnasio, preparás el sistema con más claridad y evitás cargar los mismos datos varias veces.",
    },
    {
      id: 1,
      title: "Altas de clientes más simples",
      description:
        "Buscá por DNI, revisá si la persona ya existe y asociá un plan activo desde el alta. Dejá registrados el estado del pago y su vencimiento para tener la información a mano.",
    },
    {
      id: 2,
      title: "Turnos y cupos organizados",
      description:
        "Definí grupos por actividad, días, horarios y capacidad. Consultá los turnos generados, su disponibilidad y su estado para administrar mejor la agenda de clases.",
    },
    {
      id: 3,
      title: "Caja y pagos bajo control",
      description:
        "Registrá la apertura con monto inicial y responsable, asociá cada cobro a un método de pago y mantené identificados los pagos pendientes. Al final del turno, revisá el resumen y cerrá la caja.",
    },
    {
      id: 4,
      title: "La ficha del cliente, en un solo lugar",
      description:
        "Consultá desde el perfil los datos, planes, pagos y entrenamientos de cada cliente. También podés revisar y actualizar su estado desde el panel de usuarios.",
    },
    {
      id: 5,
      title: "Entrenamientos mejor organizados",
      description:
        "Prepará ejercicios, agrupá por músculos y armá entrenamientos con repeticiones o tiempo, series y duración. Sumá imágenes cuando ayuden a explicar una rutina.",
    },
  ];

  return (
    <section className="benefits-section" id="benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <span className="benefits-section-number" aria-hidden="true">
            <span>0</span>
            <span>4</span>
            <span className="benefits-section-label">Beneficios</span>
          </span>
          <div className="benefits-heading">
            <h2>
              Más claridad para administrar, mejor experiencia para todos.
            </h2>
            <img className="benefits-mascot" src={tennisRacket} alt="" />
          </div>
        </div>

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
