<template>
  <div class="container">
    <n-card class="main-card">
      <n-space vertical>
        <h1 class="page-title">Users</h1>

        <n-tabs type="line" :value="activeTab" @update:value="handleTabChange">
          <n-tab-pane name="cards" tab="Cards">
            <div v-if="!loading && !error">
              <n-grid :cols="3" :x-gap="12" :y-gap="16" responsive="screen">
                <n-grid-item v-for="user in users" :key="user.id">
                  <user-card 
                    :user="user" 
                    @view="showUserDetails"
                  />
                </n-grid-item>
              </n-grid>
            </div>
          </n-tab-pane>

          <n-tab-pane name="list" tab="List">
            <div v-if="!loading && !error" class="user-list-container">
              <div class="table-header">
                <div class="header-cell name-cell">
                  <div class="name-header-with-sort" @click="toggleSort">
                    <span>Name</span>
                    <n-icon class="sort-icon" size="16">
                      <svg v-if="sortOrder === 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 15l-6-6-6 6"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </n-icon>
                  </div>
                </div>
                <div class="header-cell organization-cell">Organization</div>
                <div class="header-cell address-cell">Address</div>
                <div class="header-cell worker-cell">Worker</div>
                <div class="header-cell products-cell">Products</div>
              </div>

              <n-list>
                <user-list-item 
                  v-for="user in sortedUsers" 
                  :key="user.id" 
                  :user="user"
                  @select="showUserDetails" 
                />
              </n-list>
            </div>
          </n-tab-pane>
        </n-tabs>

        <n-spin size="large" v-if="loading" />
        <n-result v-if="error" status="error" :title="error" />
      </n-space>
    </n-card>

    <user-detail-modal v-model:show="showModal" :user="selectedUser" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUsers } from '../../api/users'
import UserCard from './components/UserCard.vue'
import UserListItem from './components/UserListItem.vue'
import UserDetailModal from './components/UserDetailModal.vue'
import { setLocalStorageKey, getLocalStorageKey } from '../../utils/localStorage'

const router = useRouter()
const route = useRoute()

const users = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedUser = ref(null)
const sortOrder = ref('asc')

const activeTab = ref(route.path.includes('/list') ? 'list' : 'cards')

function saveViewPreference(view) {
  setLocalStorageKey('user-view-preference', view)
}

function handleTabChange(tabName) {
  router.push(tabName === 'cards' ? '/cards' : '/list')
  activeTab.value = tabName
  saveViewPreference(tabName)
}

function showUserDetails(user) {
  selectedUser.value = user
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const sortedUsers = computed(() => {
  if (activeTab.value !== 'list') return users.value
  return [...users.value].sort((a, b) => {
    const nameA = a.username.toLowerCase()
    const nameB = b.username.toLowerCase()
    if (nameA < nameB) return sortOrder.value === 'asc' ? -1 : 1
    if (nameA > nameB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

async function fetchUsers() {
  loading.value = true
  error.value = null

  try {
    users.value = await getUsers()
  } catch (err) {
    error.value = 'Failed to load users'
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.path,
  (newPath) => {
    activeTab.value = newPath.includes('/list') ? 'list' : 'cards'
  }
)

onMounted(() => {
  fetchUsers()
  activeTab.value = route.path.includes('/list') ? 'list' : 'cards'
  saveViewPreference(activeTab.value)
})
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  min-height: 600px;
  padding: 20px;
}

.user-list-container {
  margin-top: 10px;
}

.table-header {
  display: flex;
  width: 100%;
  background-color: #f9f9f9;
  padding: 12px 16px;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  margin-bottom: 8px;
}

.header-cell {
  padding: 0 8px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.name-cell {
    width: 15%;
    cursor: pointer;
  }

  &.organization-cell {
    width: 20%;
  }

  &.address-cell {
    width: 20%;
  }

  &.worker-cell {
    width: 15%;
  }

  &.products-cell {
    width: 15%;
  }
}

.name-header-with-sort {
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.sort-icon {
  color: #666;
  margin-left: 4px;
}
</style>