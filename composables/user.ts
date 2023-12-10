import { useMutation, useQuery } from "@tanstack/vue-query"
import { useStorage } from "@vueuse/core"

export interface User {
  id: string,
  name: string,
  score: number
}

function useUserIdStorage() {
  return useStorage<string>('user:id', null)
}

export function useUser() {
  const { public: { apiUrl } } = useRuntimeConfig()

  const userId = useUserIdStorage()

  const url = computed(() => `${apiUrl}/Player/${userId.value}`)
  const enabled = computed(() => !!userId.value)

  return useQuery<User>({
    queryKey: ['user'],
    queryFn: () => $fetch(url.value),
    enabled
  })
}

export function useCreateUserMutation() {
  const { public: { apiUrl } } = useRuntimeConfig()

  const userId = useUserIdStorage()

  return useMutation({
    mutationFn: (name: string) => $fetch<User>(`${apiUrl}/Player`, { method: 'POST', body: { name } }),
    onSuccess(data) {
      console.log(data)
      userId.value = data.id
    }
  })
}
