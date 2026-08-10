import { services } from '../config/services';
import { ServiceCard } from './ServiceCard';

export function Services() { return <section className="section services" id="services"><div className="container"><div className="section-heading"><div><div className="eyebrow">WHAT WE DO</div><div className="gold-rule"/><h2>Plumbing services without shortcuts</h2></div><p>From urgent faults to planned installations, JDC focuses on the cause of the problem and a finish that holds up after we leave.</p></div><div className="services-grid">{services.map((service,index) => <ServiceCard key={service.title} service={service} index={index}/>)}</div></div></section>; }
