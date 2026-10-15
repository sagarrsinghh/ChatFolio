const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/api/v1/health`);

  if (!response.ok) {
    throw new Error(`Backend returned HTTP ${response.status}`);
  }

  return response.json() as Promise<{
    status: string;
    service: string;
  }>;
}


export type PortfolioProject = {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  url: string;
};

export type PortfolioProfile = {
  name: string;
  title: string;
  location: string;
  email: string;
  summary: string;

  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };

  education: {
    degree: string;
    institution: string;
    period: string;
    result: string;
  }[];

  experience: {
    role: string;
    organization: string;
    period: string;
  }[];

  projects: PortfolioProject[];
};

export async function getPortfolio(): Promise<PortfolioProfile> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/portfolio`
  );

  if (!response.ok) {
    throw new Error(`Portfolio API returned HTTP ${response.status}`);
  }

  return response.json() as Promise<PortfolioProfile>;
}

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function askPortfolioAI(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as { answer: string };
  return data.answer;
}

export async function streamPortfolioAI(
  message: string,
  onToken: (token: string) => void,
  history: ChatMessage[] = []
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/ai/chat/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    }
  );

  if (!response.ok) {
    throw new Error(`AI request failed (${response.status}).`);
  }

  if (!response.body) {
    throw new Error("Streaming is not supported by this response.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();

      buffer += decoder.decode(value, { stream: !done });

      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() ?? "";

      for (const event of events) {
        const dataLine = event
          .split(/\r?\n/)
          .find((line) => line.startsWith("data:"));

        if (!dataLine) continue;

        const data = dataLine.slice(5).trim();

        if (data === "[DONE]") {
          return;
        }

        const payload = JSON.parse(data) as {
          token?: string;
          error?: string;
        };

        if (payload.error) {
          throw new Error(payload.error);
        }

        if (payload.token !== undefined && payload.token !== "") {
          onToken(payload.token);

          // Let React render the incoming text progressively.
          await new Promise((resolve) => window.setTimeout(resolve, 12));
        }
      }

      if (done) break;
    }

    if (buffer.trim()) {
      const dataLine = buffer
        .split(/\r?\n/)
        .find((line) => line.startsWith("data:"));

      if (dataLine) {
        const data = dataLine.slice(5).trim();

        if (data !== "[DONE]") {
          const payload = JSON.parse(data) as {
            token?: string;
            error?: string;
          };

          if (payload.error) throw new Error(payload.error);
          if (payload.token !== undefined && payload.token !== "") {
            onToken(payload.token);

            // Let React render the incoming text progressively.
            await new Promise((resolve) => window.setTimeout(resolve, 12));
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}


export type JDMatchResult = {
  candidate_name: string;
  job_role: string;
  match_score: number;
  score_method?: string;

  job_analysis?: {
    role: string;
    required_skills: string[];
    preferred_skills: string[];
    minimum_experience: number | null;
    education_requirements: string[];
    responsibilities: string[];
  };

  matched_required_skills: string[];
  missing_required_skills: string[];
  matched_preferred_skills: string[];
  missing_preferred_skills: string[];

  skill_evidence?: {
    skill: string;
    evidence: string;
  }[];

  explanation: {
    summary: string;
    relevant_experience: string[];
    relevant_projects: string[];
    experience_requirement: string;
    education_requirement: string;
    improvement_suggestions: string[];
  };

  notice: string;
};

export async function matchResumeWithJD(
  jobDescription: string
): Promise<JDMatchResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/jd-matcher/match`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_description: jobDescription,
      }),
    }
  );

  if (!response.ok) {
    let message = `JD Matcher failed with HTTP ${response.status}`;

    try {
      const errorData = (await response.json()) as {
        detail?: string;
      };

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Keep the fallback error message.
    }

    throw new Error(message);
  }

  return (await response.json()) as JDMatchResult;
}

export async function matchResumeWithJDPdf(
  file: File
): Promise<JDMatchResult & { source_filename: string }> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/v1/jd-matcher/match-pdf`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = `PDF analysis failed with HTTP ${response.status}`;

    try {
      const errorData = (await response.json()) as {
        detail?: string;
      };

      if (errorData.detail) {
        message = errorData.detail;
      }
    } catch {
      // Use the fallback message.
    }

    throw new Error(message);
  }

  return (await response.json()) as JDMatchResult & {
    source_filename: string;
  };
}


