import { useQuery } from "@tanstack/vue-query";

export function useCurrentGamePosition() {
  const { public: { apiUrl } } = useRuntimeConfig()
  return useQuery({
    queryKey: ['game', 'position'],
    queryFn: () => $fetch<{ x: number, y: number }>(`${apiUrl}/Game/Position`),
  })
}

export function useLeaderboard() {
  const { public: { apiUrl } } = useRuntimeConfig()
  return useQuery({
    queryKey: ['game', 'leaderboard'],
    queryFn: () => $fetch<User[]>(`${apiUrl}/Game/Leaderboard`),
  })
}
