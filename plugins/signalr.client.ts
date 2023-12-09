import { HubConnectionBuilder } from "@microsoft/signalr";

export default defineNuxtPlugin(async () => {
  const { public: { signalRUrl } } = useRuntimeConfig()

  const connection = new HubConnectionBuilder()
    .withUrl(signalRUrl)
    .build();

  await connection.start();
  
  return {
    provide: {
      signalr: connection
    }
  }
})
