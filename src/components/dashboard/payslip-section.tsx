import { FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PayslipSection() {
  const lastPayslip = {
    month: "Dezembro 2024",
    amount: "R$ 4.250,00",
    date: "31 de Dez, 2024",
  }

  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Último Contracheque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Período</p>
            <p className="mt-1 font-semibold text-foreground">{lastPayslip.month}</p>
            <p className="mt-3 text-sm text-muted-foreground">Valor Líquido</p>
            <p className="mt-1 text-2xl font-bold text-primary">{lastPayslip.amount}</p>
            <p className="mt-2 text-xs text-muted-foreground">Pago em {lastPayslip.date}</p>
          </div>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Ver Mais
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
