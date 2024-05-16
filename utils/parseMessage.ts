const regex = {
  roomName: /\[LINE\] 與?([^0-x]+)的聊天記錄/,
  date: /(\d{4}\/\d{1,2}\/\d{1,2}（週[^0-x]）)/,
  message: /(\d{2}:\d{2})\t(.*)\t(.*)/,
  call: /^通話時間 ((\d{1,2}:)?\d{1,2}:\d{1,2})$/,
  link: /https?:\/\/[^\s/$.?#].\S*/gi,
}

const MessageMap = {
  '[貼圖]': 'sticker',
  '[照片]': 'photo',
  '[影片]': 'video',
  '[檔案]': 'file',
  '[語音訊息]': 'voice',
  '[禮物]': 'gift',
  '[聯絡資訊]': 'contact',
  '未接來電': 'missed_call',
} as const

export interface ChatRoom {
  roomName: string
  messageList: {
    date: string
    messages: {
      time: string
      name: string
      content: {
        type: 'sticker' | 'photo' | 'video' | 'file' | 'voice' | 'gift' | 'contact' | 'missed_call'
      } | {
        type: 'text' | 'call'
        message: string
      }
    }[]
  }[]
  members: string[]
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function addLinkTag(line: string) {
  return line.replace(regex.link, (url) => {
    const escapedUrl = escapeHtml(url)
    return `<a class="link" href="${escapedUrl}" target="_blank">${escapedUrl}</a>`
  })
}

export function parseMessage(txt: string) {
  let txtList = txt.split('\n')
  const members = new Set()

  const roomName = txtList[0].match(regex.roomName)?.[1] ?? ''
  txtList = txtList.slice(2)

  const messageList: ChatRoom['messageList'] = []
  let currentDate: ChatRoom['messageList'][0] = { date: '', messages: [] }

  for (const line of txtList) {
    if (line === '')
      continue

    const matchedDate = line.match(regex.date)
    if (matchedDate) {
      currentDate = { date: matchedDate[1], messages: [] }
      messageList.push(currentDate)
      continue
    }

    const matchedMessageStart = line.match(regex.message)
    if (matchedMessageStart) {
      const type = MessageMap[matchedMessageStart[3]] ?? (matchedMessageStart[3].match(regex.call) ? 'call' : 'text')
      let message = matchedMessageStart[3]
      if (type === 'call') {
        const time = matchedMessageStart[3].match(regex.call)![1]
        const timeList = time.split(':')
        message = `${timeList[0].padStart(2, '0')}:${timeList[1].padStart(2, '0')}${timeList[2] ? `:${timeList[2].padStart(2, '0')}` : ''}`
      }

      currentDate.messages.push({
        time: matchedMessageStart[1],
        name: matchedMessageStart[2],
        content: {
          type,
          message: addLinkTag(message),
        },
      })
      members.add(matchedMessageStart[2])
      continue
    }

    const prevMessage = currentDate.messages[currentDate.messages.length - 1]
    if (prevMessage == null)
      continue

    if (prevMessage.content.type === 'text')
      prevMessage.content.message += `<br />${addLinkTag(line)}`
  }

  return {
    roomName,
    messageList,
    members: Array.from(members) as string[],
  }
}
