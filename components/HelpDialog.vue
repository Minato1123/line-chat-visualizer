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
        <div class="grow min-h-0 overflow-y-auto flex flex-col gap-y-2">
          <h2 class="text-lg text-green-600 text-600">
            注意事項
          </h2>
          <ul>
            <li>・僅有繁體中文版本可正常使用，其他語言不保證效果</li>
            <li>・因為 LINE 只提供給使用者沒有標準規格的純文字聊天紀錄，因此無法保證與原聊天室格式一模一樣</li>
            <li>・電腦版 LINE 匯出的聊天紀錄格式不同，暫時無法使用 ^_^</li>
          </ul>
          <h2 class="text-lg text-green-600 text-600">
            使用方法
          </h2>
          <ol>
            <li>1. 在 LINE 應用程式上取得某個聊天室的聊天紀錄（副檔名為 <code>.txt</code>）</li>
            <li>2. 在該專案網頁上點擊按鈕「選擇 LINE 聊天紀錄」</li>
            <li>3. 從檔案中選擇需要顯示的聊天紀錄（副檔名為 <code>.txt</code>）</li>
            <li>4. 若是群組，則需選擇自己的身份</li>
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
