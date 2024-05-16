<script setup lang="ts">
import { type ChatRoom, parseMessage } from '~/utils/parseMessage'

const iconMap = {
  sticker: 'i-solar:sticker-smile-circle-2-outline',
  photo: 'i-material-symbols:image',
  video: 'i-material-symbols:video-library-outline-rounded',
  file: 'i-material-symbols:file-copy-outline',
  voice: 'i-material-symbols:record-voice-over-rounded',
  gift: 'i-basil:present-solid',
  contact: 'i-material-symbols:contact-phone-outline',
  missed_call: 'i-material-symbols:phone-missed-rounded',
  call: 'i-material-symbols:phone-in-talk-watchface-indicator-sharp',
}

const { files, open, reset, onChange } = useFileDialog({
  accept: 'txt',
  multiple: false,
})

const content = ref<ChatRoom | null>(null)
const me = ref<string | null>(null)
const memberList = ref<string[]>([])

const isShowDialog = ref(false)
onChange((files) => {
  if (files == null) {
    content.value = null
    return
  }

  const theFile = files.item(0)
  if (theFile == null)
    return

  if (theFile.type !== 'text/plain') {
    // eslint-disable-next-line no-alert
    alert('請選擇正確的 LINE 聊天記錄檔案，副檔名為 .txt！')
    return
  }

  theFile.text().then(async (text) => {
    const ParsedContent = parseMessage(text)
    me.value = null

    if (ParsedContent.members.length === 2) {
      const index = ParsedContent.members.findIndex(member => member !== ParsedContent.roomName)
      me.value = ParsedContent.members[index]
    }
    else {
      memberList.value = ParsedContent.members

      isShowDialog.value = true
      await until(isShowDialog).not.toBeTruthy()
      if (me.value == null)
        return
    }

    content.value = ParsedContent
  })
})

function handleDialogCancel() {
  me.value = null
  isShowDialog.value = false
}

function handleDialogConfirm(name: string) {
  me.value = name
  isShowDialog.value = false
}
</script>

<template>
  <div class="h-[100dvh] overflow-hidden flex flex-col items-center py-5">
    <div
      class="w-full flex justify-center gap-5 h-10"
    >
      <button
        class="border-green-600 border-2 rounded-full px-5 py-1 bg-white  hover:bg-green-600 hover:text-white transition-colors duration-400"
        @click="open()"
      >
        選擇 LINE 聊天記錄
      </button>
      <button
        class="border-green-600 border-2 rounded-full px-5 py-1 bg-white transition-colors duration-400"
        :class="{
          'hover:bg-green-600 hover:text-white': files,
          'opacity-40': !files,
        }"
        :disabled="!files"
        @click="reset()"
      >
        重置
      </button>
    </div>
    <div v-if="content" class="w-full grow min-h-0 px-5 flex flex-col">
      <h2 class="text-xl my-3 flex justify-center">
        {{ content.roomName }}
      </h2>
      <div class="w-full grow min-h-0 flex justify-center">
        <div class="sm:w-4/5 max-w-240 overflow-y-auto h-full px-5 border-1 rounded-md border-stone-600 relative">
          <div
            v-for="theDate in content.messageList"
            :key="theDate.date"
            class="my-5"
          >
            <div class="flex justify-center sticky top-3">
              <div class="bg-gray-200 inline-block px-3 py-1 rounded-2xl text-sm opacity-60">
                {{ theDate.date }}
              </div>
            </div>
            <div
              v-for="(theMsg, i) in theDate.messages"
              :key="`msg-${i}`"
              class="my-2"
              :class="{
                'flex flex-col items-end ': theMsg.name === me,
              }"
            >
              <div class="px-3 text-sm">
                {{ theMsg.name }}
              </div>
              <div
                class="flex items-end max-w-4/5"
                :class="{
                  'flex-row-reverse': theMsg.name === me,
                }"
              >
                <div
                  class="rounded-2xl px-3 py-1 inline-block flex items-center justify-center"
                  :class="{
                    'bg-stone-200': theMsg.name !== me,
                    'bg-lime-200': theMsg.name === me,
                    'w-16 h-16': theMsg.content.type !== 'text',
                  }"
                >
                  <span v-if="theMsg.content.type === 'text'" class="break-all" v-html="theMsg.content.message" />
                  <div
                    v-else-if="theMsg.content.type === 'call'"
                    class="h-full flex flex-col justify-center items-center gap-1"
                  >
                    <div
                      :class="iconMap[theMsg.content.type]"
                      class="text-2xl"
                    />
                    <span class="text-sm">
                      {{ theMsg.content.message }}
                    </span>
                  </div>
                  <div v-else class="h-full flex justify-center items-center">
                    <div
                      :class="iconMap[theMsg.content.type]"
                      class="text-3xl"
                      :title="theMsg.content.type"
                    />
                  </div>
                </div>
                <span class="text-xs mx-2">{{ theMsg.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SelectWhosDialog
    v-if="isShowDialog"
    :member-list="memberList"
    @cancel="handleDialogCancel"
    @confirm="handleDialogConfirm"
  />
</template>

<style scoped>
  :deep(.link) {
    color: #0070f3;
    transition: all 0.2s;
  }

  :deep(.link):hover {
    opacity: 0.8;
  }
</style>
