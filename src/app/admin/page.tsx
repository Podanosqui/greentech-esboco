"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { EmployeeListSection } from "@/components/admin/employee-list-section"
import { LateEmployeesSection } from "@/components/admin/late-employees-section"
import { NotificationsSection } from "@/components/admin/notifications-section"

export default function AdminDashboard() {
  const router = useRouter()
  const [adminName, setAdminName] = useState("")

  useEffect(() => {
    const storedAdminName = localStorage.getItem("adminName")
    if (!storedAdminName) {
      router.push("/")
    } else {
      setAdminName(storedAdminName)
    }
  }, [router])

  if (!adminName) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userName={adminName} isAdmin />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="mt-2 text-muted-foreground">Gerencie funcionários e monitore operações</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <LateEmployeesSection />
            <NotificationsSection />
          </div>
          <div>
            <EmployeeListSection />
          </div>
        </div>
      </main>
    </div>
  )
}
