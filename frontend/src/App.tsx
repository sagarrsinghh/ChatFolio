import { useEffect, useState, type CSSProperties } from "react";
import { portfolio } from "./data/portfolio";
import {
  FolderKanban,
  FileText,
  Mail,
  Search,
  Wifi,
  BatteryFull,
  Volume2,
  Power,
  Minus,
  Maximize2,
  X,
  Globe,
  ExternalLink,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  FileSearch,
  Laptop,
  Cpu,
  Database,
  CheckCircle2,
  Layers,
} from "lucide-react";
import {
  checkBackendHealth,
  getPortfolio,
  streamPortfolioAI,
  matchResumeWithJD,
  matchResumeWithJDPdf,
  type PortfolioProfile,
  type JDMatchResult,
} from "./api";
import "./App.css";
function Github({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function Linkedin({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function ChatGPTIcon({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6627zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}
type AppId =
  | "about"
  | "projects"
  | "resume"
  | "ai"
  | "jd-matcher"
  | "contact";
type DesktopApp = {
  id: AppId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  desktopIcon: string;
};
const apps: DesktopApp[] = [
  {
    id: "about",
    title: "This PC",
    subtitle: "System & Profile Specs",
    icon: Laptop,
    desktopIcon: "/icons/icons8-this-pc-windows-11-color-96.png",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Things I've built",
    icon: FolderKanban,
    desktopIcon: "/icons/folder.png",
  },
  {
    id: "resume",
    title: "Resume",
    subtitle: "Experience & skills",
    icon: FileText,
    desktopIcon: "/icons/pdf.svg",
  },
  {
    id: "ai",
    title: "AI Assistant",
    subtitle: "Ask about my work",
    icon: ChatGPTIcon,
    desktopIcon: "/icons/ai-assistant.svg",
  },
  {
    id: "jd-matcher",
    title: "JD Matcher",
    subtitle: "Compare a job with my profile",
    icon: FileSearch,
    desktopIcon: "/icons/jd-matcher.svg",
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Let's connect",
    icon: Mail,
    desktopIcon: "/icons/mail.svg",
  },
];
type DesktopShortcutItem = {
  id: string;
  title: string;
  subtitle: string;
  iconSrc: string;
  appId?: AppId;
  href?: string;
};
const desktopShortcuts: DesktopShortcutItem[] = [
  { id: "portfolio", title: "This PC", subtitle: "System & Profile Specs", iconSrc: "/icons/icons8-this-pc-windows-11-color-96.png", appId: "about" },
  { id: "projects", title: "Projects", subtitle: "Explore projects", iconSrc: "/icons/folder.png", appId: "projects" },
  { id: "resume", title: "Resume PDF", subtitle: "Open resume PDF", iconSrc: "/icons/pdf.svg", appId: "resume" },
  { id: "ai", title: "AI Assistant", subtitle: "Ask Sagar's AI", iconSrc: "/icons/ai-assistant.svg", appId: "ai" },
  { id: "jd-matcher", title: "JD Matcher", subtitle: "Match a job description", iconSrc: "/icons/jd-matcher.svg", appId: "jd-matcher" },
  { id: "github", title: "GitHub", subtitle: "Open GitHub profile", iconSrc: "/icons/github.svg", href: "https://github.com/sagarrsinghh" },
  { id: "linkedin", title: "LinkedIn", subtitle: "Open LinkedIn profile", iconSrc: "/icons/linkedin.svg", href: "https://www.linkedin.com/in/sagarrsingh/" },
  { id: "email", title: "Email", subtitle: "Email Sagar", iconSrc: "/icons/mail.svg", href: "mailto:sagarrsinghh11@gmail.com" },
];
function App() {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [maximizedApps, setMaximizedApps] = useState<AppId[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());
  const [backendStatus, setBackendStatus] = useState("Connecting...");
  const [contactEmail, setContactEmail] = useState("");
  const [aiGreetingVisible, setAiGreetingVisible] = useState(true);
  const [profileData, setProfileData] =
    useState<PortfolioProfile | null>(null);
  const [profileError, setProfileError] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jdPdfFile, setJdPdfFile] = useState<File | null>(null);
  const [jdResult, setJdResult] = useState<JDMatchResult | null>(null);
  const [jdLoading, setJdLoading] = useState(false);
  const [jdError, setJdError] = useState("");
  const [fullImageOpen, setFullImageOpen] = useState(false);


  const projects = portfolio.projects;
  useEffect(() => {
    if (!fullImageOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullImageOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullImageOpen]);


  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);


  useEffect(() => {
    checkBackendHealth()
      .then(() => setBackendStatus("Online"))
      .catch(() => setBackendStatus("Offline"));
  }, []);
  useEffect(() => {
    getPortfolio()
      .then((data) => {
        setProfileData(data);
        setProfileError("");
      })
      .catch((error: unknown) => {
        setProfileError(
          error instanceof Error
            ? error.message
            : "Could not load portfolio profile"
        );
      });
  }, []);
  const sendChatMessage = async (message?: string) => {
    const question = (message ?? chatInput).trim();
    if (!question || chatLoading) return;
    setChatInput("");
    setChatError("");
    setChatLoading(true);
    // Immediately show the recruiter's question and an empty AI response.
    setChatMessages((previous) => [
      ...previous,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ]);
    try {
      await streamPortfolioAI(question, (token) => {
        setChatMessages((previous) => {
          const updated = [...previous];
          const lastIndex = updated.length - 1;
          if (
            lastIndex >= 0 &&
            updated[lastIndex].role === "assistant"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: updated[lastIndex].content + token,
            };
          }
          return updated;
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI.";
      setChatError(errorMessage);
      // Avoid leaving an empty assistant message after a failure.
      setChatMessages((previous) => {
        const updated = [...previous];
        if (
          updated.length > 0 &&
          updated[updated.length - 1].role === "assistant" &&
          !updated[updated.length - 1].content
        ) {
          updated.pop();
        }
        return updated;
      });
    } finally {
      setChatLoading(false);
    }
  };
  async function analyzeJobDescription() {
    const description = jobDescription.trim();
    if (description.length < 50 || jdLoading) {
      return;
    }
    setJdLoading(true);
    setJdError("");
    setJdResult(null);
    try {
      const result = await matchResumeWithJD(description);
      setJdResult(result);
    } catch (error) {
      setJdError(
        error instanceof Error
          ? error.message
          : "Unable to analyze this job description."
      );
    } finally {
      setJdLoading(false);
    }
  }
  async function analyzeJobDescriptionPdf() {
    if (!jdPdfFile || jdLoading) return;
    if (jdPdfFile.size > 5 * 1024 * 1024) {
      setJdError("PDF must be 5 MB or smaller.");
      return;
    }
    if (!jdPdfFile.name.toLowerCase().endsWith(".pdf")) {
      setJdError("Please select a PDF file.");
      return;
    }
    setJdLoading(true);
    setJdError("");
    setJdResult(null);
    try {
      const result = await matchResumeWithJDPdf(jdPdfFile);
      setJdResult(result);
    } catch (error) {
      setJdError(
        error instanceof Error
          ? error.message
          : "Unable to analyze this PDF."
      );
    } finally {
      setJdLoading(false);
    }
  }
  function openApp(id: AppId) {
    if (id === "resume") {
      window.open("/resume.pdf", "_blank");
      setStartOpen(false);
      return;
    }
    setOpenApps((current) =>
      current.includes(id) ? current : [...current, id]
    );
    setActiveApp(id);
    setStartOpen(false);
  }
  function closeApp(id: AppId) {
    setOpenApps((current) => current.filter((app) => app !== id));
    if (activeApp === id) {
      const remaining = openApps.filter((app) => app !== id);
      setActiveApp(remaining.at(-1) ?? null);
    }
  }
  const visibleApps = apps.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );
  function renderWindow(id: AppId) {
    switch (id) {
      case "about":
        return (
          <div className="window-content about-content">
            {/* Hero banner */}
            <div className="about-hero-banner">
              <div
                className="about-avatar-ring clickable-avatar"
                onClick={() => setFullImageOpen(true)}
                title="Click to view full photo"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setFullImageOpen(true);
                  }
                }}
              >
                <div className="profile-avatar">
                  <img
                    src="/profile.jpg"
                    alt={profileData?.name ?? portfolio.name}
                    className="profile-avatar-img"
                  />
                  <div className="avatar-hover-overlay">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
              <div className="about-hero-text">
                <p className="eyebrow">THIS PC · DEVELOPER PROFILE</p>
                <h2>{profileData?.name ?? portfolio.name}</h2>
                <p className="about-title-tag">
                  Full-Stack Developer · Backend Engineer · AI Systems
                </p>
                <div className="about-badges-row">
                  <span className="about-pill">
                    <Globe size={12} /> Jaipur, Rajasthan, India
                  </span>
                  <span className="about-pill about-pill--green">
                    <CheckCircle2 size={12} /> Open to Roles
                  </span>
                  <span className="about-pill about-pill--blue">
                    <GraduationCap size={12} /> B.Tech CSE (2022–2026)
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="about-summary-card">
              <p className="about-summary-text">
                Computer Science and Engineering graduate with solid practical experience building scalable backend architectures, high-performance REST APIs, full-stack applications, and AI-integrated workflows. Strong command over NestJS, Node.js, TypeScript, Python, and relational database design, backed by real-world state data center internship exposure.
              </p>
            </div>
            {profileError && (
              <p className="muted small">Could not load the live profile: {profileError}</p>
            )}

            {/* System Specifications Section (Windows 11 Specs Style) */}
            <div className="about-section-header">
              <Laptop size={14} />
              <span>DEVELOPER &amp; SYSTEM SPECIFICATIONS</span>
            </div>
            <div className="about-specs-card">
              <div className="about-specs-grid">
                <div className="about-spec-item">
                  <span className="spec-label">Full Name</span>
                  <span className="spec-value">Sagar Singh</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Primary Roles</span>
                  <span className="spec-value">Full-Stack Developer, Backend Engineer, AI Engineer</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Education</span>
                  <span className="spec-value">B.Tech in CSE · JECRC University (2022–2026 · CGPA 7.9)</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Academic Status</span>
                  <span className="spec-value">Academic Requirements Completed</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Core Backend Stack</span>
                  <span className="spec-value">NestJS, Node.js, TypeScript, Python, REST APIs, JWT, RBAC</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Databases &amp; ORM</span>
                  <span className="spec-value">MySQL, PostgreSQL, TypeORM, Database Indexing &amp; Schemas</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">AI &amp; LLM Stack</span>
                  <span className="spec-value">OpenAI API, Claude API, Gemini API, Prompt Engineering, RAG</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Industry Internship</span>
                  <span className="spec-value">Project Intern · DoIT&amp;C / Bhamashah State Data Centre (BSDC)</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">DevOps &amp; Tools</span>
                  <span className="spec-value">Docker, Git, GitHub, Postman, Swagger / OpenAPI, Vercel</span>
                </div>
                <div className="about-spec-item">
                  <span className="spec-label">Location &amp; Timezone</span>
                  <span className="spec-value">Jaipur, Rajasthan, India (IST / UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Core Competencies Cards */}
            <div className="about-section-header">
              <Cpu size={14} />
              <span>TECHNICAL COMPETENCIES &amp; SKILLS</span>
            </div>
            <div className="info-grid">
              <div className="info-card info-card--blue">
                <div className="info-card-icon-wrap info-card-icon-wrap--blue">
                  <Code2 size={18} />
                </div>
                <div className="info-card-body">
                  <strong>Backend &amp; APIs</strong>
                  <span>NestJS · Node.js · REST APIs · JWT Auth · RBAC</span>
                </div>
              </div>
              <div className="info-card info-card--teal">
                <div className="info-card-icon-wrap info-card-icon-wrap--teal">
                  <Database size={18} />
                </div>
                <div className="info-card-body">
                  <strong>Databases &amp; Storage</strong>
                  <span>MySQL · PostgreSQL · TypeORM · Schema Design</span>
                </div>
              </div>
              <div className="info-card info-card--purple">
                <div className="info-card-icon-wrap info-card-icon-wrap--purple">
                  <ChatGPTIcon size={18} />
                </div>
                <div className="info-card-body">
                  <strong>AI &amp; LLM Systems</strong>
                  <span>Claude · OpenAI · Gemini APIs · Prompt Engineering</span>
                </div>
              </div>
              <div className="info-card info-card--amber">
                <div className="info-card-icon-wrap info-card-icon-wrap--amber">
                  <Layers size={18} />
                </div>
                <div className="info-card-body">
                  <strong>Languages &amp; Tools</strong>
                  <span>Python · TypeScript · Java · C++ · Docker · Git</span>
                </div>
              </div>
            </div>

            {/* Practical Experience Section */}
            <div className="about-section-header">
              <BriefcaseBusiness size={14} />
              <span>EXPERIENCE &amp; INTERNSHIP</span>
            </div>
            <div className="about-experience-card">
              <div className="about-exp-header">
                <div>
                  <h4>Project Intern</h4>
                  <p className="about-exp-org">Department of Information Technology &amp; Communication (DoIT&amp;C) / BSDC</p>
                </div>
                <span className="about-exp-period">Feb 2026 – June 2026</span>
              </div>
              <ul className="about-exp-bullets">
                <li>Automated ingestion, processing, and visualization of data center infrastructure metrics from Excel &amp; PowerPoint reports.</li>
                <li>Built robust backend REST endpoints with NestJS, TypeScript, and TypeORM integrated with MySQL databases.</li>
                <li>Implemented secure JWT authentication and role-based access control (RBAC) across data monitoring views.</li>
              </ul>
            </div>

            {/* Featured Projects Highlight */}
            <div className="about-section-header">
              <FolderKanban size={14} />
              <span>NOTABLE ENGINEERING PROJECTS</span>
            </div>
            <div className="about-projects-preview-grid">
              <div className="about-project-mini">
                <div className="about-project-mini-title">
                  <strong>PromptAify</strong>
                  <span className="about-project-tag">AI Application</span>
                </div>
                <p>AI-powered code generation application with spoken and typed prompt processing, connecting to LLM endpoints through structured REST services.</p>
                <div className="tag-list">
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">Spring Boot</span>
                  <span className="skill-tag">OpenRouter API</span>
                  <span className="skill-tag">SQL</span>
                </div>
              </div>
              <div className="about-project-mini">
                <div className="about-project-mini-title">
                  <strong>Drag E-Commerce</strong>
                  <span className="about-project-tag">Full-Stack</span>
                </div>
                <p>Full-stack modern e-commerce web platform featuring secure authentication, catalog search, cart workflows, and relational data architecture.</p>
                <div className="tag-list">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">NestJS</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">TypeORM</span>
                  <span className="skill-tag">MySQL</span>
                </div>
              </div>
              <div className="about-project-mini">
                <div className="about-project-mini-title">
                  <strong>Windows AI Portfolio OS</strong>
                  <span className="about-project-tag">Interactive OS</span>
                </div>
                <p>Interactive web desktop OS operating system showcasing live streaming AI interview chatbot and algorithmic ATS resume-to-JD job matcher.</p>
                <div className="tag-list">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">FastAPI</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Gemini API</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="window-content">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SELECTED WORK</p>
                <h2>Projects</h2>
              </div>
              <span className="count-pill">{projects.length} projects</span>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-icon project-preview">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <FolderKanban size={22} />
                    )}
                  </div>
                  <div className="project-details">
                    <h3>{project.name}</h3>
                    {"subtitle" in project && project.subtitle && (
                      <p className="project-subtitle">{project.subtitle}</p>
                    )}
                    <p>{project.description}</p>
                    <span className="project-stack">
                      {project.stack.join(" · ")}
                    </span>
                    <div className="project-card-links">
                      {"githubUrl" in project && project.githubUrl && (
                        <a
                          className="text-link"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub <ExternalLink size={14} />
                        </a>
                      )}
                      {project.url && (
                        <a
                          className="text-link"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live demo <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="window-content">
            <p className="eyebrow">PROFESSIONAL PROFILE</p>
            <h2>Skills & Education</h2>
            <div className="resume-section">
              <h3>Programming</h3>
              <div className="tag-list">
                {["Java", "TypeScript", "JavaScript", "Python", "SQL"].map(
                  (skill) => <span className="skill-tag" key={skill}>{skill}</span>
                )}
              </div>
            </div>
            <div className="resume-section">
              <h3>Backend & Databases</h3>
              <div className="tag-list">
                {["NestJS", "FastAPI", "REST APIs", "MySQL", "JWT"].map(
                  (skill) => <span className="skill-tag" key={skill}>{skill}</span>
                )}
              </div>
            </div>
            <div className="resume-section">
              <h3>Frontend</h3>
              <div className="tag-list">
                {["React", "Vite", "HTML", "CSS", "Tailwind CSS"].map(
                  (skill) => <span className="skill-tag" key={skill}>{skill}</span>
                )}
              </div>
            </div>
            <div className="resume-section">
              <h3>Experience</h3>
              {(profileData?.experience ?? portfolio.experience).map((item, index) => (
                <div key={`${item.organization}-${index}`}>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                  <p>{item.period}</p>
                </div>
              ))}
            </div>
            <div className="resume-section">
              <h3>Education</h3>
              {(profileData?.education ?? portfolio.education).map((item, index) => (
                <div key={`${item.institution}-${index}`}>
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                  <p>{item.period} · {item.result}</p>
                </div>
              ))}
            </div>
            <p className="muted small">
              These are starter details. We'll verify the final resume content
              before publishing it.
            </p>
          </div>
        );
      case "jd-matcher":
        return (
          <div className="window-content jd-matcher">
            {/* Header */}
            <div className="jd-header">
              <div className="jd-header-icon">
                <FileSearch size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="eyebrow">CAREER INTELLIGENCE</p>
                <h2>Resume vs Job Description</h2>
              </div>
            </div>
            <p className="jd-subtitle">
              Paste or upload a job description to see exactly how your skills, projects, and experience align.
            </p>

            {/* Input form */}
            <div className="jd-input-card">
              <form
                className="jd-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  void analyzeJobDescription();
                }}
              >
                <label htmlFor="jd-input">Paste Job Description</label>
                <textarea
                  id="jd-input"
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the complete job description here…"
                  minLength={50}
                  maxLength={20000}
                  required
                  rows={7}
                  disabled={jdLoading}
                />
                <div className="jd-form-footer">
                  <span className="muted small">{jobDescription.length} / 20,000</span>
                  <button
                    className="jd-analyze-btn"
                    type="submit"
                    disabled={jdLoading || jobDescription.trim().length < 50}
                  >
                    {jdLoading ? "Analyzing…" : "Analyze JD"}
                  </button>
                </div>
              </form>

              <div className="jd-divider"><span>OR</span></div>

              {/* PDF upload */}
              <div className="jd-upload-zone">
                <label htmlFor="jd-pdf-input" className="jd-upload-label">
                  <div className="jd-upload-icon"><FileSearch size={20} /></div>
                  <div>
                    <strong>Upload Job Description PDF</strong>
                    <small>PDF only · Max 5 MB</small>
                  </div>
                </label>
                <input
                  id="jd-pdf-input"
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={jdLoading}
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0] ?? null;
                    setJdPdfFile(selectedFile);
                    setJdError("");
                    setJdResult(null);
                  }}
                />
                {jdPdfFile && (
                  <div className="jd-selected-file">
                    <FileText size={16} />
                    <span>{jdPdfFile.name}</span>
                    <button type="button" onClick={() => setJdPdfFile(null)} disabled={jdLoading}>✕</button>
                  </div>
                )}
                <button
                  type="button"
                  className="jd-analyze-btn"
                  onClick={() => void analyzeJobDescriptionPdf()}
                  disabled={!jdPdfFile || jdLoading}
                >
                  {jdLoading ? "Analyzing PDF…" : "Match PDF with my profile"}
                </button>
              </div>
            </div>

            {jdError && <p className="chat-error" role="alert">{jdError}</p>}
            {jdLoading && (
              <div className="jd-loading-state" role="status">
                <div className="jd-loading-dots"><span /><span /><span /></div>
                <p>Analyzing job requirements and matching your profile…</p>
              </div>
            )}

            {/* Results */}
            {jdResult && (
              <div className="jd-results">
                {/* Score hero */}
                <div className="jd-score-card">
                  <div className="jd-score-left">
                    <p className="eyebrow">MATCH SCORE</p>
                    <div className="jd-score-number">{jdResult.match_score}<span>%</span></div>
                    <div
                      className="jd-score-track"
                      role="progressbar"
                      aria-label="Skills match score"
                      aria-valuenow={Math.max(0, Math.min(100, Number(jdResult.match_score) || 0))}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="jd-score-fill"
                        style={{ width: `${Math.max(0, Math.min(100, Number(jdResult.match_score) || 0))}%` }}
                      />
                    </div>
                  </div>
                  <div className="jd-score-right">
                    <p className="jd-score-role">{jdResult.job_role}</p>
                    <p className="jd-score-candidate">Candidate: {jdResult.candidate_name}</p>
                    <p className="jd-score-notice">Advisory estimate based on available profile evidence.</p>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="jd-skill-summary">
                  <div className="jd-stat-card jd-stat-card--green">
                    <span className="jd-stat-number">{jdResult.matched_required_skills.length}</span>
                    <span className="jd-stat-label">Required matched</span>
                  </div>
                  <div className="jd-stat-card jd-stat-card--red">
                    <span className="jd-stat-number">{jdResult.missing_required_skills.length}</span>
                    <span className="jd-stat-label">Required missing</span>
                  </div>
                  <div className="jd-stat-card jd-stat-card--blue">
                    <span className="jd-stat-number">{jdResult.matched_preferred_skills.length}</span>
                    <span className="jd-stat-label">Preferred matched</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="body-copy jd-summary-text">{jdResult.explanation.summary}</p>

                {/* Skill sections */}
                <div className="jd-sections-grid">
                  <section className="jd-result-section jd-result-section--match">
                    <h3><span className="jd-section-dot jd-section-dot--green" />Matching Required Skills</h3>
                    <div className="tag-list">
                      {jdResult.matched_required_skills.length > 0 ? (
                        jdResult.matched_required_skills.map((skill) => (
                          <span className="skill-tag skill-tag--match" key={skill}>{skill}</span>
                        ))
                      ) : (
                        <p className="muted small">No matching required skills identified.</p>
                      )}
                    </div>
                  </section>

                  <section className="jd-result-section jd-result-section--miss">
                    <h3><span className="jd-section-dot jd-section-dot--red" />Missing Required Skills</h3>
                    <div className="tag-list">
                      {jdResult.missing_required_skills.length > 0 ? (
                        jdResult.missing_required_skills.map((skill) => (
                          <span className="skill-tag missing-tag" key={skill}>{skill}</span>
                        ))
                      ) : (
                        <p className="muted small">No missing required skills identified.</p>
                      )}
                    </div>
                  </section>
                </div>

                {jdResult.skill_evidence && jdResult.skill_evidence.length > 0 && (
                  <section className="jd-result-section">
                    <h3>Evidence from your profile</h3>
                    <div className="jd-evidence-list">
                      {jdResult.skill_evidence.map((item, index) => (
                        <article className="jd-evidence-card" key={`${item.skill}-${index}`}>
                          <strong>{item.skill}</strong>
                          <p>{item.evidence}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}


                <section className="jd-result-section">
                  <h3>Relevant Experience</h3>
                  {jdResult.explanation.relevant_experience.map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
                  <p className="muted small">{jdResult.explanation.experience_requirement}</p>
                </section>

                <section className="jd-result-section">
                  <h3>Relevant Projects</h3>
                  {jdResult.explanation.relevant_projects.map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
                </section>

                <section className="jd-result-section">
                  <h3>Education Fit</h3>
                  <p>{jdResult.explanation.education_requirement}</p>
                </section>

                <section className="jd-result-section">
                  <h3>💡 Suggestions to Improve</h3>
                  <ul className="jd-suggestions-list">
                    {jdResult.explanation.improvement_suggestions.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>

                <p className="muted small">{jdResult.notice}</p>
                <button
                  className="jd-analyze-btn"
                  type="button"
                  onClick={() => { setJobDescription(""); setJdResult(null); setJdError(""); }}
                >
                  ← Analyze another job
                </button>
              </div>
            )}
          </div>
        );
      case "ai":
        return (
          <div className="window-content ai-chat">
            {/* Header */}
            <div className="ai-header">
              <div className="ai-header-icon">
                <ChatGPTIcon size={22} />
              </div>
              <div className="ai-header-text">
                <p className="eyebrow">PORTFOLIO INTELLIGENCE</p>
                <h2>Ask about Sagar</h2>
              </div>
            </div>
            <p className="ai-subtitle">
              Chat with Sagar's AI — ask about projects, skills, internships, or experience.
            </p>

            {/* Message thread */}
            <div className="chat-messages" aria-live="polite">
              {chatMessages.length === 0 && (
                <div className="chat-welcome">
                  <div className="chat-welcome-icon">
                    <ChatGPTIcon size={28} />
                  </div>
                  <p className="chat-welcome-title">Hi! What would you like to know about Sagar?</p>
                  <div className="chat-suggestion-row">
                    <button
                      type="button"
                      className="chat-suggestion-chip"
                      onClick={() => void sendChatMessage("Tell me about Sagar's projects.")}
                    >
                      🗂️ Tell me about his projects
                    </button>
                    <button
                      type="button"
                      className="chat-suggestion-chip"
                      onClick={() => void sendChatMessage("What technical skills does Sagar have?")}
                    >
                      💻 Technical skills
                    </button>
                    <button
                      type="button"
                      className="chat-suggestion-chip"
                      onClick={() => void sendChatMessage("What internship experience does Sagar have?")}
                    >
                      🏢 Internship experience
                    </button>
                  </div>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`chat-message ${message.role}`}
                >
                  <div className="chat-message-label">
                    <span className={`chat-bubble-dot chat-bubble-dot--${message.role}`} />
                    <strong>{message.role === "user" ? "You" : "Portfolio AI"}</strong>
                  </div>
                  <p>{message.content}</p>
                </div>
              ))}
              {chatLoading && (
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              )}
            </div>
            {chatError && (
              <p className="chat-error" role="alert">{chatError}</p>
            )}

            {/* Input row */}
            <form
              className="chat-input-form"
              onSubmit={(event) => {
                event.preventDefault();
                void sendChatMessage();
              }}
            >
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask anything about Sagar…"
                aria-label="Message to portfolio AI"
                maxLength={2000}
                disabled={chatLoading}
              />
              <button
                className="chat-send-btn"
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                aria-label="Send message"
              >
                {chatLoading ? "…" : <ArrowUpRight size={18} strokeWidth={2.2} />}
              </button>
            </form>
          </div>
        );
      case "contact":
        return (
          <div className="window-content">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Let's connect</h2>
            <p className="body-copy">
              Interested in collaborating or discussing an opportunity?
              Reach out through one of my profiles.
            </p>
            <div className="social-links">
              <a
                href="https\://github.com/sagarrsinghh"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={19} /> GitHub <ArrowUpRight size={15} />
              </a>
              <a
                href="https\://www\.linkedin.com/in/sagarrsingh"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={19} /> LinkedIn <ArrowUpRight size={15} />
              </a>
              <a href="mailto:sagarrsinghh11\@gmail.com">
                <Mail size={19} /> Email <ArrowUpRight size={15} />
              </a>
              <a
                href="https\://sgrportfolio.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <Globe size={19} /> Existing portfolio <ArrowUpRight size={15} />
              </a>
            </div>
            <form
              className="contact-preview"
              onSubmit={(event) => {
                event.preventDefault();
                window.location.href = `mailto:sagarrsinghh11\@gmail.com?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent("Please contact me at: " + contactEmail)}`;
              }}
            >
              <label htmlFor="contact-email">Your email address</label>
              <input
                id="contact-email"
                type="email"
                required
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="you\@example.com"
              />
              <button className="primary-button" type="submit">
                Start an email
              </button>
              <p className="muted small">
                This opens your email application. Database-backed messaging
                will be implemented later.
              </p>
            </form>
          </div>
        );
    }
  }
  return (
    <main className="desktop" onClick={() => startOpen && setStartOpen(false)}>
      <div className="desktop-shortcuts">
        {desktopShortcuts.map((item) => {
          const shortcutContent = (
            <>
              <span className="desktop-icon">
                <img src={item.iconSrc} alt="" draggable={false} />
              </span>
              <span>{item.title}</span>
            </>
          );
          if (item.href) {
            return (
              <a
                className="desktop-shortcut"
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={item.subtitle}
                onClick={(event) => event.stopPropagation()}
              >
                {shortcutContent}
              </a>
            );
          }
          return (
            <button
              className="desktop-shortcut"
              key={item.id}
              type="button"
              title={item.subtitle}
              onClick={(event) => {
                event.stopPropagation();
                if (item.appId) openApp(item.appId);
              }}
            >
              {shortcutContent}
            </button>
          );
        })}
      </div>
      {/* Desktop Center Ambient Hero Greeting */}
      <div className="desktop-center-intro" aria-hidden="true">
        <h1 className="desktop-intro-title">
          Hey, I’m <span className="desktop-intro-name">Sagar</span>
        </h1>
        <p className="desktop-intro-tagline">
          Welcome to my <span className="desktop-intro-highlight">ChatFolio</span>
        </p>
      </div>
      {/* Floating AI Assistant: visible on first load, dismissible greeting, persistent launcher. */}
      <aside className="floating-ai" onClick={(event) => event.stopPropagation()} aria-label="AI portfolio assistant">
        {aiGreetingVisible && (
          <div className="floating-ai-card" role="region" aria-label="Meet the AI assistant">
            <button
              type="button"
              className="floating-ai-close"
              aria-label="Dismiss AI greeting"
              onClick={() => setAiGreetingVisible(false)}
            >
              <X size={15} />
            </button>
            <div className="floating-ai-heading">
              <span className="floating-ai-logo" aria-hidden="true">
                <ChatGPTIcon size={24} />
              </span>
              <div className="floating-ai-title">
                <strong>Ask Sagar's AI</strong>
              </div>
            </div>
            <p>Hey! Curious about my projects, skills, or experience? Ask me anything.</p>
            <button
              type="button"
              className="floating-ai-cta"
              onClick={() => {
                setAiGreetingVisible(false);
                openApp("ai");
              }}
            >
              Chat with AI <ArrowUpRight size={16} />
            </button>
          </div>
        )}
        <button
          type="button"
          className="floating-ai-trigger"
          aria-label="Open AI Assistant"
          title="Ask Sagar's AI"
          onClick={() => openApp("ai")}
        >
          <ChatGPTIcon size={26} />
          <span className="floating-ai-trigger-dot" />
        </button>
      </aside>

      {openApps.map((id, index) => {
        const app = apps.find((item) => item.id === id);
        if (!app) return null;
        const isActive = activeApp === id;
        return (
          <section
            key={id}
            className={`app-window ${isActive ? "window-active" : ""} ${maximizedApps.includes(id) ? "window-maximized" : ""}`}
            style={{
              zIndex: isActive ? 100 : 20 + index,
              display: "flex",
              "--window-offset-x": `${[0, -76, 86, -112, 64, 12][index % 6]}px`,
              "--window-offset-y": `${[0, -34, 28, 48, -66, 72][index % 6]}px`,
            } as CSSProperties}
            onMouseDown={() => setActiveApp(id)}
          >
            <header className="window-titlebar">
              <div className="window-title">
                <img className="window-app-icon" src={app.desktopIcon} alt="" draggable={false} />
                <span>{app.title}</span>
              </div>
              <div className="window-controls">
                <button
                  aria-label="Minimize window"
                  onClick={() => {
                    setOpenApps((current) => current.filter((item) => item !== id));
                    setActiveApp(null);
                  }}
                >
                  <Minus size={15} />
                </button>
                <button
                  aria-label={maximizedApps.includes(id) ? "Restore window" : "Maximize window"}
                  title={maximizedApps.includes(id) ? "Restore" : "Maximize"}
                  onClick={() => setMaximizedApps((current) =>
                    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
                  )}
                >
                  <Maximize2 size={13} />
                </button>
                <button
                  className="close-control"
                  aria-label="Close window"
                  onClick={() => closeApp(id)}
                >
                  <X size={16} />
                </button>
              </div>
            </header>
            {renderWindow(id)}
          </section>
        );
      })}
      {startOpen && (
        <section
          className="start-menu"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="start-profile">
            <div
              className="mini-avatar clickable-avatar"
              onClick={() => setFullImageOpen(true)}
              title="Click to view full photo"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setFullImageOpen(true);
                }
              }}
            >
              <img
                src="/profile.jpg"
                alt="Sagar Singh"
                className="profile-avatar-img"
              />
            </div>
            <div>
              <strong>Sagar Singh</strong>
              <span>Portfolio workspace</span>
            </div>
          </div>
          <div className="start-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search apps"
              aria-label="Search desktop apps"
            />
          </div>
          <div className="start-section-title">Pinned</div>
          <div className="start-app-grid">
            {visibleApps.map((app) => {
              return (
                <button key={app.id} onClick={() => openApp(app.id)}>
                  <span className={`start-app-icon icon-${app.id}`}>
                    <img src={app.desktopIcon} alt="" draggable={false} />
                  </span>
                  <span>{app.title}</span>
                </button>
              );
            })}
            {visibleApps.length === 0 && (
              <p className="muted small">No apps found.</p>
            )}
          </div>
          <div className="start-footer">
            <span>Windows Portfolio</span>
            <button
              title="Close Start menu"
              aria-label="Close Start menu"
              onClick={() => setStartOpen(false)}
            >
              <Power size={17} />
            </button>
          </div>
        </section>
      )}

      {/* Full Photo Lightbox / Preview */}
      {fullImageOpen && (
        <div
          className="image-lightbox-backdrop"
          onClick={() => setFullImageOpen(false)}
        >
          <div
            className="image-lightbox-window"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="image-lightbox-titlebar">
              <div className="image-lightbox-info">
                <span className="image-lightbox-dot" />
                <span className="image-lightbox-title">Photos — Sagar Singh</span>
              </div>
              <div className="image-lightbox-actions">
                <a
                  href="/profile.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-lightbox-action-btn"
                  title="Open original image in new tab"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  className="image-lightbox-close-btn"
                  onClick={() => setFullImageOpen(false)}
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="image-lightbox-content">
              <img
                src="/profile.jpg"
                alt="Sagar Singh"
                className="image-lightbox-image"
              />
            </div>
          </div>
        </div>
      )}

      <footer className="taskbar">
        <div className="taskbar-left">
          <span className="weather-icon">☀</span>
          <span className="weather-text">Clear skies</span>
        </div>
        <div className="taskbar-center">
          <button
            className={`taskbar-button windows-button ${startOpen ? "selected" : ""}`}
            aria-label="Open Start menu"
            onClick={(event) => {
              event.stopPropagation();
              setStartOpen((current) => !current);
            }}
          >
            <img className="windows-logo" src="/icons/windows.svg" alt="" draggable={false} />
          </button>
          <button
            className="taskbar-search"
            onClick={(event) => {
              event.stopPropagation();
              setStartOpen(true);
            }}
          >
            <Search size={17} />
            <span>Search</span>
          </button>
          {apps
            .filter((app) => app.id !== "about")
            .map((app) => {
              return (
                <button
                  className={`taskbar-button ${openApps.includes(app.id) ? "taskbar-open" : ""} ${activeApp === app.id ? "taskbar-active" : ""}`}
                  key={app.id}
                  title={app.title}
                  onClick={() => {
                    if (openApps.includes(app.id) && activeApp === app.id) {
                      setOpenApps((current) => current.filter((item) => item !== app.id));
                      setActiveApp(null);
                    } else {
                      openApp(app.id);
                    }
                  }}
                >
                  <img className="taskbar-app-icon" src={app.desktopIcon} alt="" draggable={false} />
                </button>
              );
            })}
        </div>
        <div className="taskbar-right">
          <div className="system-status" title={`Backend: ${backendStatus}`}>
            <Wifi size={16} />
            <Volume2 size={16} />
            <BatteryFull size={18} />
          </div>
          <div className="clock">
            <span>
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>{time.toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
export default App;
