export default function Appearance() {
  return (
    <>
      <button
        type="button"
        className="appearance"
        id="appearance"
        aria-label="Toggle color theme"
        title="Toggle color theme"
      >
        <svg
          className="appearance-icon appearance-sun"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M22 16C23 24 10 25 9 17C8 8 21 7 22 16ZM16 3L16 6M25 7L23 9M29 16L26 16M25 25L23 23M16 29L16 26M7 25L9 23M3 16L6 16M7 7L9 9" />
          <path
            d="M21 15C22 21 12 24 10 17M17 3L17 5M26 8L24 10M8 26L10 24"
            strokeWidth=".6"
            opacity=".45"
          />
        </svg>
        <svg
          className="appearance-icon appearance-moon"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20 4C10 1 3 9 5 18C7 29 23 31 28 19C17 23 11 12 20 4Z" />
          <path
            d="M18 5C11 11 16 22 26 20M6 17C7 24 15 29 22 25"
            strokeWidth=".6"
            opacity=".45"
          />
          <path d="M25 5L25 10M22 8L28 7" />
        </svg>
      </button>
      <noscript>
        <style>{".appearance{display:none}"}</style>
      </noscript>
    </>
  );
}
