<script setup lang="ts">
const buttonPosition = useState('button-position', () => ({
  x: Math.random(),
  y: Math.random()
}))

const state = ref({
  hardcore: false
})

function click() {
  if (state.value.hardcore) {
    buttonPosition.value = {
      x: Math.random() * 5,
      y: Math.random() * 5,
    }
  } else {
    buttonPosition.value = {
      x: Math.random(),
      y: Math.random(),
    }
  }
}
</script>

<template>
  <div class="px-4 py-3">
    <header class="flex justify-between items-center">
      <UButton variant="ghost" @click="click">
        60 Buttons
      </UButton>
      <UCheckbox v-model="state.hardcore" label="Hardcore mode" />
    </header>
    <main>
      <UButton id="funny" @click="click">
        🤪
      </UButton>
    </main>
  </div>
</template>

<style scoped>
#funny {
  position: absolute;
  top: calc(v-bind("buttonPosition.x") * 90vh);
  left: calc(v-bind("buttonPosition.y") * 90vw);
}
</style>
