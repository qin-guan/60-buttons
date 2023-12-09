import { HubConnectionBuilder } from "@microsoft/signalr";

export default defineNuxtPlugin(async () => {
  const { public: { apiUrl } } = useRuntimeConfig()

  const connection = new HubConnectionBuilder()
    .withUrl(`${apiUrl}/Position`)
    .build();

  await connection.start();

  return {
    provide: {
      signalr: connection
    }
  }
})
