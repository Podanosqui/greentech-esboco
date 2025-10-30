import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const upcomingDates = [
  { id: 1, title: "Natal", date: "25 de Dez, 2025", type: "feriado" },
  { id: 2, title: "Reunião de Revisão do 1º Trimestre", date: "28 de Dez, 2025", type: "evento" },
  { id: 3, title: "Ano Novo", date: "1 de Jan, 2026", type: "feriado" },
  { id: 4, title: "Evento de Integração da Equipe", date: "15 de Jan, 2026", type: "evento" },
]

export function ImportantDatesSection() {
  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" />
          Datas Importantes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDates.map((date) => (
            <div key={date.id} className="flex items-start justify-between gap-2 rounded-lg border border-border p-3">
              <div className="flex-1">
                <p className="font-medium text-foreground">{date.title}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {date.date}
                </p>
              </div>
              <Badge variant={date.type === "feriado" ? "secondary" : "outline"} className="shrink-0">
                {date.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
