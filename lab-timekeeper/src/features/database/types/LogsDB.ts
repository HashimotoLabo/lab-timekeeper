import { Timestamp } from 'firebase/firestore'

interface LogBaseType {
  memo: string
  state: number
  uid: string
}

export interface LogFirestoreType extends LogBaseType {
  createdAt?: Timestamp
}

export interface LogLocalType extends LogBaseType {
  createdAt?: Date
}

export interface LogLocalTypeWithId extends LogLocalType {
  id: string
}

export interface LogFirestoreTypeWithId extends LogFirestoreType {
  id: string
}

interface LogDisplayType {
  memo: string
  state: number
  uid: string
  createdAt?: Date
  id: string
}

export class Log {
  createdAt: Date
  memo: string
  state: number
  uid: string
  id: string

  constructor({
    createdAt = new Date(),
    memo = '',
    state = 0,
    uid = '',
    id = '',
  }: LogLocalTypeWithId) {
    this.createdAt = createdAt
    this.memo = memo
    this.state = state
    this.uid = uid
    this.id = id
  }

  // --- Firestoreからインスタンスを作成 ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromFirestore(data: any): Log {
    return new Log({
      ...data,
      createdAt: data.createdAt?.toDate(),
    })
  }

  // --- Firestoreに保存する形式に変換 ---
  toFirestore(): LogFirestoreTypeWithId {
    return {
      createdAt: Timestamp.fromDate(this.createdAt),
      memo: this.memo,
      state: this.state,
      uid: this.uid,
      id: this.id,
    }
  }

  toDisplay(): LogDisplayType {
    return {
      createdAt: this.createdAt,
      memo: this.memo,
      state: this.state,
      uid: this.uid,
      id: this.id,
    }
  }
}
