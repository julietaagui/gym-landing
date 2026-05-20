import { useState } from "react";
import { sendContactForm } from "../api/contactApi";
import img1 from "../assets/img1.png";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendContactForm({ name, email, phone, message });
      setStatus(response.message || "¡Mensaje enviado correctamente!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.error ||
          err?.message ||
          "No se pudo enviar el mensaje. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-left">
          <img src={img1} alt="Testimonios" className="contact-image" />
        </div>

        <div className="contact-right">
          <h2>Cuéntanos más</h2>
          <p>Déjanos tus datos y nos contactaremos para ofrecerte la mejor solución</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tu teléfono"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿En qué te podemos ayudar?"
                rows="4"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>

          {status && <p className="form-status success">{status}</p>}
          {error && <p className="form-status error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
