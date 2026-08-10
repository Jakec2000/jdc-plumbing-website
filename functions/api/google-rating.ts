interface Env {
  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
}

type PagesContext = { env: Env; request: Request };

export const onRequestGet = async ({ env }: PagesContext): Promise<Response> => {
  const apiKey = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return Response.json({ status: 'unconfigured' }, { headers: { 'Cache-Control': 'public, max-age=300' } });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri',
      },
    });
    if (!response.ok) {
      console.error('Google Places response', response.status);
      return Response.json({ status: 'error' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }
    const place = await response.json() as { rating?: number; userRatingCount?: number; googleMapsUri?: string };
    if (typeof place.rating !== 'number' || typeof place.userRatingCount !== 'number') {
      return Response.json({ status: 'error' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }
    return Response.json({ status:'ok', rating:place.rating, userRatingCount:place.userRatingCount, googleMapsUri:place.googleMapsUri ?? null }, { headers: { 'Cache-Control': 'public, s-maxage=3600, max-age=600' } });
  } catch (error) {
    console.error('Google Places request failed', error);
    return Response.json({ status: 'error' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
};
