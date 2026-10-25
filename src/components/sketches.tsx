import type { ReactNode } from "react";

export function SocialIcon({ name }: { name: "github" | "x" | "linkedin" }) {
  return (
    <svg
      className="social-icon"
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "github" ? (
        <>
          <path d="M12 28L12 24C7 25 6 22 4 21M20 28L20 23Q20 21 19 20C25 19 27 16 27 12Q27 9 25 7Q26 4 25 3Q22 3 20 5Q16 4 12 5Q9 3 7 3Q6 5 7 8Q5 10 5 13C5 18 8 20 13 20Q12 21 12 24" />
          <path
            d="M13 28L13 24M21 27L21 23M7 13Q6 18 12 19M8 4L9 7"
            strokeWidth=".6"
            opacity=".45"
          />
        </>
      ) : name === "x" ? (
        <>
          <path d="M5 5L11 5L27 27L21 27ZM26 5Q19 13 17 15M14 18L5 27" />
          <path
            d="M6 6L22 26M25 6L19 13M13 20L7 26"
            strokeWidth=".6"
            opacity=".45"
          />
        </>
      ) : (
        <>
          <path d="M5 4Q16 3 27 5L28 27Q15 29 4 27Z" />
          <path d="M10 14L10 23M15 23L15 14M15 18Q15 13 20 14Q23 14 23 18L23 23" />
          <path d="M10 9L10.1 9.1" strokeWidth="3" />
          <path
            d="M6 5Q17 4 26 6M27 7L27 26L6 27M11 15L11 22"
            strokeWidth=".6"
            opacity=".45"
          />
        </>
      )}
    </svg>
  );
}

export function PenArrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      className={`pen-arrow${back ? " pen-arrow-back" : ""}`}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 24Q14 14 24 5M12 7L22 6L22 16"
        stroke="currentColor"
        strokeWidth=".6"
        opacity=".5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Outline() {
  return (
    <svg
      className="outline"
      viewBox="0 0 300 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z" />
      <path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z" />
    </svg>
  );
}

export function RoughLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="rough-button" href={href}>
      <svg
        className="button-outline"
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 4Q94 1 196 5L195 45Q94 49 3 44Z" />
        <path d="M2 5Q105 3 198 3L197 47Q96 46 4 46Z" />
      </svg>
      {children}
      <PenArrow />
    </a>
  );
}

export function ProjectIcon({ name = "terminal" }: { name?: string }) {
  const pen = name === "music" ? 1 : name === "trace" ? 2 : 0;
  return (
    <svg
      className={`sketch-icon pen-${pen}`}
      viewBox="0 0 70 55"
      fill="none"
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "note" ? (
        <>
          <path
            d="M16 6Q35 4 49 7L58 17L56 48Q34 50 15 47Z"
            fill="var(--soft)"
          />
          <path d="M49 7L48 18L58 17M23 23L47 22M23 30L46 30M23 38L39 37" />
        </>
      ) : name === "music" ? (
        <>
          <path d="M13 8Q33 4 56 8L57 46Q35 50 14 45Z" fill="var(--soft3)" />
          <path d="M20 12Q36 9 51 12M20 42L49 42" opacity=".5" />
          <path d="M43 18L43 33C42 42 28 40 30 34C31 30 39 29 43 32M43 18L49 20" />
          <path d="M18 25L19 33M23 21L24 35" opacity=".6" />
        </>
      ) : name === "cloud" ? (
        <>
          <path
            d="M15 34C1 29 9 15 22 19C23 3 47 4 49 20C64 16 70 35 55 37L16 37"
            fill="var(--soft)"
          />
          <path d="M28 25L23 30L29 34M41 24L47 29L41 34M36 22L32 36M19 46Q35 49 53 45" />
        </>
      ) : name === "trace" ? (
        <>
          <path
            d="M8 9L27 8L28 26L9 27ZM42 30L61 29L62 48L43 48Z"
            fill="var(--wash3)"
          />
          <path d="M27 17Q50 13 52 29M28 18Q47 17 51 29M15 16L21 16M49 36L56 36M48 41L55 41" />
          <path d="M46 23L52 29L57 23" />
        </>
      ) : (
        <>
          <path d="M7 10Q32 6 61 10L60 46Q35 49 8 46Z" fill="var(--soft)" />
          <path d="M10 17L58 16M15 12L16 12M20 12L21 12M25 12L26 12M17 25L24 30L17 36M30 36L43 35M48 43L55 42" />
        </>
      )}
    </svg>
  );
}

export function MarginLoop() {
  return (
    <svg
      className="margin-loop"
      viewBox="0 0 150 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 17C30 0 100 4 137 14C111 26 31 25 12 16M132 11L141 15L133 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArtCodeSketch() {
  return (
    <svg
      className="about-venn"
      viewBox="105 15 500 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M315 55C272 6 149 33 134 109C111 204 255 230 318 164C370 106 348 77 315 55Z"
        fill="var(--soft)"
        stroke="var(--sage)"
        strokeWidth="1.5"
      />
      <path
        d="M300 59C364 6 484 29 504 103C527 190 410 222 344 183C283 145 274 92 300 59Z"
        fill="var(--soft3)"
        fillOpacity=".55"
        stroke="var(--accent2)"
        strokeWidth="1.5"
      />
      <path
        d="M153 117Q144 52 224 40M410 196Q488 188 500 134"
        stroke="var(--line)"
        strokeWidth=".8"
      />
      <text x="192" y="122" textAnchor="middle">
        art
      </text>
      <text x="436" y="122" textAnchor="middle">
        code
      </text>
      <path
        d="M322 191Q331 218 362 221M353 216L363 221L354 225"
        stroke="var(--accent3)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <text className="label" x="371" y="224">
        somewhere in between
      </text>
    </svg>
  );
}
