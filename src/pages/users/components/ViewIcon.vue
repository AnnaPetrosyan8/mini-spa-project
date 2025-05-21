<template>
  <div 
    class="view-icon-container"
    @click.stop="handleClick"
  >
    <div class="view-icon" :class="{ 'with-circle': showCircle }">👁️</div>
  </div>
</template>

<script setup>
const props = defineProps({
  showCircle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

function handleClick(event) {
  event.stopPropagation()
  emit('click')
}
</script>

<style scoped>
.view-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.view-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
  transition: all 0.2s ease;
  padding: 4px;
}

.view-icon.with-circle {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.view-icon:hover {
  color: #3370ff;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.view-icon:active {
  transform: scale(0.95);
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
