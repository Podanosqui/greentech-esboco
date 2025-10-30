"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Payslip = {
  id: string
  month: string
  amount: string
  date: string
  grossSalary: string
  inss: string
  irrf: string
  benefits: string
  deductions: string
}

const payslips: Payslip[] = [
  {
    id: "1",
    month: "Outubro 2024",
    amount: "R$ 4.250,00",
    date: "31 de Out, 2024",
    grossSalary: "R$ 5.500,00",
    inss: "R$ 605,00",
    irrf: "R$ 412,50",
    benefits: "R$ 350,00",
    deductions: "R$ 582,50",
  },
  {
    id: "2",
    month: "Setembro 2024",
    amount: "R$ 4.180,00",
    date: "30 de Set, 2024",
    grossSalary: "R$ 5.500,00",
    inss: "R$ 605,00",
    irrf: "R$ 412,50",
    benefits: "R$ 280,00",
    deductions: "R$ 582,50",
  },
  {
    id: "3",
    month: "Agosto 2024",
    amount: "R$ 4.320,00",
    date: "31 de Ago, 2024",
    grossSalary: "R$ 5.500,00",
    inss: "R$ 605,00",
    irrf: "R$ 412,50",
    benefits: "R$ 420,00",
    deductions: "R$ 582,50",
  },
]

export function PayslipSection() {
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null)

  return (
    <>
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Contracheques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payslips.map((payslip) => (
              <div
                key={payslip.id}
                className="rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{payslip.month}</p>
                    <p className="text-sm text-muted-foreground">Pago em {payslip.date}</p>
                    <p className="mt-1 text-lg font-bold text-primary">{payslip.amount}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setSelectedPayslip(payslip)}
                  >
                    <FileText className="h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Detalhes do Contracheque
            </DialogTitle>
          </DialogHeader>
          {selectedPayslip && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Período</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{selectedPayslip.month}</p>
              </div>

              <div className="space-y-3 rounded-lg border border-border p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Salário Bruto</span>
                  <span className="font-semibold text-foreground">{selectedPayslip.grossSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Benefícios</span>
                  <span className="font-semibold text-primary">+ {selectedPayslip.benefits}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">INSS</span>
                  <span className="font-semibold text-destructive">- {selectedPayslip.inss}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IRRF</span>
                  <span className="font-semibold text-destructive">- {selectedPayslip.irrf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Outras Deduções</span>
                  <span className="font-semibold text-destructive">- {selectedPayslip.deductions}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Valor Líquido</span>
                  <span className="text-xl font-bold text-primary">{selectedPayslip.amount}</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Pago em {selectedPayslip.date}</p>
              </div>

              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
