import { areas, type AreaSlug } from "./site";

const LEXICON: Record<AreaSlug, string[]> = {
  ml: [
    "machine learning",
    "deep learning",
    "neural network",
    "gradient descent",
    "backpropagation",
    "feature engineering",
    "computer vision",
    "natural language",
    "supervised learning",
    "unsupervised",
    "reinforcement learning",
    "scikit-learn",
    "huggingface",
    "fine-tun",
    "overfitting",
    "underfitting",
    "transformer",
    "embedding",
    "pytorch",
    "tensorflow",
    "keras",
    "xgboost",
    "dataset",
    "inference",
    "mlops",
    "llm",
    "nlp",
    "cnn",
    "rnn",
    "gpt",
  ],
  tech: [
    "low-level design",
    "system design",
    "typescript",
    "javascript",
    "open source",
    "database",
    "backend",
    "frontend",
    "next.js",
    "react",
    "linux",
    "api",
    "git",
    "java",
    "python",
    "compiler",
    "server",
    "cloud",
    "docker",
    "kubernetes",
    "sql",
  ],
  sports: [
    "premier league",
    "world cup",
    "formula 1",
    "cricket",
    "football",
    "soccer",
    "tennis",
    "badminton",
    "innings",
    "wicket",
    "ipl",
    "nba",
    "fifa",
    "match",
    "athlete",
    "coach",
    "league",
    "stadium",
  ],
  personal: [
    "personal life",
    "my family",
    "i felt",
    "journal",
    "anxiety",
    "loneliness",
    "childhood",
    "parents",
    "friendship",
    "habit",
    "diary",
  ],
};

function countHits(text: string, phrases: string[]): number {
  let score = 0;
  for (const phrase of phrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern =
      phrase.includes(" ") || phrase.includes("-") || phrase.includes(".")
        ? escaped
        : `\\b${escaped}\\b`;
    const matches = text.match(new RegExp(pattern, "gi"));
    if (matches) score += matches.length * (phrase.includes(" ") ? 2 : 1);
  }
  return score;
}

export function inferAreas(parts: {
  title: string;
  summary: string;
  content: string;
  kind?: string;
}): AreaSlug[] {
  const title = parts.title.toLowerCase();
  const rest = `${parts.summary}\n${parts.content}`.toLowerCase();
  const scores = (Object.keys(LEXICON) as AreaSlug[]).map((area) => {
    const phrases = LEXICON[area];
    const score = countHits(title, phrases) * 3 + countHits(rest, phrases);
    return { area, score };
  });

  const tagged = scores
    .filter((item) => item.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.area);

  if (tagged.length > 0) return tagged;
  if (parts.kind === "project") return ["tech"];
  return [];
}

export function parseManualAreas(value: unknown): AreaSlug[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is AreaSlug =>
      typeof item === "string" && areas.some((area) => area.slug === item),
  );
}
