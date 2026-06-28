import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'
import { Toaster } from '@/components/ui/toaster'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { TripsPage } from '@/pages/TripsPage'
import { TripDetailPage } from '@/pages/TripDetailPage'
import { MileagePage } from '@/pages/MileagePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell>
                  <DashboardPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <AppShell>
                  <TripsPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id"
            element={
              <ProtectedRoute>
                <AppShell>
                  <TripDetailPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mileage"
            element={
              <ProtectedRoute>
                <AppShell>
                  <MileagePage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </AuthProvider>
  )
}

export default App
