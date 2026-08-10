import { Building2, Droplets, Flame, Home, ShowerHead, Wrench, Waves, type LucideIcon } from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: 'Blocked Drains',
    description: 'Clear the blockage, inspect the cause and recommend the repair that prevents repeat problems.',
    items: ['Drain jetting', 'CCTV inspection', 'Root removal', 'Stormwater drainage'],
    icon: Waves,
  },
  {
    title: 'Leaks & Burst Pipes',
    description: 'Find the source quickly, control the damage and repair the failed pipework properly.',
    items: ['Leak detection', 'Burst pipes', 'Pressure testing', 'Pipe repairs'],
    icon: Droplets,
  },
  {
    title: 'Hot Water Systems',
    description: 'Repairs, replacements and upgrades for dependable hot water with the right system for the property.',
    items: ['Electric', 'Gas', 'Heat pump', 'Tempering valves'],
    icon: ShowerHead,
  },
  {
    title: 'Residential Plumbing',
    description: 'Maintenance and installation work for homes, rentals and renovations across South East Queensland.',
    items: ['Taps & mixers', 'Toilets', 'Dishwashers', 'General maintenance'],
    icon: Home,
  },
  {
    title: 'Commercial Maintenance',
    description: 'Practical reactive and planned plumbing support for commercial and managed properties.',
    items: ['Preventative maintenance', 'Fault repairs', 'Restroom upgrades', 'Drainage'],
    icon: Building2,
  },
  {
    title: 'Gas Fitting & Repairs',
    description: 'Gas installation, fault finding and repairs completed with a safety-first approach.',
    items: ['Leak detection', 'Appliance installs', 'Line repairs', 'Testing'],
    icon: Flame,
  },
  {
    title: 'Renovations & Installations',
    description: 'Rough-in through to fit-off, coordinated for a clean finish and reliable long-term result.',
    items: ['Bathrooms', 'Kitchens', 'New pipework', 'Fixture installation'],
    icon: Wrench,
  },
];
