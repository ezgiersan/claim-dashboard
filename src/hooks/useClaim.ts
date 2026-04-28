import { useQuery } from '@tanstack/react-query'
import { fetchClaim } from '../lib/api'

export function useClaim() {
  return useQuery({
    queryKey: ['claim'],
    queryFn: fetchClaim,
    staleTime: 1000 * 60 * 5,
  })
}