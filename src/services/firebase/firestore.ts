import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QuerySnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/services/firebase/config'

export function getUserCollection(uid: string, collectionName: string) {
  return collection(db, 'users', uid, collectionName)
}

export function getUserDoc(uid: string, collectionName: string, docId: string) {
  return doc(db, 'users', uid, collectionName, docId)
}

export async function addUserDoc(
  uid: string,
  collectionName: string,
  data: DocumentData
): Promise<string> {
  const ref = await addDoc(getUserCollection(uid, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateUserDoc(
  uid: string,
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> {
  await updateDoc(getUserDoc(uid, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteUserDoc(
  uid: string,
  collectionName: string,
  docId: string
): Promise<void> {
  await deleteDoc(getUserDoc(uid, collectionName, docId))
}

export function subscribeToUserCollection(
  uid: string,
  collectionName: string,
  callback: (snapshot: QuerySnapshot<DocumentData>) => void
): () => void {
  return onSnapshot(getUserCollection(uid, collectionName), callback)
}

export function convertTimestamp(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate()
  if (value instanceof Date) return value
  return new Date()
}
