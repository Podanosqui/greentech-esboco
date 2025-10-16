import { CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TimesheetStatusSection() {
  const isSigned = true

  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Status do Ponto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          {isSigned ? (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <Badge className="mb-2 bg-primary text-primary-foreground">Assinado</Badge>
                <p className="text-sm text-muted-foreground">Seu ponto desta semana está completo</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <Clock className="h-8 w-8 text-destructive" />
              </div>
              <div className="text-center">
                <Badge variant="destructive" className="mb-2">
                  Pendente
                </Badge>
                <p className="text-sm text-muted-foreground">Por favor, assine seu ponto</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
