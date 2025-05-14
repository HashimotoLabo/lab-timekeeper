import { type UserLocalTypeWithId, User } from '../types/UsersDB'
import FS from './FirestoreService'
/**
 * Logsという文字列を返す関数
 * @returns "Logs" という文字列
 */
const getUsersCollectionName = (): string => 'Users'

export const getAllDocsFromUsersDB = async (): Promise<UserLocalTypeWithId[]> => {
  const rawDocs = await FS.getAllDocuments(getUsersCollectionName())
  const users: UserLocalTypeWithId[] = rawDocs.map((doc) => {
    return User.fromFirestore(doc)
  })
  return users
}
