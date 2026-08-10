import { ExternalLink, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { business } from '../config/business';
import { track } from '../lib/analytics';

type RatingState = { status:'ok'; rating:number; userRatingCount:number } | { status:'unconfigured'|'error' };

export function GoogleReviews({ onVerifiedRating }: { onVerifiedRating:(rating:{rating:number;userRatingCount:number}|null)=>void }) {
  const [data,setData] = useState<RatingState>({status:'unconfigured'});
  useEffect(() => { let alive=true; fetch('/api/google-rating').then(async response => { if(!response.ok) throw new Error('Google rating unavailable'); return await response.json() as RatingState; }).then(result => { if(!alive) return; setData(result); onVerifiedRating(result.status==='ok'?{rating:result.rating,userRatingCount:result.userRatingCount}:null); }).catch(() => { if(alive) setData({status:'unconfigured'}); }); return () => { alive=false; }; }, [onVerifiedRating]);
  const link=business.google.reviewUrl||business.google.profileUrl;
  return <section className="reviews-panel" id="reviews"><div className="container review-inner"><div><div className="eyebrow">GOOGLE BUSINESS</div><div className="gold-rule"/><h2>Local reputation, independently verified.</h2><p>Google rating data is loaded through the official Places API when the business Place ID and server API key are configured. The site never fabricates review counts or testimonials.</p></div><div className="rating-card">{data.status==='ok'?<><div className="rating-number">{data.rating.toFixed(1)}</div><div className="stars" aria-label={`${data.rating} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} fill="currentColor"/>)}</div><strong>{data.userRatingCount.toLocaleString('en-AU')} Google ratings</strong></>:<><div className="rating-google">G</div><strong>Google Business Profile</strong><span>Live rating will appear here once the Place ID is connected.</span></>}{link?<a href={link} target="_blank" rel="noreferrer" onClick={()=>track('review_click',{location:'reviews'})}>View on Google <ExternalLink size={16}/></a>:<span className="rating-config-note">API-ready • no scraped reviews</span>}</div></div></section>;
}
