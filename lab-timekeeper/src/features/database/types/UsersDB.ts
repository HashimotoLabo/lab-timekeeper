import { Timestamp } from 'firebase/firestore'

interface UserBaseType {
  email: string
  name: string
  token: string
}

export interface UserFirestoreType extends UserBaseType {
  createdAt?: Timestamp
}

export interface UserLocalType extends UserBaseType {
  createdAt?: Date
}

export interface UserLocalTypeWithId extends UserLocalType {
  id: string
}

export interface UserFirestoreTypeWithId extends UserFirestoreType {
  id: string
}

export class User {
  createdAt: Date
  email: string
  name: string
  token: string
  id: string

  constructor({
    createdAt = new Date(),
    email = '',
    name = '',
    token = '',
    id = '',
  }: UserLocalTypeWithId) {
    this.createdAt = createdAt
    this.email = email
    this.name = name
    this.token = token
    this.id = id
  }

  // --- Firestoreからインスタンスを作成 ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromFirestore(data: any): User {
    return new User({
      ...data,
      createdAt: data.createdAt?.toDate(),
    })
  }

  // --- Firestoreに保存する形式に変換 ---
  toFirestore(): UserFirestoreTypeWithId {
    return {
      createdAt: Timestamp.fromDate(this.createdAt),
      email: this.email,
      name: this.name,
      token: this.token,
      id: this.id,
    }
  }
}
