import { Card, CardContent } from "@/components/ui/card"

interface WelcomeSectionProps {
  employeeName: string
}

export function WelcomeSection({ employeeName }: WelcomeSectionProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite"

  return (
    <Card className="border-none bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold text-foreground">
          {greeting}, {employeeName}
        </h1>
        <p className="mt-2 text-muted-foreground">Bem-vindo ao seu painel da empresa</p>
      </CardContent>
    </Card>
  )
}
