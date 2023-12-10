<script setup lang="ts">
import { nanoid } from 'nanoid'

const signalr = useSignalr()

const { data: initialGamePosition } = useCurrentGamePosition()
const { data: initialLeaderboard } = useLeaderboard()
const { data: user, isFetching: userIsFetching } = useUser()

const gamePosition = ref({ ...initialGamePosition.value })
const leaderboard = ref({ ...initialLeaderboard.value })

watchEffect(() => {
  if (initialGamePosition.value) { gamePosition.value = initialGamePosition.value }
  if (initialLeaderboard.value) { leaderboard.value = initialLeaderboard.value }
})

const sortedLeaderboard = computed(() => leaderboard.value.toSorted((a, b) => b.score - a.score))

onMounted(() => {
  signalr.on("update", (data: { position: { x: number, y: number }, leaderboard: User[] }) => {
    gamePosition.value = data.position
    leaderboard.value = data.leaderboard
  })
})

async function click() {
  await signalr.send("click")
}
</script>

<template>
  <div class="px-4 h-screen flex flex-col">
    <RegistrationModal />

    <header class="flex py-3 justify-between items-center">
      <UButton variant="ghost" @click="click">
        60 Buttons
      </UButton>
    </header>

    <main v-if="userIsFetching || !user" class="flex flex-col md:flex-row gap-3 flex-1">
      <USkeleton class="h-[350px] md:h-full w-full md:w-[350px]" />
      <USkeleton class="flex-1" />
    </main>

    <main v-else class="flex flex-1 flex-col md:flex-row">
      <UCard class="w-[350px] max-h-[200px] md:max-h-[unset] overflow-auto">
        <div class="space-y-4">
          <LazyClientOnly>
            <div v-for="{ name, score, id } of sortedLeaderboard" class=" flex justify-between">
              <kbd :class="[user.id === id ? 'font-bold' : 'opacity-80']">
                {{ name }}
              </kbd>
              <UBadge :color="user.id === id ? 'purple' : undefined">
                {{ score }}
              </UBadge>
            </div>
          </LazyClientOnly>
        </div>
      </UCard>

      <div class="relative flex-1">
        <LazyClientOnly>
          <button v-for="_, idx in Array.from({ length: Math.floor(Math.random() * 100) })" :key="idx" :id="nanoid()" />
        </LazyClientOnly>
        <UButton size="xl" :id="nanoid()" @click="click" class="transition-all duration-100 absolute" :style="{
          top: `calc(${gamePosition?.x} * 95%)`,
          left: `calc(${gamePosition?.y} * 95%)`
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
