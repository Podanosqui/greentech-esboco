"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { ImportantDatesSection } from "@/components/dashboard/important-dates-section"
import { TimesheetStatusSection } from "@/components/dashboard/timesheet-status-section"
import { PayslipSection } from "@/components/dashboard/payslip-section"
import { AnnouncementsSection } from "@/components/dashboard/announcements-section"

export default function DashboardPage() {
  const router = useRouter()
  const [employeeName, setEmployeeName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("employeeName")
    if (name) {
      setEmployeeName(name)
    } else {
      // Redirect to login if no user is found
      router.push("/")
    }
  }, [router])

  if (!employeeName) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userName={employeeName} />

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="space-y-6">
          <WelcomeSection employeeName={employeeName} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ImportantDatesSection />
            <TimesheetStatusSection />
            <PayslipSection />
          </div>

          <AnnouncementsSection />
        </div>
      </main>
    </div>
  )
}
