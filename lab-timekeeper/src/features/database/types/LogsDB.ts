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

export class Log {
  private _createdAt: Date

  memo: string
  state: number
  uid: string

  constructor({ createdAt = new Date(), memo = '', state = 0, uid = '' }: LogLocalType) {
    this._createdAt = createdAt
    this.memo = memo
    this.state = state
    this.uid = uid
  }

  // --- Firestoreからインスタンスを作成 ---
  static fromFirestore(data: LogFirestoreType): Log {
    return new Log({
      ...data,
      createdAt: data.createdAt?.toDate(),
    })
  }

  // --- Firestoreに保存する形式に変換 ---
  toFirestore(): LogFirestoreType {
    return {
      createdAt: Timestamp.fromDate(this._createdAt),
      memo: this.memo,
      state: this.state,
      uid: this.uid,
    }
  }
}
