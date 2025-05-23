import { type LogLocalTypeWithId, Log } from '../types/LogsDB'
import FS, { type WhereClause, type OrderByClause } from './FirestoreService'
import { Timestamp } from 'firebase/firestore'
/**
 * Logsという文字列を返す関数
 * @returns "Logs" という文字列
 */
const getLogsCollectionName = (): string => 'Logs'

export const getQueryDocsFromLogsDB = async (days: number): Promise<LogLocalTypeWithId[]> => {
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
  const logs: LogLocalTypeWithId[] = rawDocs.map((doc) => {
    return Log.fromFirestore(doc)
  })
  return logs
}

/**
 * 指定した年・月のログだけ取得する
 * @param year  例: 2024
 * @param month 1〜12
 */
export const getLogsByMonth = async (
  year: number,
  month: number,
): Promise<LogLocalTypeWithId[]> => {
  // 月は0始まりなので注意（1月=0, 12月=11）
  const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0)
  const endDate = new Date(year, month, 1, 0, 0, 0, 0) // 翌月1日の0時

  const whereClauses: WhereClause[] = [
    {
      field: 'createdAt',
      operator: '>=',
      value: Timestamp.fromDate(startDate),
    },
    {
      field: 'createdAt',
      operator: '<',
      value: Timestamp.fromDate(endDate),
    },
  ]
  const orderByClauses: OrderByClause[] = [
    {
      field: 'createdAt',
      direction: 'asc',
    },
  ]
  const rawDocs = await FS.getQueryDocuments(getLogsCollectionName(), whereClauses, orderByClauses)
  return rawDocs.map((doc) => Log.fromFirestore(doc))
}
