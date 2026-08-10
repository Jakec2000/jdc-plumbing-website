export type OpeningHour = {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  opens: string | null;
  closes: string | null;
};

export const business = {
  name: 'JDC Specialist In Plumbing',
  legalName: 'JDC Plumbing Specialist',
  phoneDisplay: '0413 603 680',
  phoneE164: '+61413603680',
  email: 'jdcplumbing@outlook.com.au',
  websiteUrl: 'https://jdcplumbingspecialist.com.au',
  serviceAreaLabel: 'South East Queensland',
  serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Redlands', 'Gold Coast', 'Moreton Bay', 'Sunshine Coast', 'Scenic Rim'],
  coordinates: { latitude: -27.4698, longitude: 153.0251 },
  yearsExperience: 10,
  google: {
    placeId: '',
    profileUrl: '',
    reviewUrl: '',
    writeReviewUrl: '',
  },
  licences: [
    { label: 'QBCC Licence', number: 'TBC' },
    { label: 'Gas Work Licence', number: 'TBC' },
  ],
  openingHours: [
    { day: 'Monday', opens: '07:00', closes: '17:00' },
    { day: 'Tuesday', opens: '07:00', closes: '17:00' },
    { day: 'Wednesday', opens: '07:00', closes: '17:00' },
    { day: 'Thursday', opens: '07:00', closes: '17:00' },
    { day: 'Friday', opens: '07:00', closes: '17:00' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday', opens: null, closes: null },
  ] satisfies OpeningHour[],
} as const;

export const telHref = `tel:${business.phoneE164}`;
export const mailHref = `mailto:${business.email}`;
