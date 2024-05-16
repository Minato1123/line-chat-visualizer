<script setup lang="ts">
const props = defineProps<{
  memberList: string[]
}>()

defineEmits<{
  cancel: []
  confirm: [name: string]
}>()

const selectedName = ref<string | null>(null)
const search = ref('')
const filteredList = computed(() => {
  if (search.value === '')
    return props.memberList

  return props.memberList.filter(name => name.includes(search.value))
})
</script>

<template>
  <Teleport to="body">
    <div class="absolute top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center">
      <div class="bg-white h-11/12 sm:h-4/5 w-11/12 max-w-120 rounded-md border-green-600 border-1 flex flex-col gap-3 p-5">
        <div class="flex justify-center text-xl">
          你是誰？
        </div>
        <div>
          <input
            v-model.trim="search"
            type="text"
            class="w-full px-3 py-2 border-1 rounded-md outline-none"
            placeholder="搜尋"
          >
        </div>
        <div class="grow min-h-0 py-1 border-1 rounded-md overflow-y-auto">
          <div
            v-for="opt in filteredList"
            :key="opt"
            class="py-2 hover:bg-stone-100 px-5 cursor-pointer"
            :class="{
              'bg-stone-100': selectedName === opt,
            }"
            @click="selectedName = opt"
          >
            {{ opt }}
          </div>
        </div>
        <div class="flex justify-end gap-x-5">
          <button
            class="px-5 py-1 border-green-600 border-1 text-green-600 bg-white rounded-full"
            @click="$emit('cancel')"
          >
            取消
          </button>
          <button
            class="px-5 py-1 bg-green-600 text-white rounded-full"
            :disabled="selectedName === null"
            @click="$emit('confirm', selectedName!)"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
