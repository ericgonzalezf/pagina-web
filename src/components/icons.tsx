export function IconWeb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function IconChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBrand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M2 16l10 5 10-5M2 12l10 5 10-5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconConsulting(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function IconAutomation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <path d="M7.2 6h4a4 4 0 0 1 4 4v0M7.2 18h4a4 4 0 0 0 4-4v0" />
    </svg>
  );
}

export function IconBrain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="6" r="2.4" />
      <circle cx="5" cy="17" r="2.4" />
      <circle cx="19" cy="17" r="2.4" />
      <path d="M12 8.4V12M12 12 6.6 15.2M12 12l5.4 3.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconAudit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="4" y="3" width="12" height="16" rx="1.5" />
      <path d="M7.5 8h5M7.5 11.5h5M7.5 15h2.5" strokeLinecap="round" />
      <circle cx="16.5" cy="16.5" r="3" />
      <path d="M18.7 18.7 21 21" strokeLinecap="round" />
    </svg>
  );
}

export function IconContent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M5 3h9l5 5v13H5V3Z" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeLinejoin="round" />
      <path d="M17.5 10.5 8 20l-2.5.5.5-2.5 9.5-9.5a1.4 1.4 0 0 1 2 2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSupport(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path
        d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconProduct(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" strokeLinejoin="round" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" strokeLinejoin="round" />
    </svg>
  );
}

export const icons = {
  web: IconWeb,
  chat: IconChat,
  brand: IconBrand,
  consulting: IconConsulting,
  automation: IconAutomation,
  brain: IconBrain,
  audit: IconAudit,
  content: IconContent,
  support: IconSupport,
  product: IconProduct,
};
