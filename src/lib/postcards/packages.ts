/**
 * The approved postcard price list, used for ESTIMATES on the request only
 * /postcards page. Nothing is charged from it: staff confirm the final price,
 * timing and payment arrangements with the customer after reviewing a
 * request. The database (postcard_requests) recomputes the estimate from the
 * quantity itself and never takes a price from the browser.
 *
 * Keep in step with postcard_request_estimate() in migration 0063.
 */
export const PACKAGES = [
  { quantity: 1000, unitPriceCents: 64 },
  { quantity: 2500, unitPriceCents: 61 },
  { quantity: 5000, unitPriceCents: 57 },
  { quantity: 10000, unitPriceCents: 55 },
  { quantity: 20000, unitPriceCents: 52 },
  { quantity: 30000, unitPriceCents: 50 },
  { quantity: 50000, unitPriceCents: 46 },
  { quantity: 100000, unitPriceCents: 39 },
].map((p) => ({ ...p, totalCents: p.quantity * p.unitPriceCents }))

export type PostcardPackage = (typeof PACKAGES)[number]

export const QUANTITIES = PACKAGES.map((p) => p.quantity) as [number, ...number[]]

/** The customer facing reference for a request, from its idempotency key. Same formula as the database. */
export function requestReference(key: string): string {
  return `PR-${key.replace(/-/g, '').slice(0, 8).toUpperCase()}`
}
