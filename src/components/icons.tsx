import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconWhatsApp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

export const IconArrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconDiagnostico = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4M8 11h6M11 8v6" />
  </Svg>
);

export const IconAprende = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M3 8l9-4 9 4-9 4z" />
    <path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5" />
  </Svg>
);

export const IconYouTube = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5l5 2.5-5 2.5z" />
  </Svg>
);

export const IconLinkedIn = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3.5" />
    <path d="M8 10.5V16" />
    <circle cx="8" cy="7.7" r="0.8" />
    <path d="M12 16v-5.5M12 13c0-1.6 1-2.5 2.3-2.5s2.2.9 2.2 2.5V16" />
  </Svg>
);

export const IconInstagram = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" />
  </Svg>
);

export const IconThreads = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M16.5 11.5c-.5-3-2.5-4.5-5-4.5-3 0-5 2.5-5 5.5S8.5 18 12 18c3 0 5-1.8 5-4.3 0-2-1.6-3.2-4-3.2-2 0-3.2 1-3.2 2.3s1 2 2.3 2c2 0 3.4-1.6 3.4-4.8" />
  </Svg>
);

export const IconTikTok = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.5 2.5 2.5 4.5 5 4.5" />
  </Svg>
);
