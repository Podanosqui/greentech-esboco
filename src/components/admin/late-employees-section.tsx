import { AlertCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type LateEmployee = {
  id: string
  name: string
  department: string
  lateCount: number
  lastLateDate: string
}

const lateEmployees: LateEmployee[] = [
  {
    id: "1",
    name: "Isabela Maria Pereira",
    department: "Marketing e Faturamento",
    lateCount: 3,
    lastLateDate: "23/10/2025",
  },
  {
    id: "2",
    name: "Júllia Alves",
    department: "Atendimento Online",
    lateCount: 2,
    lastLateDate: "18/10/2025",
  },
  {
    id: "3",
    name: "Deborah Gabriely",
    department: "Consultora",
    lateCount: 1,
    lastLateDate: "12/10/2025",
  },
]

export function LateEmployeesSection() {
  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Funcionários com Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lateEmployees.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">Nenhum atraso registrado este mês</p>
            </div>
          ) : (
            lateEmployees.map((employee) => (
              <div
                key={employee.id}
                className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 transition-colors hover:bg-destructive/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{employee.name}</p>
                      <Badge variant="destructive" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {employee.lateCount} {employee.lateCount === 1 ? "atraso" : "atrasos"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Último atraso: {employee.lastLateDate}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
