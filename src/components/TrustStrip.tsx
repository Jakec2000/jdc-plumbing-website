import { BadgeDollarSign, Clock3, ShieldCheck, ThumbsUp } from 'lucide-react';

const trust = [[ShieldCheck,'Licensed & insured','Professional plumbing and gas work with public liability cover.'],[Clock3,'Prompt communication','Clear arrival expectations and practical updates when plans change.'],[BadgeDollarSign,'Upfront pricing','Know the price and scope before work begins wherever practical.'],[ThumbsUp,'Workmanship guarantee','Work is completed with durability, presentation and future maintenance in mind.']] as const;

export function TrustStrip() { return <section className="trust-strip" aria-label="Why customers choose JDC"><div className="container trust-grid">{trust.map(([Icon,title,text]) => <div className="trust-item" key={title}><Icon aria-hidden="true"/><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></section>; }
