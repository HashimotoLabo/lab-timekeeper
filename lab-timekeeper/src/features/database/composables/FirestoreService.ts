import {
  collection,
  doc,
  runTransaction,
  query,
  where,
  orderBy,
  getDocs,
  type WhereFilterOp,
} from 'firebase/firestore'
import { db } from '@/plugins/firebase'

/**
 * WhereClause 型
 * Firestore の where 条件を表す型
 */
export type WhereClause = {
  field: string
  operator: WhereFilterOp
  value: any
}

/**
 * OrderByClause 型
 * Firestore の orderBy 条件を表す型
 */
export type OrderByClause = {
  field: string
  direction: 'asc' | 'desc'
}

/**
 * FirestoreService クラス
 * Firestore の操作をカプセル化するクラス
 */
class FS {
  /**
   * トランザクションを使って複数のドキュメントをまとめて追加する関数
   * @param collectionName - 追加するコレクション名
   * @param dataList - 追加するデータオブジェクトの配列
   * @returns 追加されたドキュメントIDの配列（失敗時は null）
   */
  static async addDocuments(collectionName: string, dataList: object[]): Promise<string[] | null> {
    try {
      const newDocIds = await runTransaction(db, async (transaction) => {
        const collectionRef = collection(db, collectionName)
        const ids: string[] = []

        for (const data of dataList) {
          const newDocRef = doc(collectionRef) // 新しいドキュメント参照を作成
          transaction.set(newDocRef, data) // データをセット
          ids.push(newDocRef.id) // 作成したドキュメントIDを保存
        }

        return ids // 最後にID一覧を返す
      })

      return newDocIds
    } catch (error) {
      console.error('Transaction failed:', error)
      return null
    }
  }

  /**
   * 特定のフィールドに一致するドキュメントをソートして取得する関数
   * @param collectionName - ドキュメントを取得するコレクション名
   * @param whereClauses - where 条件の配列
   * @param orderByClauses - orderBy 条件の配列
   * @returns 一致するドキュメントのデータ
   */
  static async getQueryDocuments(
    collectionName: string,
    whereClauses: WhereClause[],
    orderByClauses: OrderByClause[],
  ) {
    try {
      const collectionRef = collection(db, collectionName)
      let q = query(collectionRef)

      whereClauses.forEach((clause) => {
        q = query(q, where(clause.field, clause.operator, clause.value))
      })

      orderByClauses.forEach((clause) => {
        q = query(q, orderBy(clause.field, clause.direction))
      })

      const querySnapshot = await getDocs(q)
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return docsData
    } catch (error) {
      console.error('Error querying documents: ', error)
      throw error
    }
  }
}

export default FS
