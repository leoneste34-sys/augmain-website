export interface ROIResult {
  monthlyRevenueSaved: number;
  hoursSaved: number;
  opportunitiesRecovered: number;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}