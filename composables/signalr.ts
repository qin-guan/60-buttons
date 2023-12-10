import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export const useSignalr = createGlobalState(() => {
  const { public: { apiUrl } } = useRuntimeConfig()

  const signalr: HubConnection = new HubConnectionBuilder()
    .withUrl(`${apiUrl}/Position`)
    .withStatefulReconnect()
    .build();

  const { data: user } = useUser()

  watch(user, async (user) => {
    if (!user && signalr) {
      await signalr.stop()
    }

    if (user) {
      await signalr.start();
      await signalr.send('hello', user.id)
    }
  })

  return signalr
})
