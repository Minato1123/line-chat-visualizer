<script setup lang="ts">
defineEmits<{
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="absolute top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center">
      <div class="bg-white h-11/12 sm:h-120 w-11/12 max-w-120 rounded-md border-green-600 border-1 flex flex-col gap-3 p-5 ">
        <h1 class="flex justify-center text-xl">
          基本說明
        </h1>
        <div class="mt-3 flex gap-x-5 justify-center">
          <a
            class="flex gap-2 items-center rounded-full text-lime-900 transition-colors duration-300 cursor-pointer hover:opacity-80"
            href="https://github.com/Minato1123/line-chat-visualizer"
            target="_blank"
          >
            <div class="i-octicon:repo-16 h-6 w-6" />
            Repository
          </a>
          <a
            class="flex gap-2 items-center rounded-full text-lime-900 transition-colors duration-300 cursor-pointer hover:opacity-80"
            href="https://github.com/Minato1123"
            target="_blank"
          >
            <div class="i-carbon:logo-github h-6 w-6" />
            Minato1123
          </a>
        </div>
        <div class="grow min-h-0 overflow-y-auto flex flex-col gap-y-2">
          <h2 class="text-lg text-green-600 text-600">
            注意事項
          </h2>
          <ul>
            <li>・僅有繁體中文版本可正常使用，其他語言不保證效果</li>
            <li>・因為 LINE 只提供給使用者沒有標準規格且不夠完整的純文字聊天紀錄，因此無法與原聊天室呈現完全一致</li>
            <li>・目前只有從 Android 版本的 Line App 可以使用（應該吧）</li>
            <li>・從 iOS 版和電腦版 LINE 匯出的聊天紀錄格式皆不同，暫時無法使用 ^_^</li>
          </ul>
          <h2 class="text-lg text-green-600 text-600">
            使用方法
          </h2>
          <ol>
            <li>1. 在 LINE 應用程式上取得某個聊天室的聊天紀錄（副檔名為 <code>.txt</code>）</li>
            <li>2. 在該專案網頁上點擊按鈕「選擇 LINE 聊天紀錄」</li>
            <li>3. 從檔案中選擇需要顯示的聊天紀錄（副檔名為 <code>.txt</code>）</li>
            <li>4. 若是群組／社群，則需選擇自己的身份</li>
          </ol>
          <h2 class="text-lg text-green-600 text-600">
            如何取得 <code>.txt</code> 聊天紀錄檔案（手機版本）
          </h2>
          <ol>
            <li>1. 選擇要匯出聊天紀錄的聊天室</li>
            <li>2. 點擊右上角選單按鈕</li>
            <li>3. 點擊「設定」</li>
            <li>4. 點擊「傳送聊天紀錄」即可導出 <code>.txt</code> 檔案</li>
          </ol>
        </div>
        <div class="flex justify-end gap-x-5">
          <button
            class="px-5 py-1 border-green-600 border-1 text-green-600 bg-white rounded-full"
            @click="$emit('cancel')"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
