import { useEffect, useState, type CSSProperties } from "react";
import { portfolio } from "./data/portfolio";
import {
  UserRound,
  FolderKanban,
  FileText,
  Bot,
  Mail,
  Search,
  Wifi,
  BatteryFull,
  Volume2,
  Power,
  Minus,
  X,
  Globe,
  ExternalLink,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Sparkles,
  FileSearch,
} from "lucide-react";
import {
  checkBackendHealth,
  getPortfolio,
  streamPortfolioAI,
  matchResumeWithJD,
  matchResumeWithJDPdf,
  type PortfolioProfile,
  type JDMatchResult,
  type ChatMessage,
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
  icon: typeof UserRound;
  desktopIcon: string;
};
const apps: DesktopApp[] = [
  {
    id: "about",
    title: "About Me",
    subtitle: "Get to know me",
    icon: UserRound,
    desktopIcon: "/icons/about.svg",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Things I've built",
    icon: FolderKanban,
    desktopIcon: "/icons/folder.svg",
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
    icon: Bot,
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
  { id: "about", title: "About Me", subtitle: "Get to know Sagar", iconSrc: "/icons/about.svg", appId: "about" },
  { id: "projects", title: "Projects", subtitle: "Explore projects", iconSrc: "/icons/folder.svg", appId: "projects" },
  { id: "resume", title: "Resume PDF", subtitle: "Open resume PDF", iconSrc: "/icons/pdf.svg", appId: "resume" },
  { id: "portfolio", title: "Portfolio", subtitle: "Open portfolio overview", iconSrc: "/icons/portfolio.svg", appId: "about" },
  { id: "ai", title: "AI Assistant", subtitle: "Ask Sagar's AI", iconSrc: "/icons/ai-assistant.svg", appId: "ai" },
  { id: "jd-matcher", title: "JD Matcher", subtitle: "Match a job description", iconSrc: "/icons/jd-matcher.svg", appId: "jd-matcher" },
  { id: "github", title: "GitHub", subtitle: "Open GitHub profile", iconSrc: "/icons/github.svg", href: "https://github.com/sagarrsinghh" },
  { id: "linkedin", title: "LinkedIn", subtitle: "Open LinkedIn profile", iconSrc: "/icons/linkedin.svg", href: "https://www.linkedin.com/in/sagarrsingh/" },
  { id: "email", title: "Email", subtitle: "Email Sagar", iconSrc: "/icons/mail.svg", href: "mailto:sagarrsinghh11@gmail.com" },
];
function App() {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
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
  const projects = profileData?.projects ?? portfolio.projects;
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

    // Capture previous completed messages before adding the new question.
    const history: ChatMessage[] = chatMessages
      .filter((item) => item.content.trim().length > 0)
      .slice(-10)
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    setChatInput("");
    setChatError("");
    setChatLoading(true);

    setChatMessages((previous) => [
      ...previous,
      { role: "user", content: question },
      { role: "assistant", content: "" },
    ]);

    try {
      await streamPortfolioAI(
        question,
        (token) => {
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
        },
        history
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI.";

      setChatError(errorMessage);

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
            <div className="profile-hero">
              <div className="profile-avatar">SS</div>
              <div>
                <p className="eyebrow">DEVELOPER PORTFOLIO</p>
                <h2>{profileData?.name ?? portfolio.name}</h2>
                <p className="muted">
                  {profileData?.title ?? portfolio.title}
                </p>
              </div>
            </div>
            <p className="body-copy">
              {profileData?.summary ?? portfolio.summary}
            </p>
            {profileError && (
              <p className="muted small">
                Could not load the live profile: {profileError}
              </p>
            )}
            <div className="info-grid">
              <div className="info-card">
                <Code2 size={20} />
                <strong>Development</strong>
                <span>Java, TypeScript, Python</span>
              </div>
              <div className="info-card">
                <BriefcaseBusiness size={20} />
                <strong>Backend</strong>
                <span>APIs, authentication, databases</span>
              </div>
              <div className="info-card">
                <Sparkles size={20} />
                <strong>AI Projects</strong>
                <span>LLM integrations and AI APIs</span>
              </div>
              <div className="info-card">
                <GraduationCap size={20} />
                <strong>Education</strong>
                <span>B.Tech, Computer Science</span>
              </div>
            </div>
            <p className="muted small">
              Portfolio content will be refined and verified before launch.
            </p>
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
                  <div className="project-icon">
                    <FolderKanban size={22} />
                  </div>
                  <div className="project-details">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <span className="project-stack">
                      {project.stack.join(" · ")}
                    </span>
                    {project.url && (
                      <a
                        className="text-link"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View project <ExternalLink size={14} />
                      </a>
                    )}
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
            <div className="section-heading">
              <div>
                <p className="eyebrow">CAREER INTELLIGENCE</p>
                <h2>Resume vs Job Description</h2>
              </div>
              <FileSearch size={28} />
            </div>
            <p className="muted">
              Paste a job description to see how your skills,
              projects and experience align with the role.
            </p>
            <form
              className="jd-form"
              onSubmit={(event) => {
                event.preventDefault();
                void analyzeJobDescription();
              }}
            >
              <label htmlFor="jd-input">Job description</label>
              <textarea
                id="jd-input"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Paste the complete job description here..."
                minLength={50}
                maxLength={20000}
                required
                rows={9}
                disabled={jdLoading}
              />
              <div className="jd-form-footer">
                <span className="muted small">
                  {jobDescription.length}/20,000 characters
                </span>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={jdLoading || jobDescription.trim().length < 50}
                >
                  {jdLoading ? "Analyzing..." : "Analyze JD"}
                </button>
              </div>
            </form>
            <div className="jd-upload-section">
              <div className="jd-divider">
                <span>OR</span>
              </div>
              <label htmlFor="jd-pdf-input" className="jd-upload-label">
                <FileSearch size={22} />
                <span>
                  <strong>Upload Job Description PDF</strong>
                  <small>PDF only · Maximum 5 MB</small>
                </span>
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
                  <FileText size={18} />
                  <span>{jdPdfFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setJdPdfFile(null)}
                    disabled={jdLoading}
                  >
                    Remove
                  </button>
                </div>
              )}
              <button
                type="button"
                className="primary-button"
                onClick={() => void analyzeJobDescriptionPdf()}
                disabled={!jdPdfFile || jdLoading}
              >
                {jdLoading ? "Analyzing PDF..." : "Match PDF with my profile"}
              </button>
            </div>
            {jdError && (
              <p className="chat-error" role="alert">
                {jdError}
              </p>
            )}
            {jdLoading && (
              <p className="muted" role="status">
                Analyzing job requirements and comparing your profile...
              </p>
            )}
            {jdResult && (
              <div className="jd-results">
                <div className="jd-score-card">
                  <p className="eyebrow">SKILLS MATCH SCORE</p>
                  <strong>{jdResult.match_score}%</strong>
                  <div
                    className="jd-score-track"
                    role="progressbar"
                    aria-label="Skills match score"
                    aria-valuenow={Math.max(
                      0,
                      Math.min(100, Number(jdResult.match_score) || 0)
                    )}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="jd-score-fill"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, Number(jdResult.match_score) || 0)
                        )}%`,
                      }}
                    />
                  </div>
                  <h3>{jdResult.job_role}</h3>
                  <p className="muted small">
                    Candidate: {jdResult.candidate_name}
                  </p>
                  <p className="muted small">
                    Advisory estimate based on the available profile evidence.
                  </p>
                </div>
                <div className="jd-skill-summary">
                  <div className="jd-stat-card">
                    <span className="jd-stat-number">
                      {jdResult.matched_required_skills.length}
                    </span>
                    <span className="jd-stat-label">Required skills matched</span>
                  </div>
                  <div className="jd-stat-card">
                    <span className="jd-stat-number">
                      {jdResult.missing_required_skills.length}
                    </span>
                    <span className="jd-stat-label">Required skills missing</span>
                  </div>
                  <div className="jd-stat-card">
                    <span className="jd-stat-number">
                      {jdResult.matched_preferred_skills.length}
                    </span>
                    <span className="jd-stat-label">Preferred skills matched</span>
                  </div>
                </div>
                <p className="body-copy">
                  {jdResult.explanation.summary}
                </p>
                <section className="jd-result-section">
                  <h3>Matching required skills</h3>
                  <div className="tag-list">
                    {jdResult.matched_required_skills.length > 0 ? (
                      jdResult.matched_required_skills.map((skill) => (
                        <span className="skill-tag" key={skill}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="muted small">No matching required skills identified.</p>
                    )}
                  </div>
                </section>
                <section className="jd-result-section">
                  <h3>Missing required skills</h3>
                  <div className="tag-list">
                    {jdResult.missing_required_skills.length > 0 ? (
                      jdResult.missing_required_skills.map((skill) => (
                        <span className="skill-tag missing-tag" key={skill}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="muted small">
                        No missing required skills identified by this comparison.
                      </p>
                    )}
                  </div>
                </section>
                {jdResult.skill_evidence &&
                  jdResult.skill_evidence.length > 0 && (
                    <section className="jd-result-section">
                      <h3>Evidence from your profile</h3>
                      <div className="jd-evidence-list">
                        {jdResult.skill_evidence.map((item, index) => (
                          <article
                            className="jd-evidence-card"
                            key={`${item.skill}-${index}`}
                          >
                            <strong>{item.skill}</strong>
                            <p>{item.evidence}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                  )}
                <section className="jd-result-section">
                  <h3>Preferred skills</h3>
                  <p>
                    Matched: {jdResult.matched_preferred_skills.join(", ") || "None identified"}
                  </p>
                  <p>
                    Missing: {jdResult.missing_preferred_skills.join(", ") || "None identified"}
                  </p>
                </section>
                <section className="jd-result-section">
                  <h3>Relevant experience</h3>
                  {jdResult.explanation.relevant_experience.map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
                  <p className="muted small">
                    {jdResult.explanation.experience_requirement}
                  </p>
                </section>
                <section className="jd-result-section">
                  <h3>Relevant projects</h3>
                  {jdResult.explanation.relevant_projects.map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
                </section>
                <section className="jd-result-section">
                  <h3>Education</h3>
                  <p>{jdResult.explanation.education_requirement}</p>
                </section>
                <section className="jd-result-section">
                  <h3>Suggestions to improve</h3>
                  <ul>
                    {jdResult.explanation.improvement_suggestions.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
                <p className="muted small">{jdResult.notice}</p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => {
                    setJobDescription("");
                    setJdResult(null);
                    setJdError("");
                  }}
                >
                  Analyze another job
                </button>
              </div>
            )}
          </div>
        );
      case "ai":
        return (
          <div className="window-content ai-chat">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PORTFOLIO INTELLIGENCE</p>
                <h2>Ask about Sagar</h2>
              </div>
              <Bot size={28} />
            </div>
            <p className="muted">
              Ask about projects, skills, internships, and experience.
            </p>
            <div className="chat-messages" aria-live="polite">
              {chatMessages.length === 0 && (
                <div className="chat-welcome">
                  <Sparkles size={24} />
                  <p>Hi! What would you like to know about Sagar?</p>
                  <button
                    type="button"
                    onClick={() => void sendChatMessage("Tell me about Sagar's projects.")}
                  >
                    Tell me about his projects
                  </button>
                  <button
                    type="button"
                    onClick={() => void sendChatMessage("What technical skills does Sagar have?")}
                  >
                    Ask about technical skills
                  </button>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`chat-message ${message.role}`}
                >
                  <strong>
                    {message.role === "user" ? "You" : "Portfolio AI"}
                  </strong>
                  <p>{message.content}</p>
                </div>
              ))}
              {chatLoading && (
                <p className="muted">AI is thinking...</p>
              )}
            </div>
            {chatError && (
              <p className="chat-error" role="alert">{chatError}</p>
            )}
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
                placeholder="Ask something about Sagar..."
                aria-label="Message to portfolio AI"
                maxLength={2000}
                disabled={chatLoading}
              />
              <button
                className="primary-button"
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
              >
                {chatLoading ? "Sending..." : "Send"}
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
                <Sparkles size={25} strokeWidth={2.1} />
              </span>
              <div className="floating-ai-title">
                <strong>Ask Sagar's AI</strong>
                <span>
                  <i className={`floating-ai-status ${backendStatus === "Online" ? "is-online" : backendStatus === "Offline" ? "is-offline" : "is-connecting"}`} />
                  {backendStatus === "Online" ? "AI assistant online" : backendStatus === "Offline" ? "Assistant unavailable" : "Connecting to assistant…"}
                </span>
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
          <Sparkles size={27} strokeWidth={2.1} />
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
            className={`app-window ${isActive ? "window-active" : ""}`}
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
            <div className="mini-avatar">SS</div>
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
          {apps.map((app) => {
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
