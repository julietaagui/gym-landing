import userHome from "../assets/user-home.png";
import userAppointment from "../assets/user-appointment.png";

export function Experience() {
  return (
    <section className="experience-section" aria-labelledby="experience-title">
      <div className="experience-container">
        <div className="experience-copy">
          <div className="experience-number-lockup" aria-hidden="true">
            <span className="experience-number">06</span>
            <span className="experience-eyebrow">Tu gimnasio, en movimiento</span>
          </div>

          <div className="experience-message">
            <h2 id="experience-title">
              La experiencia<br />sigue en el bolsillo.
            </h2>
            <p>
              Reservar turnos, consultar entrenamientos y revisar el perfil: las
              tareas de cada cliente continúan desde una app clara y cercana.
            </p>
          </div>
        </div>

        <div className="experience-phones" aria-label="Vistas de la aplicación móvil">
          <img src={userHome} alt="Inicio de la aplicación móvil GymCross" />
          <img
            src={userAppointment}
            alt="Turnos disponibles en la aplicación móvil GymCross"
          />
        </div>
      </div>
    </section>
  );
}
