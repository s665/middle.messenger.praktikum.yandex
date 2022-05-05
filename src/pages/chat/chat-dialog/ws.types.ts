export interface WSPingResponse {
  type: 'pong'
}

export interface WSConnectResponse {
  content: string
  type: 'user connected'
}

export interface WSMessageResponse {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

export type WSResponse = WSPingResponse | WSConnectResponse | WSMessageResponse[]
