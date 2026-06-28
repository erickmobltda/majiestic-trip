import { useState, useEffect } from 'react'
import type { Trip, SavedFlight } from '@/types/trip'
import {
  subscribeToUserCollection,
  addUserDoc,
  updateUserDoc,
  deleteUserDoc,
  convertTimestamp,
} from '@/services/firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

export function useTrips(uid: string | null) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) {
      setTrips([])
      setLoading(false)
      return
    }

    const unsubscribe = subscribeToUserCollection(uid, 'trips', (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data()
        return {
          id: doc.id,
          name: d.name ?? '',
          status: d.status ?? 'planning',
          tripType: d.tripType ?? 'round-trip',
          departureAirport: d.departureAirport ?? '',
          destinations: d.destinations ?? [],
          travelers: d.travelers ?? [],
          dates: d.dates ?? { flexible: false, startDate: '', endDate: '' },
          notes: d.notes,
          savedFlight: d.savedFlight
            ? { ...d.savedFlight, savedAt: convertTimestamp(d.savedFlight.savedAt) }
            : undefined,
          createdAt: convertTimestamp(d.createdAt),
          updatedAt: convertTimestamp(d.updatedAt),
        } satisfies Trip
      })
      data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setTrips(data)
      setLoading(false)
    })

    return unsubscribe
  }, [uid])

  async function addTrip(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!uid) return
    await addUserDoc(uid, 'trips', data)
  }

  async function updateTrip(id: string, data: Partial<Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (!uid) return
    await updateUserDoc(uid, 'trips', id, data)
  }

  async function deleteTrip(id: string) {
    if (!uid) return
    await deleteUserDoc(uid, 'trips', id)
  }

  async function saveFlightToTrip(tripId: string, flightData: Omit<SavedFlight, 'savedAt'>) {
    if (!uid) return
    await updateUserDoc(uid, 'trips', tripId, {
      savedFlight: { ...flightData, savedAt: serverTimestamp() },
    })
  }

  return { trips, loading, addTrip, updateTrip, deleteTrip, saveFlightToTrip }
}
