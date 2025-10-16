import { Megaphone, Pin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const announcements = [
  {
    id: 1,
    title: "Novos Benefícios de Plano de Saúde",
    content:
      "Estamos animados em anunciar uma cobertura aprimorada do plano de saúde a partir do próximo mês. Verifique seu e-mail para mais detalhes.",
    date: "2 dias atrás",
    isPinned: true,
  },
  {
    id: 2,
    title: "Fechamento do Escritório - Temporada de Férias",
    content:
      "O escritório estará fechado de 24 de dezembro a 2 de janeiro. Contatos de emergência estarão disponíveis.",
    date: "1 semana atrás",
    isPinned: false,
  },
  {
    id: 3,
    title: "Lançamento do Programa de Reconhecimento de Funcionários",
    content: "Indique seus colegas por trabalho excepcional! O novo programa de reconhecimento começa neste trimestre.",
    date: "2 semanas atrás",
    isPinned: false,
  },
]

export function AnnouncementsSection() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Megaphone className="h-5 w-5 text-primary" />
          Anúncios do RH
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                    {announcement.isPinned && <Pin className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{announcement.content}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{announcement.date}</span>
                {announcement.isPinned && (
                  <Badge variant="secondary" className="text-xs">
                    Fixado
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
