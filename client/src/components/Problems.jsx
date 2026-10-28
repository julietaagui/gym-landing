import stopwatch from "../assets/gymcross-cronometro-loop.gif";

export function Problems() {
  const problems = [
    {
      id: 1,
      title: "Clientes desorganizados",
      description: "Sin un control claro de tus clientes",
    },
    {
      id: 2,
      title: "Horarios sin controlar",
      description: "Dificultad para manejar horarios y reservas",
    },
    {
      id: 3,
      title: "Pagos desordenados",
      description: "Gestión manual y confusa de cobros",
    },
    {
      id: 4,
      title: "Sin seguimiento claro",
      description: "No hay forma de evaluar el progreso",
    },
  ];

  return (
    <section className="problems-section">
      <div className="problems-container">
          <div className="problems-heading">
            <div className="problems-copy">
              <h2>
                Que enfrentas sin una<br />buena plataforma
              </h2>
            </div>
            <div className="problems-visual" aria-hidden="true">
              <div className="problems-number-lockup">
                <span className="problems-number">01</span>
                <span className="problems-eyebrow">Problemas</span>
              </div>
              <img className="problems-mascot" src={stopwatch} alt="" />
            </div>
          </div>
          <div className="problems-grid">
            {problems.map((problem) => (
              <div key={problem.id} className="problem-card">
                <div className="problem-top">
                  <span className="problem-number">{String(problem.id).padStart(2, "0")}</span>
                  <h3 className="text-start">{problem.title}</h3>
                </div>

                <p className="text-start">{problem.description}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
