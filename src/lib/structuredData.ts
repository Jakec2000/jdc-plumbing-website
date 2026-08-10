import { business } from '../config/business';

export function localBusinessStructuredData(rating?: { rating: number; userRatingCount: number } | null) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Plumber', 'LocalBusiness'],
    name: business.name,
    legalName: business.legalName,
    url: business.websiteUrl,
    telephone: business.phoneE164,
    email: business.email,
    areaServed: business.serviceAreas.map((name) => ({ '@type': 'AdministrativeArea', name })),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude,
    },
  };
  if (rating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.rating,
      reviewCount: rating.userRatingCount,
    };
  }
  return data;
}
