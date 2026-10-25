import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fffdf8"/>
<path d="M75 72L85 94L110 91L94 111L100 137L79 121L59 134L64 110L46 98L71 95Z" fill="#ffdc8e" stroke="#d45b44" stroke-width="2" stroke-linejoin="round"/>
<text x="128" y="115" font-family="Arial, sans-serif" font-size="24" fill="#262a3a">rymi.dev</text>
<text x="76" y="320" font-family="Caveat" font-weight="600" font-size="130" fill="#3159bb">Ryan Miville.</text>
<path d="M82 341Q330 328 642 343Q468 354 86 350Z" fill="#ffdc8e"/>
<text x="82" y="417" font-family="Arial, sans-serif" font-size="32" fill="#626474">Software, music &amp; art.</text>
<path d="M838 182Q949 173 1060 186L1057 347L840 343ZM845 188L848 338L1052 341L1054 191M841 346L808 379Q943 387 1088 380L1057 347M922 361L977 361L990 373L910 373Z" fill="none" stroke="#3159bb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M909 244L891 261L912 279M988 242L1007 259L986 280M958 232L940 291" fill="none" stroke="#3159bb" stroke-width="3.5" stroke-linecap="round"/>
<path d="M865 209L886 209M865 214L877 214M1040 218Q1046 230 1039 238M1050 405Q987 425 924 409" fill="none" stroke="#d45b44" stroke-width="1.5"/>
<path d="M1090 360L1097 399L1132 398L1140 361Q1114 358 1090 360ZM1114 358Q1106 323 1118 293M1117 332Q1099 332 1093 315Q1113 310 1117 327M1117 319Q1137 320 1146 302Q1128 296 1119 312" fill="#e1f0e8" stroke="#357b66" stroke-width="2" stroke-linejoin="round"/>
<path d="M80 521Q594 523 1120 519" fill="none" stroke="#9cafd8"/>
</svg>`;
const resvg = new Resvg(svg, {
  font: {
    fontFiles: [
      fileURLToPath(new URL("../public/fonts/caveat-600.ttf", import.meta.url)),
    ],
    loadSystemFonts: true,
  },
});
writeFileSync(
  new URL("../public/og.png", import.meta.url),
  resvg.render().asPng(),
);
