/**
 * Regional Pricing Configuration
 * Uses Purchasing Power Parity (PPP) to set fair prices for different markets.
 * * - US/Global: Standard SaaS pricing ($)
 * - India: Heavily discounted to match local purchasing power (₹)
 * - UK: GBP pricing (£)
 * - EU: Euro pricing (€)
 */
export const REGIONAL_PRICING = {
  'US': { 
    symbol: '$', 
    basic: 9.99, 
    pro: 19.99, 
    currency: 'USD', 
    country: 'United States' 
  },
  'IN': { 
    symbol: '₹', 
    basic: 299, 
    pro: 699, 
    currency: 'INR', 
    country: 'India' 
  },
  'UK': { 
    symbol: '£', 
    basic: 8.99, 
    pro: 15.99, 
    currency: 'GBP', 
    country: 'United Kingdom' 
  },
  'EU': { 
    symbol: '€', 
    basic: 9.99, 
    pro: 18.99, 
    currency: 'EUR', 
    country: 'Europe' 
  },
  'default': { 
    symbol: '$', 
    basic: 9.99, 
    pro: 19.99, 
    currency: 'USD', 
    country: 'Global' 
  }
};

/**
 * Detects the user's region based on their browser's timezone.
 * * Why Timezone?
 * 1. It's instant (no API latency).
 * 2. It's free (no IP-to-Geo API costs).
 * 3. It respects privacy (doesn't require GPS permission).
 * * @returns {string} The region code ('US', 'IN', 'UK', 'EU', or 'default')
 */
export const detectUserRegion = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (!timeZone) return 'default';

    // India Checks
    if (timeZone.includes('Calcutta') || timeZone.includes('Asia/Kolkata') || timeZone.includes('Asia/Colombo')) {
      return 'IN';
    }
    
    // UK Checks
    if (timeZone.includes('London') || timeZone.includes('Europe/London')) {
      return 'UK';
    }
    
    // EU Checks (Major Hubs)
    if (
      timeZone.includes('Berlin') || 
      timeZone.includes('Paris') || 
      timeZone.includes('Amsterdam') || 
      timeZone.includes('Madrid') || 
      timeZone.includes('Rome') ||
      timeZone.includes('Europe')
    ) {
      return 'EU';
    }
    
    // Default to US for North America and unmatched regions
    return 'US';
    
  } catch (e) {
    console.warn("Pricing Util: Timezone detection failed, falling back to default.", e);
    return 'default';
  }
};

/**
 * Helper to get the full pricing configuration for a specific region.
 * @param {string} regionCode - The region code (e.g., 'IN', 'US')
 * @returns {object} The pricing configuration object
 */
export const getPriceConfig = (regionCode) => {
  return REGIONAL_PRICING[regionCode] || REGIONAL_PRICING['default'];
};