export function Problems() {
  const problems = [
    {
      id: 1,
      title: "Clientes desorganizados",
      description: "Sin un control claro de tus clientes",
      icon: "bi bi-people",
    },
    {
      id: 2,
      title: "Horarios sin controlar",
      description: "Dificultad para manejar horarios y reservas",
      icon: "bi bi-clock",
    },
    {
      id: 3,
      title: "Pagos desordenados",
      description: "Gestión manual y confusa de cobros",
      icon: "bi bi-credit-card",
    },
    {
      id: 4,
      title: "Sin seguimiento claro",
      description: "No hay forma de evaluar el progreso",
      icon: "bi bi-graph-up-arrow",
    },
  ];

  return (
    <section className="problems-section">
      <div className="problems-container">
        <div className="container">
          <h2>Problemas</h2>
          <p className="section-subtitle text-white">
            Que enfrentas sin una buena plataforma
          </p>
          <div className="problems-grid">
            {problems.map((problem) => (
              <div key={problem.id} className="problem-card">
                <div className="problem-top">
                  <span className="problem-number">{problem.id}</span>
                  <i className={`${problem.icon} problem-icon`}></i>
                </div>

                <h3 className="text-start">{problem.title}</h3>
                <p className="text-start">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
