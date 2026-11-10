import { Component } from '@angular/core';

// The Curio Lane postmark, drawn inline so it can use the page fonts.
@Component({
  selector: 'app-logo',
  styles: `
    :host { display: block; }
    svg { display: block; width: 100%; height: 100%; }
  `,
  template: `
    <svg viewBox="0 14 120 92" role="img" aria-label="Curio Lane">
      <defs>
        <filter id="cl-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="7" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="2" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.8" result="m" />
          <feComposite in="d" in2="m" operator="in" />
        </filter>
        <path id="cl-top" d="M16 60 A44 30.5 0 0 1 104 60" />
        <path id="cl-bottom" d="M11 60 A49 36.5 0 0 0 109 60" />
      </defs>
      <g filter="url(#cl-ink)">
        <ellipse cx="60" cy="60" rx="57" ry="43" fill="none" stroke="#c8372d" stroke-width="5" />
        <ellipse cx="60" cy="60" rx="35" ry="22.5" fill="none" stroke="#c8372d" stroke-width="3" />
        <text font-family="'Jost', sans-serif" font-weight="600" font-size="9.5" letter-spacing="2.4" fill="#c8372d">
          <textPath href="#cl-top" startOffset="50%" text-anchor="middle">CURIO LANE</textPath>
        </text>
        <text font-family="'Jost', sans-serif" font-weight="600" font-size="6.2" letter-spacing="1.2" fill="#c8372d">
          <textPath href="#cl-bottom" startOffset="50%" text-anchor="middle">SMALL FINDS · BIG STORIES</textPath>
        </text>
        <text x="54" y="72" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif"
              font-style="italic" font-weight="700" font-size="38" fill="#c8372d" stroke="#c8372d" stroke-width="1.6">C</text>
        <text x="66" y="72" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif"
              font-style="italic" font-weight="700" font-size="38" fill="#2a7f7a" stroke="#2a7f7a" stroke-width="1.6" style="mix-blend-mode: multiply">L</text>
      </g>
    </svg>
  `,
})
export class Logo {}
