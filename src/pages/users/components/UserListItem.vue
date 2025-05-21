<template>
  <n-list-item class="user-list-item">
    <div class="user-table-row">
      <div class="user-cell name-cell">{{ user.username }}</div>
      <div class="user-cell organization-cell">{{ user.company?.name }}</div>
      <div class="user-cell address-cell">{{ user.address?.street }}</div>
      <div class="user-cell worker-cell">{{ user.name }}</div>
      <div class="user-cell products-cell">
        <span class="product-text">{{ user.website }}</span>
      </div>
      <div class="user-cell action-cell">
        <div class="action-buttons">
          <n-button quaternary circle size="small" @click.stop="$emit('select', user)">
            <template #icon>
              <ViewIcon @click="$emit('select', user)" />
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </n-list-item>
</template>

<script setup>
import ViewIcon from './ViewIcon.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>

<style scoped>
.user-list-item {
  padding: 0 !important;
  margin-bottom: 4px;
}

.user-table-row {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

.user-table-row:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: #b8b8b8;
  background-color: #f5f5f5;
  transform: translateY(-1px);
}

.user-cell {
  padding: 0 8px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name-cell {
  width: 15%;
}

.organization-cell {
  width: 20%;
}

.address-cell {
  width: 20%;
}

.worker-cell {
  width: 15%;
}

.products-cell {
  width: 15%;
}

.product-link {
  color: #3370ff;
  text-decoration: none;
}

.product-link:hover {
  text-decoration: underline;
}

.action-cell {
  width: 10%;
  display: flex;
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  gap: 4px;
}
</style>
