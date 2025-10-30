"use client"

import { useState } from "react"
import { CheckCircle2, Clock, AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type TimesheetEntry = {
  date: string
  day: number
  checkIn: string
  checkOut: string
  status: "on-time" | "late" | "absent"
  delay?: string
}

const generateTimesheetEntries = (): TimesheetEntry[] => {
  const entries: TimesheetEntry[] = []
  const latedays = [3, 7, 12, 18, 23] // Days with delays

  for (let day = 1; day <= 28; day++) {
    const isWeekend = day % 7 === 0 || day % 7 === 6
    if (isWeekend) continue

    const isLate = latedays.includes(day)
    const checkInTime = isLate ? "08:15" : "08:00"
    const delay = isLate ? "15 min" : undefined

    entries.push({
      date: `${day.toString().padStart(2, "0")}/10/2025`,
      day,
      checkIn: checkInTime,
      checkOut: "18:00",
      status: isLate ? "late" : "on-time",
      delay,
    })
  }

  return entries.reverse() // Most recent first
}

export function TimesheetStatusSection() {
  const [showHistory, setShowHistory] = useState(false)
  const entries = generateTimesheetEntries()
  const lateCount = entries.filter((e) => e.status === "late").length

  return (
    <>
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Status do Ponto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <Badge className="mb-2 bg-primary text-primary-foreground">Assinado</Badge>
                <p className="text-sm text-muted-foreground">Seu ponto desta semana está completo</p>
              </div>
            </div>

            {lateCount > 0 && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-muted-foreground">
                  Você teve <span className="font-semibold text-destructive">{lateCount} atrasos</span> este mês
                </p>
              </div>
            )}

            <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => setShowHistory(true)}>
              <Calendar className="h-4 w-4" />
              Ver Histórico
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Histórico de Pontos - Outubro 2025
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.date}
                  className={`rounded-lg border p-3 transition-colors ${
                    entry.status === "late" ? "border-destructive/20 bg-destructive/5" : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {entry.status === "late" ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{entry.date}</p>
                        <p className="text-sm text-muted-foreground">
                          Entrada: {entry.checkIn} • Saída: {entry.checkOut}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {entry.status === "late" ? (
                        <Badge variant="destructive" className="gap-1">
                          <Clock className="h-3 w-3" />
                          Atraso {entry.delay}
                        </Badge>
                      ) : (
                        <Badge className="bg-primary text-primary-foreground">No Horário</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
