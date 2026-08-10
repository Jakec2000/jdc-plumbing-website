import { FileText, Phone } from 'lucide-react';
import { business, telHref } from '../config/business';
import { track } from '../lib/analytics';

export function StickyMobileCta() { return <div className="mobile-cta"><a href={telHref} onClick={()=>track('phone_click',{location:'mobile-sticky'})}><Phone/>Call {business.phoneDisplay}</a><a href="#quote" onClick={()=>track('quote_click',{location:'mobile-sticky'})}><FileText/>Get Quote</a></div>; }
