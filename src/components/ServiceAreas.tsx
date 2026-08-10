import { MapPin } from 'lucide-react';
import { business } from '../config/business';
import { track } from '../lib/analytics';

export function ServiceAreas() {
  const mapKey=import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY as string|undefined;
  const mapQuery=encodeURIComponent('Brisbane QLD Australia');
  return <section className="section areas" id="areas"><div className="container area-grid"><div className="area-copy"><div className="eyebrow">SERVICE AREA</div><div className="gold-rule"/><h2>Brisbane based. Servicing South East Queensland.</h2><p>JDC works across homes, businesses and managed properties throughout the greater South East Queensland region.</p><div className="area-pills">{business.serviceAreas.map(area=><span key={area}><MapPin size={14}/>{area}</span>)}</div><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Brisbane%20QLD" target="_blank" rel="noreferrer" onClick={()=>track('map_click',{location:'service-areas'})}>Open service area in Google Maps →</a></div><div className="map-shell">{mapKey?<iframe title="JDC Plumbing service area around Brisbane" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapKey)}&q=${mapQuery}`}/>:<div className="map-fallback" aria-label="Stylised map of the Brisbane service area"><div className="map-rings"><span/><span/><span/></div><MapPin/><strong>BRISBANE</strong><small>South East Queensland service area</small></div>}</div></div></section>;
}
