import tennisBall from "../assets/gymcross-pelota-tenis-loop.gif";

const roles = [
  {
    number: "01",
    title: "Administrador organiza",
    description: "Configura usuarios, ejercicios, disponibilidad y planes.",
  },
  {
    number: "02",
    title: "Cliente consulta",
    description:
      "Explora sus entrenamientos, perfil y estado de cuenta desde el móvil.",
  },
  {
    number: "03",
    title: "El gimnasio coordina",
    description:
      "Turnos y pagos quedan visibles para que el equipo pueda dar seguimiento.",
  },
];

export function Roles() {
  return (
    <section className="roles-section" aria-labelledby="roles-title">
      <div className="roles-container">
        <div className="roles-intro">
          <div className="roles-copy">
            <h2 id="roles-title">De la gestión<br />a la acción.</h2>
            <p>
              Cada perfil encuentra primero lo que necesita. El sistema conecta
              las tareas de organización con la experiencia de cada persona.
            </p>
          </div>

          <div className="roles-visual" aria-hidden="true">
            <div className="roles-number-lockup">
              <span className="roles-number">03</span>
              <span className="roles-eyebrow">Un sistema, dos roles</span>
            </div>
            <img src={tennisBall} alt="" className="roles-ball" />
          </div>
        </div>

        <div className="roles-list">
          {roles.map((role) => (
            <article className="roles-row" key={role.number}>
              <span className="roles-row-number">{role.number}</span>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
