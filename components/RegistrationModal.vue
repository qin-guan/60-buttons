<script setup lang="ts">
const { data: user, isFetching: userIsFetching } = useUser()
const { mutate, isPending } = useCreateUserMutation()

const formState = reactive({
  name: ''
})

function registerUser() {
  mutate(formState.name)
}
</script>

<template>
  <UModal :model-value="!user && !userIsFetching" prevent-close>
    <UCard>
      <template #header>
        <h3 class="text-base font-semibold leading-6">
          Register to continue!
        </h3>
      </template>

      <form @submit.prevent="registerUser">
        <UFormGroup label="Your name">
          <UInput v-model="formState.name"></UInput>
        </UFormGroup>
      </form>

      <template #footer>
        <div class="flex justify-end">
          <UButton :loading="isPending" @click="registerUser">Register!</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
