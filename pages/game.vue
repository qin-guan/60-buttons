<script setup lang="ts">
import { nanoid } from 'nanoid'

const { $signalr } = useNuxtApp()
const { public: { apiUrl } } = useRuntimeConfig()

const { data: initialButtonPosition } = await useFetch<{ x: number, y: number }>(`${apiUrl}/Live`)
const { data: initialPlayers } = await useFetch<Record<string, number>>(`${apiUrl}/Players`)
const buttonPosition = ref({ ...initialButtonPosition.value })
const players = ref({ ...initialPlayers.value })

const sortedPlayers = computed(() => Object.entries(players.value).sort(([, a], [, b]) => b - a))

const state = ref({
  hardcore: false
})

onMounted(() => {
  $signalr.on("update", (data: { position: { x: number, y: number }, scores: Record<string, number> }) => {
    buttonPosition.value = data.position
    players.value = data.scores
  })
})

async function click() {
  await $signalr.send("click")
}
</script>

<template>
  <div class="px-4 h-screen flex flex-col">
    <header class="flex py-3 justify-between items-center">
      <UButton variant="ghost" @click="click">
        60 Buttons
      </UButton>
      <UCheckbox v-model="state.hardcore" label="Hardcore mode" />
    </header>

    <main class="flex flex-1 flex-col md:flex-row">
      <UCard class="w-[350px] max-h-[200px] md:max-h-[unset] overflow-auto">
        <div class="space-y-4">
          <div v-for="[player, points] of sortedPlayers" class=" flex justify-between">
            <kbd :class="[$signalr.connectionId === player ? 'font-bold' : 'opacity-80']">
              {{ player }}
            </kbd>
            <UBadge :color="$signalr.connectionId === player ? 'purple' : undefined">
              {{ points }}
            </UBadge>
          </div>
        </div>
      </UCard>

      <div class="relative flex-1">
        <LazyClientOnly>
          <button v-for="_, idx in Array.from({ length: Math.floor(Math.random() * 100) })" :key="idx" :id="nanoid()" />
        </LazyClientOnly>
        <UButton size="xl" :id="nanoid()" @click="click" class="transition-all duration-100 absolute" :style="{
          top: `calc(${buttonPosition?.x} * 95%)`,
          left: `calc(${buttonPosition?.y} * 95%)`
        }" :class="nanoid()">
          🤪
        </UButton>
        <LazyClientOnly>
          <button v-for="_, idx in Array.from({ length: Math.floor(Math.random() * 100) })" :key="idx" :id="nanoid()" />
        </LazyClientOnly>
      </div>
    </main>
  </div>
</template>
