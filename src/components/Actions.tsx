import { ArrowRight, Phone } from 'lucide-react';
import { business, telHref } from '../config/business';
import { track } from '../lib/analytics';

export function CallButton({ location, compact = false }: { location: string; compact?: boolean }) {
  return <a className={`button button-gold ${compact ? 'button-compact' : ''}`} href={telHref} onClick={() => track('phone_click', { location })} aria-label={`Call JDC Plumbing on ${business.phoneDisplay}`}><Phone size={18} aria-hidden="true" />{compact ? business.phoneDisplay : `Call ${business.phoneDisplay}`}</a>;
}

export function QuoteButton({ location, dark = false }: { location: string; dark?: boolean }) {
  return <a className={`button ${dark ? 'button-outline-dark' : 'button-outline'}`} href="#quote" onClick={() => track('quote_click', { location })}>Request a Quote <ArrowRight size={17} aria-hidden="true" /></a>;
}
