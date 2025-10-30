import { Bell, Cake, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: string
  type: "birthday" | "anniversary" | "alert"
  title: string
  description: string
  date: string
  icon: "cake" | "calendar" | "bell"
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "birthday",
    title: "Aniversário - Beatriz Podanosqui",
    description: "Aniversário amanhã",
    date: "29/12/2024",
    icon: "cake",
  },
  {
    id: "2",
    type: "birthday",
    title: "Aniversário - Deborah Gabriely",
    description: "Aniversário em 3 dias",
    date: "31/12/2024",
    icon: "cake",
  },
  {
    id: "3",
    type: "anniversary",
    title: "Aniversário de Empresa - Júllia Alves",
    description: "5 anos na empresa",
    date: "02/01/2025",
    icon: "calendar",
  },
  {
    id: "4",
    type: "birthday",
    title: "Aniversário - Maria Eduarda",
    description: "Aniversário em 5 dias",
    date: "03/01/2025",
    icon: "cake",
  },
]

export function NotificationsSection() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "cake":
        return <Cake className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary" />
          Notificações e Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-primary">{getIcon(notification.icon)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {notification.date}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
