import tennisBall from "../assets/gymcross-pelota-tenis-loop.gif";

const principles = [
  {
    category: "01 / Organización",
    title: "Todo bajo control",
    description:
      "Clientes, turnos y pagos reunidos para simplificar la gestión.",
  },
  {
    category: "02 / Autonomía",
    title: "Cada usuario encuentra su lugar",
    description:
      "Entrenamientos, perfil y pagos disponibles desde el móvil.",
  },
  {
    category: "03 / Claridad",
    title: "La información a simple vista",
    description:
      "Datos y estados ordenados para decidir con confianza.",
  },
  {
    category: "04 / Conexión",
    title: "El gimnasio, mejor conectado",
    description:
      "Administración y usuarios comparten la misma plataforma.",
  },
];

export function DesignPrinciples() {
  return (
    <section className="principles-section" aria-labelledby="principles-title">
      <div className="principles-container">
        <div className="principles-intro">
          <h2 id="principles-title">
            Una experiencia que funciona para todos.
          </h2>

          <div className="principles-visual" aria-hidden="true">
            <div className="principles-number-lockup">
              <span className="principles-number">05</span>
              <span className="principles-eyebrow">Decisiones de diseño</span>
              <img src={tennisBall} alt="" className="principles-ball" />
            </div>
          </div>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.category}>
              <span className="principle-category">{principle.category}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
