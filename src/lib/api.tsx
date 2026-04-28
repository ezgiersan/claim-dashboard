import { ClaimSchema, Claim } from '../types/claim'

export async function fetchClaim(): Promise<Claim> {
  const res = await fetch('/claim.json')
  if (!res.ok) throw new Error('Veri alınamadı')
  const data = await res.json()
  return ClaimSchema.parse(data)
}