export type RoomMessage =
  | { type: 'hello'; name: string }
  | { type: 'ping'; t: number }
  | { type: 'pong'; t: number }

export function isRoomMessage(value: unknown): value is RoomMessage {
  if (typeof value !== 'object' || value === null || !('type' in value)) {
    return false
  }
  const type = (value as { type: unknown }).type
  return type === 'hello' || type === 'ping' || type === 'pong'
}

export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function randomRoomCode(): string {
  let code = ''
  for (let i = 0; i < 6; i += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  }
  return code
}

export function normalizeRoomCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
}
