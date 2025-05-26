<template>
  <n-modal v-model:show="localShow" :mask-closable="true">
    <n-card 
      v-if="user" 
      class="user-details-card"
      :bordered="true" 
      size="huge"
      :segmented="{ content: true, footer: 'soft' }"
    >
      <n-space vertical size="large">
        <n-space align="center" justify="space-between">
          <n-space align="center" size="large">
            <n-avatar round size="large">
              {{ user.name.charAt(0).toUpperCase() }}
            </n-avatar>
            <div>
              <h2 style="margin: 0">{{ user.name }}</h2>
              <div style="color: gray;">@{{ user.username }}</div>
            </div>
          </n-space>
        </n-space>

        <n-descriptions 
          label-placement="left"
          bordered
          :column="1"
          size="medium"
        >
          <n-descriptions-item label="Email">{{ user.email }}</n-descriptions-item>
          <n-descriptions-item label="Phone">{{ user.phone }}</n-descriptions-item>
          <n-descriptions-item label="Website">{{ user.website }}</n-descriptions-item>
          <n-descriptions-item label="Username">{{ user.username }}</n-descriptions-item>

          <n-descriptions-item label="Address" v-if="user.address" :span="2">
            {{ user.address.street }}, {{ user.address.suite }}, 
            {{ user.address.city }}, {{ user.address.zipcode }}
          </n-descriptions-item>

          <n-descriptions-item label="Company" v-if="user.company" :span="2">
            <div>
              <strong>{{ user.company.name }}</strong><br />
              <em>{{ user.company.catchPhrase }}</em>
            </div>
          </n-descriptions-item>
        </n-descriptions>

        <template #footer>
          <n-space justify="end">
            <n-button @click="close">Close</n-button>
          </n-space>
        </template>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  user: Object,
})

const emit = defineEmits(['update:show', 'close'])

const localShow = ref(props.show)

watch(() => props.show, (newVal) => {
  localShow.value = newVal
})

watch(localShow, (newVal) => {
  if (newVal !== props.show) {
    emit('update:show', newVal)
  }
})

function close() {
  localShow.value = false
  emit('close')
}
</script>

<style scoped lang="scss">
.user-details-card {
  width: 700px;
  max-width: 95vw;
  padding: 24px;
}
</style>