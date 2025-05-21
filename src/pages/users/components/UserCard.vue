<template>
  <n-card hoverable class="user-card" @click="handleClick">
    <div class="eye-button-container" @click.stop>
      <ViewIcon @click="handleViewClick" />
    </div>
    
    <n-space vertical size="small">
      <div class="card-row">
        <div class="label">Name</div>
        <div class="value">{{ user.username }}</div>
      </div>

      <n-divider style="margin: 4px 0;" />

      <div class="card-row">
        <div class="label">Organization</div>
        <div class="value">{{ user.company?.name }}</div>
      </div>

      <n-divider style="margin: 4px 0;" />

      <div class="card-row">
        <div class="label">Address</div>
        <div class="value">{{ user.address?.street }}</div>
      </div>

      <n-divider style="margin: 4px 0;" />

      <div class="card-row">
        <div class="label">Worker</div>
        <div class="value">{{ user.name }}</div>
      </div>

      <n-divider style="margin: 4px 0;" />

      <div class="card-row">
        <div class="label">Products</div>
        <div class="value products">{{ user.website }}</div>
      </div>
    </n-space>
  </n-card>
</template>

<script setup>
import ViewIcon from './ViewIcon.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'view'])

function handleClick() {
  emit('click', props.user)
}

function handleViewClick() {
  emit('view', props.user)
}
</script>

<style scoped>
.user-card {
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  padding: 8px 4px;
  position: relative;
}

.user-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-color: #b8b8b8;
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.card-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.value {
  font-size: 14px;
  color: #333;
  text-align: right;
}

.products {
  color: #3370ff;
}

.eye-button-container {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
</style>
