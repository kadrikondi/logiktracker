export interface Package {
  id: string;
  trackingId: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  weight: string;
  type: string;
  description: string;
}

export interface FontScalingSettings {
  enabled: boolean;
}