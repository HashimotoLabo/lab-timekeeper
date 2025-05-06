import type { LogFirestoreTypeWithId } from '../types/LogsDB'
import FS, { type WhereClause, type OrderByClause } from './FirestoreService'
import { Timestamp } from 'firebase/firestore'
import { Log } from '../types/LogsDB'
/**
 * Logsという文字列を返す関数
 * @returns "Logs" という文字列
 */
const getLogsCollectionName = (): string => 'Logs'

export const getQueryDocsFromLogsDB = async (days: number): Promise<LogFirestoreTypeWithId[]> => {
  const currentDate = new Date()
  const pastDate = new Date()
  pastDate.setDate(currentDate.getDate() - days)

  const whereClauses: WhereClause[] = [
    {
      field: 'createdAt',
      operator: '>=',
      value: Timestamp.fromDate(pastDate),
    },
  ]
  const orderByClauses: OrderByClause[] = [
    {
      field: 'createdAt',
      direction: 'desc',
    },
  ]
  const rawDocs = await FS.getQueryDocuments(getLogsCollectionName(), whereClauses, orderByClauses)
  const logs: LogFirestoreTypeWithId[] = rawDocs.map((doc) => {
    return Log.fromFirestore(doc)
  })
  return logs
}
