import FS from './FirestoreService'
import { type WhereFilterOp, Timestamp } from 'firebase/firestore'

/**
 * Logsという文字列を返す関数
 * @returns "Logs" という文字列
 */
const getLogsCollectionName = (): string => 'Logs'

/**
 * Log
 * @param data - 追加するデータオブジェクト
 * @returns 新しいドキュメントのID
 */
export const getQueryDocsFromLogsDB = async (days: number) => {
  const currentDate = new Date()
  const pastDate = new Date()
  pastDate.setDate(currentDate.getDate() - days)

  const whereClauses: {
    field: string
    operator: WhereFilterOp
    value: any
  }[] = [
    {
      field: 'createdAt',
      operator: '>=',
      value: Timestamp.fromDate(pastDate),
    },
  ]
  const orderByClauses: {
    field: string
    direction: 'asc' | 'desc'
  }[] = [
    {
      field: 'createdAt',
      direction: 'desc',
    },
  ]

  return await FS.getQueryDocuments(getLogsCollectionName(), whereClauses, orderByClauses)
}
