import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const contacts = [
  {
    name: "Email",
    href: "mailto:gabin.guerin1@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "GitHub",
    href: "https://github.com/GGab1",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/gabin-gu%C3%A9rin-995989258/",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ggabin1/",
    icon: FaInstagram,
  },
];

const typeStyles = {
  language: "bg-accent/20 text-accent",
  librarie: "bg-blue-500/20 text-blue-400",
  framework: "bg-purple-500/20 text-purple-400",
  software: "bg-green-500/20 text-green-400",
};

const typeIcons = {
  language: "💻",
  librarie: "📚",
  framework: "🧩",
  software: "🖥️",
};

export function Home() {
  const [lang, setLang] = useState("en");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [profileImage, setProfileImage] = useState("/Photo.jpg");
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  const oeufdepaque = "/pluh.jpg";

  const texts = {
    fr: {
      greeting: "Bonjour, je suis Gabin",
      intro: "Développeur passionné, je crée des expériences interactives et immersives.",
      button: "Voir mes projets",
      aboutTitle: "À propos de moi",
      aboutText: "Développeur web full stack, je conçois et fais évoluer des applications modernes avec une attention particulière portée à la qualité du code, à l’expérience utilisateur et à la maintenabilité des projets.",
      skillsTitle: "Compétences",
      projectsTitle: "Mes Projets",
      contactTitle: "Contactez-moi",
      contactText: "Vous pouvez me contacter via email ou sur mes réseaux sociaux.",
    },
    en: {
      greeting: "Hello, I'm Gabin",
      intro: "Passionate developer crafting interactive and immersive experiences.",
      button: "See my projects",
      aboutTitle: "About Me",
      aboutText: "I am a full stack web developer who designs and develops modern applications with a focus on code quality, user experience, and project maintainability.",
      skillsTitle: "Skills",
      projectsTitle: "My Projects",
      contactTitle: "Get in Touch",
      contactText: "You can reach me via email or on my social media.",
    },
  };

  const skills = [
    // Langages
    { name: "HTML", type: "language" },
    { name: "CSS", type: "language" },
    { name: "Javascript", type: "language" },
    { name: "Java", type: "language" },
    { name: "Python", type: "language" },
    { name: "PHP", type: "language" },
    { name: "SQL", type: "language" },
    { name: "Dart", type: "language" },

    // Frameworks / Libraries
    { name: "React", type: "framework" },
    { name: "TypeScript", type: "framework" },
    { name: "Tailwind", type: "framework" },
    { name: "Bootstrap", type: "framework" },
    { name: "DaisyUI", type: "framework" },
    { name: "Framer Motion", type: "librarie" },
    { name: "Node.js", type: "framework" },
    { name: "Next.js", type: "framework" },
    { name: "Turbo", type: "librarie" },
    { name: "Vue.js", type: "framework" },
    { name: "Flutter", type: "framework" },
    { name: "Symfony", type: "framework" },

    // Logiciels / Outils
    { name: "Azure DevOps", type: "software" },
    { name: "Affinity", type: "software" },
    { name: "DaVinci Resolve", type: "software" },
    { name: "Trello", type: "software" },
    { name: "Figma", type: "software" },
    { name: "Jira", type: "software" },
    { name: "Wordpress", type: "software" },
    { name: "Prestashop", type: "software" },
    { name: "VSCode", type: "software" },
    { name: "PGAdmin", type: "software" },
    { name: "Docker", type: "software" },
    { name: "Canva", type: "software" },
    { name: "Boosted", type: "software" },
    { name: "Vercel", type: "software" },
    { name: "PostgresSQL", type: "software" },
    { name: "Supabase", type: "software" },
  ];

  const handleProfileClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) clearTimeout(clickTimer);
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 1000);
    setClickTimer(timer);

    if (clickCount + 1 >= 5) {
      setProfileImage((prev) =>
        prev === "/Photo.jpg" ? oeufdepaque : "/Photo.jpg"
      );
      setClickCount(0);
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) console.error("Error fetching projects:", error);
      else setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start p-10 relative overflow-hidden">

      {/* Floating HUD shapes */}
      <motion.div
        className="absolute w-96 h-96 bg-accent/10 rounded-full top-1/4 left-1/4 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-accent/10 rounded-full top-1/2 right-1/4 blur-3xl"
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
        <a href="#hero" className="text-white/70 hover:text-accent transition">Accueil</a>
        <a href="#projects" className="text-white/70 hover:text-accent transition">Projets</a>
        <a href="#contact" className="text-white/70 hover:text-accent transition">Contact</a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-10 shadow-lg flex flex-col items-center text-center mb-16"
      >
        <div className="self-end mb-4">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="text-white/70 hover:text-accent transition px-3 py-1 border border-white/20 rounded-lg"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>

        <motion.img
          src={profileImage}
          alt="Gabin"
          className="w-40 h-40 rounded-full border-4 border-accent/30 mb-6 object-cover cursor-default"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={handleProfileClick}
        />

        <motion.h1
          className="text-white text-4xl sm:text-5xl font-semibold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {texts[lang].greeting}
        </motion.h1>

        <motion.p
          className="text-white/70 text-lg sm:text-xl mb-8 max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {texts[lang].intro}
        </motion.p>

        <motion.a
          href="#projects"
          className="bg-accent text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {texts[lang].button}
        </motion.a>
      </motion.div>

      {/* ABOUT */}
      <motion.div
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-10 shadow-lg mb-16"
      >
        <h2 className="text-white text-3xl font-semibold mb-4">{texts[lang].aboutTitle}</h2>
        <p className="text-white/70 text-lg">{texts[lang].aboutText}</p>
      </motion.div>

      {/* SKILLS */}
      <motion.div
        id="skills"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-10 shadow-lg mb-16"
      >
        <h2 className="text-white text-3xl font-semibold mb-6">{texts[lang].skillsTitle}</h2>

        {["language", "framework", "software", "librarie"].map((type, idx) => {
          const [open, setOpen] = useState(false);
          const filteredSkills = skills.filter((s) => s.type === type);

          return (
            <div key={idx} className="mb-4 w-full">
              {/* Titre cliquable */}
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center bg-white/10 text-white/80 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition"
              >
                <span className="flex items-center gap-2">
                  <span>{typeIcons[type]}</span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </span>
                <span className="text-xl">{open ? "−" : "+"}</span>
              </button>

              {/* Contenu accordéon */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-2 flex flex-wrap gap-3 justify-center"
              >
                {filteredSkills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className={`px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 ${typeStyles[skill.type]} flex items-center gap-2`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <span className="text-lg">{typeIcons[skill.type]}</span>
                    <span className="text-sm sm:text-base">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* PROJECTS */}
      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-8 shadow-lg mb-16"
      >
        <h2 className="text-white text-3xl font-semibold mb-6">
          {texts[lang].projectsTitle}
        </h2>

        {/* Carousel container */}
        <div className="flex gap-6 overflow-visible pb-4">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="bg-glass backdrop-blur-glass rounded-2xl border border-white/10 px-4 py-5 cursor-pointer flex flex-col items-center justify-center text-white/80 will-change-transform min-w-[160px] aspect-square overflow-visible"
              whileHover={{ scale: 1.05, y: -10, boxShadow: "0 25px 50px rgba(61,245,255,0.2)" }}
            >
              <img
                src={p.image_url}
                alt={p.name}
                className="w-24 h-24 rounded-xl mb-3 object-cover"
              />
              <span className="text-lg font-medium">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MODALE */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-8 max-w-md w-full shadow-2xl text-white relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-accent transition"
            >
              ✕
            </button>

            <img
              src={selectedProject.image_url}
              alt={selectedProject.name}
              className="w-full h-48 object-contain rounded-xl mb-6"
            />

            <h3 className="text-2xl font-semibold text-center mb-4">{selectedProject.name}</h3>
            <p className="text-white/70 text-center mb-6">{selectedProject.description}</p>

            <div className="flex justify-center">
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-black font-semibold px-6 py-3 rounded-2xl hover:scale-105 transition-transform"
              >
                Link to the project
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CONTACT */}
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-glass backdrop-blur-glass rounded-3xl border border-white/10 p-10 shadow-lg mb-16 text-center"
      >
        <h2 className="text-white text-3xl font-semibold mb-4">
          {texts[lang].contactTitle}
        </h2>
        <p className="text-white/70 mb-10">
          {texts[lang].contactText}
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {contacts.map((c, i) => {
            const Icon = c.icon;

            return (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-glass backdrop-blur-glass rounded-2xl border border-white/10 w-32 h-32 flex flex-col items-center justify-center text-white/80 cursor-pointer will-change-transform"
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  rotate: [0, 2, -2, 0],
                  boxShadow: "0 30px 60px rgba(61,245,255,0.25)",
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="text-4xl mb-2 text-accent" />
                <span className="text-sm font-medium">{c.name}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
