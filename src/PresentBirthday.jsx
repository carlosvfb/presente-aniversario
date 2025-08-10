import React, { useState, useEffect, useRef } from "react";
import "./PresentBirthday.css";

export default function PresentBirthday() {
  const musicSrc = `${process.env.PUBLIC_URL}/musicas/musica.mp3`;

  const photos = [
    `${process.env.PUBLIC_URL}/imagens/imagem1.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem3.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem4.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem5.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem6.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem7.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem9.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem11.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem12.jpg`,
    `${process.env.PUBLIC_URL}/imagens/imagem13.jpg`,
  ];

  const messages = [
    {
      from: "Carlos",
      text: "Painho, hoje é o seu dia, mas para mim, todos os dias são motivo pra agradecer por ter você na minha vida. Obrigado por cada conselho, cada abraço, cada vez que acreditou em mim e até por cada bronca mesmo as com chinelo na mão 😏. Você é meu herói, meu amigo e também o meu banco particular nas horas de aperto. Que Deus te abençoe com muita saúde, paz e felicidade. Te amo, véio! Feliz Dia dos Pais! ❤️😂👨‍👦",
    },
    {
      from: "Beatriz",
      text: "Papai, obrigada por sempre cuidar de nós e estar ao nosso lado, nem todos têm a mesma sorte. Apesar de às vezes teimoso, sempre faz as coisas pensando no bem da nossa família. Agradeço por todos os momentos juntos e espero tê-los por muito mais tempo. Agradeço também por sempre me apoiar no que me proponho a fazer, isso é e sempre será muito importante pra mim, guardo no coração. Te amo muito papito querido!!! FELIZ DIA DOS PAIS!!!!",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % photos.length);
    }, 4500);
    return () => clearInterval(id);
  }, [photos.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  function handleImageError(index) {
    console.warn(`Imagem não encontrada: ${photos[index]}`);
    // Pula para a próxima imagem automaticamente
    setCurrentSlide((s) => (s + 1) % photos.length);
  }

  return (
    <div className="container">
      <audio ref={audioRef} src={musicSrc} preload="none" />

      <div className="card">
        <header>
          <h1>Feliz Dia dos Pais!</h1>
          <p>Um brinde às memórias que construímos e aos momentos que ainda vamos viver.</p>

          <button onClick={togglePlay} className="btn-music">
            {playing ? "Pausar música" : "Tocar música"}
          </button>
        </header>

        <main>
          <section className="photos-section">
            <div className="photo-container">
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`foto ${i + 1}`}
                  onError={() => handleImageError(i)}
                  className={i === currentSlide ? "photo visible" : "photo hidden"}
                />
              ))}
              <div className="caption">Nossas lembranças</div>
            </div>
            <div className="photo-controls">
              <button onClick={() => setCurrentSlide((s) => (s - 1 + photos.length) % photos.length)}>◀</button>
              <button onClick={() => setCurrentSlide((s) => (s + 1) % photos.length)}>▶</button>
            </div>
          </section>

          <aside className="messages-section">
            <h2>Mensagens da Família</h2>
            {messages.map((m, idx) => (
              <div key={idx} className="message">
                <strong>{m.from}:</strong>
                <p>{m.text}</p>
              </div>
            ))}
          </aside>
        </main>

        <footer>Criado com ❤️ por Carlos — Presente especial.</footer>
      </div>
    </div>
  );
}
