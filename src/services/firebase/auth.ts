import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/services/firebase/config'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider)
  await upsertUserProfile(result.user)
  return result.user
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export async function registerWithEmail(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await upsertUserProfile(result.user)
  return result.user
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback)
}

async function upsertUserProfile(user: User): Promise<void> {
  const ref = doc(db, 'users', user.uid)
  await setDoc(
    ref,
    {
      email: user.email,
      displayName: user.displayName ?? user.email,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}
