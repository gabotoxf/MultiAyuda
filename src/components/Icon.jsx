export default function Icon({ name, size = 18, style }) {
  const paths = {
    bolt: <path d="M13 2 4.5 13.5H11l-1 8.5L18.5 10H12l1-8Z" />,
    ohm: <path d="M2 12h3l2-5 3 10 2.5-13L15 16l1.5-4H22" />,
    sound: <><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" /><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" /></>,
    current: <><path d="M7 8h9.5L13.5 5M17 16H7.5l3-3" /><path d="M7 8a1 1 0 1 0 0-.01M17 16a1 1 0 1 0 0-.01" /></>,
    alert: <><path d="M12 3.5 21.5 20h-19L12 3.5Z" /><path d="M12 10v4.5M12 17.2v.1" /></>,
    plug: <><path d="M9 7V3M15 7V3M7 7h10v3.5a5 5 0 0 1-10 0V7Z" /><path d="M12 15.5V21" /></>,
    bulb: <><path d="M12 3a6 6 0 0 0-3.2 11.1c.7.5 1.2 1.2 1.2 2.4h4c0-1.2.5-1.9 1.2-2.4A6 6 0 0 0 12 3Z" /><path d="M9.5 19.5h5M10.5 21.5h3" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    chat: <path d="M4 5.5h16v10H9l-5 4v-14Z" />,
    shield: <><path d="M12 3 19 6v5c0 4.8-3 7.9-7 9-4-1.1-7-4.2-7-9V6l7-3Z" /><path d="m9.5 11.5 2 2 3.5-4" /></>,
    check: <path d="m5 12.5 5 5L19 7" />,
    bot: <><rect x="5" y="9" width="14" height="10" rx="2.5" /><path d="M12 9V4.5M9 4.5h6" /><circle cx="9.5" cy="14" r=".4" /><circle cx="14.5" cy="14" r=".4" /><path d="M9.5 16.5h5" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    send: <><path d="M5 12 19 5l-4 14-3.5-5.5L5 12Z" /><path d="M11.5 13.5 19 5" /></>,
    expand: <><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" /></>,
    info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 7.8v.1" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, verticalAlign: "-3px", ...style }} aria-hidden="true">
      {paths[name] ?? paths.info}
    </svg>
  );
}
