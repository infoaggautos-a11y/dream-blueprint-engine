export type BuildStyle = 'modern' | 'traditional' | 'minimalist';
export type FinishTier = 'signature' | 'executive' | 'sovereign';

export interface BuildConfig {
  floors: number;
  bedrooms: number;
  bathrooms: number;
  style: BuildStyle;
}

export const DEFAULT_CONFIG: BuildConfig = {
  floors: 2,
  bedrooms: 3,
  bathrooms: 2,
  style: 'modern',
};

export const ACTIVE_CONFIG_KEY = 'tvicl_active_config';

export const loadActiveConfig = (): BuildConfig => {
  try {
    const raw = localStorage.getItem(ACTIVE_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        floors: Number(parsed.floors) || DEFAULT_CONFIG.floors,
        bedrooms: Number(parsed.bedrooms) || DEFAULT_CONFIG.bedrooms,
        bathrooms: Number(parsed.bathrooms) || DEFAULT_CONFIG.bathrooms,
        style: (parsed.style as BuildStyle) || DEFAULT_CONFIG.style,
      };
    }
    const designs = JSON.parse(localStorage.getItem('tvicl_designs') || '[]');
    if (Array.isArray(designs) && designs.length) {
      const last = designs[designs.length - 1];
      return {
        floors: Number(last.floors) || DEFAULT_CONFIG.floors,
        bedrooms: Number(last.bedrooms) || DEFAULT_CONFIG.bedrooms,
        bathrooms: Number(last.bathrooms) || DEFAULT_CONFIG.bathrooms,
        style: (last.style as BuildStyle) || DEFAULT_CONFIG.style,
      };
    }
  } catch {
    /* ignore malformed storage */
  }
  return DEFAULT_CONFIG;
};

export const saveActiveConfig = (config: BuildConfig) => {
  try {
    localStorage.setItem(ACTIVE_CONFIG_KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
};

export const finishTiers: { value: FinishTier; label: string; blurb: string; multiplier: number }[] = [
  { value: 'signature', label: 'Signature Luxury', blurb: 'Premium porcelain, quality joinery', multiplier: 1 },
  { value: 'executive', label: 'Ultra Executive', blurb: 'Imported marble, designer fittings', multiplier: 1.22 },
  { value: 'sovereign', label: 'Royal Sovereign', blurb: 'Bespoke stonework, gold-leaf detailing', multiplier: 1.48 },
];

export interface AddOn {
  id: string;
  label: string;
  description: string;
  cost: number;
}

export const addOns: AddOn[] = [
  { id: 'solar', label: '10kVA Hybrid Solar System', description: 'Inverter, lithium bank and panel array', cost: 9500000 },
  { id: 'pool', label: 'Heated Infinity Plunge Pool', description: 'Tiled pool, filtration and deck', cost: 14000000 },
  { id: 'smart', label: 'Smart Home Automation', description: 'Lighting, climate and scene control', cost: 7200000 },
  { id: 'security', label: 'Perimeter Security Suite', description: 'Electric fence, CCTV array, biometric gate', cost: 6400000 },
];

export interface BoqItem {
  description: string;
  unit: string;
  quantity: number;
  rate: number;
}

export interface BoqSection {
  id: string;
  title: string;
  items: BoqItem[];
}

const styleFactor: Record<BuildStyle, number> = {
  modern: 1.2,
  traditional: 1.0,
  minimalist: 1.1,
};

/** Gross floor area in square metres, derived from the 3D configuration. */
export const grossFloorArea = (c: BuildConfig) =>
  Math.round((60 + c.bedrooms * 22 + c.bathrooms * 9) * c.floors);

export const buildBoq = (c: BuildConfig, tier: FinishTier): BoqSection[] => {
  const area = grossFloorArea(c);
  const footprint = Math.round(area / c.floors);
  const f = styleFactor[c.style];
  const tierMult = finishTiers.find((t) => t.value === tier)?.multiplier ?? 1;
  const r = (n: number) => Math.round(n);

  return [
    {
      id: 'substructure',
      title: 'Substructure & Earthwork',
      items: [
        { description: 'Site clearing, setting out and levelling', unit: 'm²', quantity: footprint, rate: r(4500) },
        { description: 'Excavation to foundation trenches', unit: 'm³', quantity: r(footprint * 0.45), rate: r(9000) },
        { description: 'Hardcore filling and blinding', unit: 'm²', quantity: footprint, rate: r(11000) },
        { description: 'Reinforced concrete foundation and ground slab', unit: 'm²', quantity: footprint, rate: r(38000 * f) },
      ],
    },
    {
      id: 'superstructure',
      title: 'Superstructure & Frame',
      items: [
        { description: 'Reinforced concrete columns and beams', unit: 'm²', quantity: area, rate: r(31000 * f) },
        { description: 'Sandcrete blockwork to walls', unit: 'm²', quantity: r(area * 2.4), rate: r(9800) },
        { description: 'Suspended floor slabs and staircase', unit: 'm²', quantity: r(area - footprint), rate: r(42000 * f) },
        { description: 'Lintels, copings and reinforcement', unit: 'item', quantity: c.floors * 4, rate: r(420000) },
      ],
    },
    {
      id: 'roofing',
      title: 'Roofing & Waterproofing',
      items: [
        { description: 'Treated timber / steel roof trusses', unit: 'm²', quantity: r(footprint * 1.25), rate: r(18000 * f) },
        { description: 'Stone-coated aluminium roofing sheets', unit: 'm²', quantity: r(footprint * 1.25), rate: r(24000 * tierMult) },
        { description: 'Fascia, soffit and aluminium rain gutters', unit: 'm', quantity: r(Math.sqrt(footprint) * 4), rate: r(16000) },
        { description: 'Roof and wet-area waterproofing', unit: 'm²', quantity: r(footprint + c.bathrooms * 9), rate: r(7500) },
      ],
    },
    {
      id: 'mep',
      title: 'Mechanical, Electrical & Plumbing',
      items: [
        { description: 'Concealed electrical conduit and wiring', unit: 'm²', quantity: area, rate: r(14500 * tierMult) },
        { description: 'Distribution boards, breakers and earthing', unit: 'no', quantity: c.floors, rate: r(950000) },
        { description: 'Cold and hot water plumbing runs', unit: 'no', quantity: c.bathrooms + 1, rate: r(1450000) },
        { description: 'Soil, waste and drainage stacks with septic works', unit: 'item', quantity: 1, rate: r(3200000 + c.bathrooms * 450000) },
        { description: 'Air-conditioning pipework and provisions', unit: 'no', quantity: c.bedrooms + 2, rate: r(780000 * tierMult) },
      ],
    },
    {
      id: 'finishes',
      title: 'Luxury Finishes & Millwork',
      items: [
        { description: 'Wall rendering and premium skim coat', unit: 'm²', quantity: r(area * 2.4), rate: r(6200 * tierMult) },
        { description: 'Large-format porcelain floor tiling', unit: 'm²', quantity: area, rate: r(26000 * tierMult) },
        { description: 'Marble feature walls and vanity tops', unit: 'm²', quantity: r(c.bathrooms * 12 + 18), rate: r(58000 * tierMult) },
        { description: 'Designer POP ceilings and cornices', unit: 'm²', quantity: area, rate: r(13500 * tierMult) },
        { description: 'Fitted wardrobes and kitchen millwork', unit: 'no', quantity: c.bedrooms + 1, rate: r(2100000 * tierMult) },
        { description: 'Sanitary wares and brassware', unit: 'no', quantity: c.bathrooms, rate: r(1650000 * tierMult) },
        { description: 'Internal and external painting', unit: 'm²', quantity: r(area * 2.8), rate: r(4200 * tierMult) },
      ],
    },
    {
      id: 'openings',
      title: 'Doors, Windows & Glazing',
      items: [
        { description: 'Bulletproof security entrance door', unit: 'no', quantity: 1, rate: r(2850000 * tierMult) },
        { description: 'Solid internal doors with ironmongery', unit: 'no', quantity: c.bedrooms + c.bathrooms + 2, rate: r(420000 * tierMult) },
        { description: 'Thermal-break aluminium windows, tinted double glazing', unit: 'm²', quantity: r(area * 0.18), rate: r(78000 * tierMult) },
      ],
    },
    {
      id: 'fees',
      title: 'Professional Fees & Approvals',
      items: [
        { description: 'Architectural and structural drawings', unit: 'item', quantity: 1, rate: r(area * 9000) },
        { description: 'MEP design and coordination', unit: 'item', quantity: 1, rate: r(area * 4200) },
        { description: 'Statutory planning permits and approvals', unit: 'item', quantity: 1, rate: 2650000 },
        { description: 'Quantity surveying and site supervision', unit: 'month', quantity: 6 + c.floors, rate: 850000 },
      ],
    },
  ];
};

export const sectionTotal = (s: BoqSection) =>
  s.items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

export const boqTotal = (sections: BoqSection[]) =>
  sections.reduce((sum, s) => sum + sectionTotal(s), 0);

export const milestones = [
  { label: 'Mobilisation & Foundation', percent: 30, note: 'Site setup, substructure to ground slab' },
  { label: 'Structural Frame & Roof Capping', percent: 30, note: 'Columns, slabs, blockwork, roof' },
  { label: 'First-Fix MEP & Plastering', percent: 20, note: 'Services, rendering, screeding' },
  { label: 'Finishes & Commissioning', percent: 20, note: 'Tiling, joinery, fittings, handover' },
];

export const timelineMonths = (c: BuildConfig) => {
  const base = 5 + c.floors * 1.5 + c.bedrooms * 0.3;
  return { min: Math.round(base), max: Math.round(base + 2) };
};

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
