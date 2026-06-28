import { useState, useEffect } from 'react'
import type { MileageProgram } from '@/types/mileage'
import {
  subscribeToUserCollection,
  addUserDoc,
  updateUserDoc,
  deleteUserDoc,
  convertTimestamp,
} from '@/services/firebase/firestore'

export function useMileagePrograms(uid: string | null) {
  const [programs, setPrograms] = useState<MileageProgram[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) {
      setPrograms([])
      setLoading(false)
      return
    }

    const unsubscribe = subscribeToUserCollection(uid, 'mileagePrograms', (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data()
        return {
          id: doc.id,
          programName: d.programName ?? '',
          airline: d.airline ?? '',
          seatsaeroSource: d.seatsaeroSource ?? '',
          currentMiles: d.currentMiles ?? 0,
          memberNumber: d.memberNumber,
          tier: d.tier,
          updatedAt: convertTimestamp(d.updatedAt),
        } satisfies MileageProgram
      })
      setPrograms(data)
      setLoading(false)
    })

    return unsubscribe
  }, [uid])

  async function addProgram(data: Omit<MileageProgram, 'id' | 'updatedAt'>) {
    if (!uid) return
    await addUserDoc(uid, 'mileagePrograms', data)
  }

  async function updateProgram(id: string, data: Partial<Omit<MileageProgram, 'id' | 'updatedAt'>>) {
    if (!uid) return
    await updateUserDoc(uid, 'mileagePrograms', id, data)
  }

  async function deleteProgram(id: string) {
    if (!uid) return
    await deleteUserDoc(uid, 'mileagePrograms', id)
  }

  return { programs, loading, addProgram, updateProgram, deleteProgram }
}
