/**
 * Original inline SVG icon set (stroke-based, 24x24 grid).
 * No third-party icon assets are used; every path below was drawn for this project.
 */

export interface IconProps {
  className?: string;
}

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
      <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
      <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
      <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
    </Svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20 13.5A8 8 0 0 1 10.5 4 6.5 6.5 0 1 0 20 13.5Z" />
    </Svg>
  );
}

export function MonitorIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </Svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <polyline points="4 7 20 7" />
      <line x1="10" y1="7" x2="10" y2="5" />
      <line x1="14" y1="7" x2="14" y2="5" />
      <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </Svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </Svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 4l16 16" />
      <path d="M10.6 5.9A9.8 9.8 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a17 17 0 0 1-3.2 3.9M6.6 6.6A16.6 16.6 0 0 0 2 12s3.5 6.5 10 6.5c1.5 0 2.9-.3 4.1-.8" />
    </Svg>
  );
}

export function FunctionIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontStyle="italic"
        fill="currentColor"
        stroke="none"
      >
        f(x)
      </text>
    </Svg>
  );
}

export function LineChartIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <line x1="3" y1="3" x2="3" y2="21" />
      <line x1="3" y1="21" x2="21" y2="21" />
      <path d="M4 16c3-1 4-6 7-7s4 3 7-2" />
      <circle cx="18" cy="7" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CalculatorIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="8" y1="7.5" x2="16" y2="7.5" />
      <line x1="8" y1="12" x2="8.01" y2="12" />
      <line x1="12" y1="12" x2="12.01" y2="12" />
      <line x1="16" y1="12" x2="16.01" y2="12" />
      <line x1="8" y1="16" x2="8.01" y2="16" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
      <line x1="16" y1="16" x2="16.01" y2="16" />
    </Svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function AlertTriangleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5L22 20H2L12 3.5Z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8.5 12.2 11 14.7 15.8 9.8" />
    </Svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </Svg>
  );
}
