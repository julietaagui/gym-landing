import { useState } from "react";
import appointment from "../assets/appointment.png";
import users from "../assets/users.png";
import cashbox from "../assets/cashbox.png";
import metrics from "../assets/metrics.png";
import exercise from "../assets/exercise.png";
import userAppointment from "../assets/user-appointment.png";
import userProfile from "../assets/user-profile.png";
import userPayments from "../assets/user-payments.png";

export function Features() {
  const topTabs = [
    {
      id: "web",
      title: "Administradores",
    },
    {
      id: "mobile",
      title: "Usuarios",
    },
  ];

  const webSideTabs = [
    {
      id: "appointment",
      title: "Turnos",
      image: appointment,
    },
    {
      id: "users",
      title: "Usuarios",
      image: users,
    },
    {
      id: "cashBox",
      title: "Caja y Pagos",
      image: cashbox,
    },
    {
      id: "metrics",
      title: "Metricas",
      image: metrics,
    },
    {
      id: "workouts",
      title: "Rutinas y Ejercicios",
      image: exercise,
    },
  ];

  const mobileSideTabs = [
    {
      id: "appointment",
      title: "Turnos",
      image: userAppointment,
    },
    {
      id: "profile",
      title: "Perfil de usuario",
      image: userProfile,
    },
    {
      id: "payments",
      title: "Pagos",
      image: userPayments,
    },
  ];

  const [selectedTopTab, setSelectedTopTab] = useState("web");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const sideTabs = selectedTopTab === "web" ? webSideTabs : mobileSideTabs;
  const activeTab = sideTabs[displayedIndex];

  function handleTopTabClick(tabId) {
    setSelectedTopTab(tabId);
    setSelectedIndex(0);
    setDisplayedIndex(0);
  }

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

          <p className="section-subtitle">
            GymCross centraliza clientes, entrenamientos, agenda, pagos y
            métricas en una experiencia rápida, intuitiva y moderna.
          </p>

          <div className="features-content">
            <div className="features-left">
              <div>
                <div className="feature-top-tabs">
                  {topTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`feature-top-tab ${
                        selectedTopTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => handleTopTabClick(tab.id)}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                <div className="features-main-layout">
                  <div className="mockup-placeholder">
                    <img
                      src={activeTab.image}
                      alt={activeTab.title}
                      className={`img-features ${
                        isFading ? "fade-out" : "fade-in"
                      }`}
                    />
                  </div>

                  <div className="feature-tabs">
                    {sideTabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        type="button"
                        className={`feature-tab ${
                          index === selectedIndex ? "active" : ""
                        }`}
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
        </div>
      </div>
    </section>
  );
}
