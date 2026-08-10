import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { business } from '../config/business';
import { CallButton } from './Actions';

const links = [['Services','#services'],['Why JDC','#why-jdc'],['Work','#work'],['Areas','#areas'],['Contact','#quote']] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><a href="#top" className="brand" aria-label={`${business.name} home`}><span className="brand-main"><b>JDC</b> <em>PLUMBING</em></span><span className="brand-sub">SPECIALIST IN PLUMBING</span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="header-call"><CallButton location="header" compact /></div><button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}</header>;
}
