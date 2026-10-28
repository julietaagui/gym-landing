import { useState } from "react";
import appointment from "../assets/appointment.png";
import users from "../assets/users.png";
import cashbox from "../assets/cashbox.png";
import metrics from "../assets/metrics.png";
import exercise from "../assets/exercise.png";
import userAppointment from "../assets/user-appointment.png";
import userHome from "../assets/user-home.png";
import userProfile2 from "../assets/user-profile2.png";
import userPayments from "../assets/user-payments.png";
import userPayments2 from "../assets/user-payments2.png";
import tennisBall from "../assets/gymcross-pelota-tenis-loop.gif";
import jumpRope from "../assets/gymcross-cuerda-saltar-loop.gif";

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
      id: "home",
      title: "Inicio",
      image: userHome,
    },
    {
      id: "appointment",
      title: "Turnos",
      image: userAppointment,
    },
    {
      id: "profile",
      title: "Perfil de usuario",
      image: userProfile2,
    },
    {
      id: "payments",
      title: "Pagos",
      images: [userPayments, userPayments2],
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
      <div className="features-container">
          <div className="features-heading">
            <div className="features-heading-copy">
              <h2>
                Todo lo que tu gimnasio<br />necesita, en un solo lugar
              </h2>
              <p className="section-subtitle">
                GymCross centraliza clientes, entrenamientos, agenda, pagos y
                métricas en una experiencia rápida, intuitiva y moderna.
              </p>
            </div>
            <div className="features-heading-visual" aria-hidden="true">
              <div className="features-number-lockup">
                <span className="features-section-number">02</span>
                <span className="features-section-label">Funcionalidad</span>
              </div>
              <img className="features-jump-rope" src={jumpRope} alt="" />
            </div>
          </div>

          <div className="features-content">
            <div className="features-left">
              <div>
                <div className="feature-top-tabs-slot">
                <div
                  className="feature-top-tabs"
                  aria-label="Elegir tipo de cuenta"
                >
                  {topTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`feature-top-tab ${
                        selectedTopTab === tab.id ? "active" : ""
                      }`}
                      aria-pressed={selectedTopTab === tab.id}
                      onClick={() => handleTopTabClick(tab.id)}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                </div>

                <div
                  className={`features-main-layout ${
                    selectedTopTab === "web" ? "features-admin-layout" : ""
                  } ${selectedTopTab === "mobile" ? "features-user-layout" : ""}`}
                >
                  <div
                    className={`mockup-placeholder ${
                      selectedTopTab === "mobile" ? "mockup-mobile" : ""
                    } ${
                      activeTab.id === "users" ? "mockup-users" : ""
                    } ${activeTab.id === "profile" ? "mockup-profile" : ""} ${activeTab.id === "payments" ? "mockup-payments" : ""}`}
                  >
                    {(activeTab.images ?? [activeTab.image]).map(
                      (image, index) => (
                        <img
                          key={`${activeTab.id}-${index}`}
                          src={image}
                          alt={
                            activeTab.images
                              ? `${activeTab.title} ${index + 1}`
                              : activeTab.title
                          }
                          className={`img-features ${
                            activeTab.images ? "img-features-paired" : ""
                          } ${isFading ? "fade-out" : "fade-in"}`}
                        />
                      ),
                    )}
                  </div>

                  <div className="feature-tabs">
                    {sideTabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        type="button"
                        className={`feature-tab ${
                          index === selectedIndex ? "active" : ""
                        }`}
                        aria-pressed={index === selectedIndex}
                        onClick={() => handleTabClick(index)}
                      >
                        <span className="feature-tab-mascot" aria-hidden="true">
                          {index === selectedIndex && <img src={tennisBall} alt="" />}
                        </span>
                        <span className="feature-tab-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="feature-tab-label">{tab.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
