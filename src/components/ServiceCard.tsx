import { useRef } from 'react';
import type { Service } from '../config/services';

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (event: React.PointerEvent<HTMLElement>) => { if (event.pointerType !== 'mouse' || !ref.current) return; const r = ref.current.getBoundingClientRect(); const x = (event.clientX-r.left)/r.width-.5; const y=(event.clientY-r.top)/r.height-.5; ref.current.style.setProperty('--rx',`${-y*5}deg`); ref.current.style.setProperty('--ry',`${x*6}deg`); };
  const reset = () => { ref.current?.style.setProperty('--rx','0deg'); ref.current?.style.setProperty('--ry','0deg'); };
  const Icon = service.icon;
  return <article ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="service-card" style={{ '--delay': `${index*40}ms` } as React.CSSProperties}><div className="service-metal-icon"><Icon aria-hidden="true"/></div><span className="service-index">0{index+1}</span><h3>{service.title}</h3><p>{service.description}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></article>;
}
