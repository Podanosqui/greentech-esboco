"use client"

import { useState } from "react"
import { Bell, Cake, Calendar, Edit, Trash2, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Notification = {
  id: string
  type: "birthday" | "anniversary" | "alert"
  title: string
  description: string
  date: string
  icon: "cake" | "calendar" | "bell"
}

const initialNotifications: Notification[] = [
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
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const filteredNotifications = notifications.filter(
    (notif) =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSave = (notification: Notification) => {
    if (isAddingNew) {
      setNotifications([...notifications, { ...notification, id: Date.now().toString() }])
    } else {
      setNotifications(notifications.map((notif) => (notif.id === notification.id ? notification : notif)))
    }
    setEditingNotification(null)
    setIsAddingNew(false)
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

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
    <>
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-primary" />
              Notificações e Eventos
            </CardTitle>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => {
                setIsAddingNew(true)
                setEditingNotification({
                  id: "",
                  title: "",
                  description: "",
                  date: "",
                  type: "alert",
                  icon: "bell",
                })
              }}
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar notificações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
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
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.date}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditingNotification(notification)
                            setIsAddingNew(false)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingNotification} onOpenChange={() => setEditingNotification(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAddingNew ? "Adicionar Notificação" : "Editar Notificação"}</DialogTitle>
          </DialogHeader>
          {editingNotification && (
            <NotificationForm
              notification={editingNotification}
              onSave={handleSave}
              onCancel={() => {
                setEditingNotification(null)
                setIsAddingNew(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function NotificationForm({
  notification,
  onSave,
  onCancel,
}: {
  notification: Notification
  onSave: (notification: Notification) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(notification)

  const handleTypeChange = (type: "birthday" | "anniversary" | "alert") => {
    let icon: "cake" | "calendar" | "bell" = "bell"
    if (type === "birthday") icon = "cake"
    if (type === "anniversary") icon = "calendar"
    setFormData({ ...formData, type, icon })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="birthday">Aniversário</SelectItem>
            <SelectItem value="anniversary">Aniversário de Empresa</SelectItem>
            <SelectItem value="alert">Alerta/Evento</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título da notificação"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          value={formData.date}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número

            // Limita a 8 dígitos (DDMMAAAA)
            if (value.length > 8) value = value.slice(0, 8);

            // Adiciona as barras automaticamente
            if (value.length > 4) {
              value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
            } else if (value.length > 2) {
              value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
            }

            // Validação básica
            const parts = value.split("/");
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);

            // Corrige dia/mês inválido parcialmente digitado
            if (month && (month < 1 || month > 12)) return;
            if (day && (day < 1 || day > 31)) return;

            // Quando completo (DD/MM/AAAA), valida mais a fundo
            if (parts.length === 3 && value.length === 10) {
              const date = new Date(year, month - 1, day);
              if (
                date.getFullYear() !== year ||
                date.getMonth() + 1 !== month ||
                date.getDate() !== day
              ) {
                return; // data inválida (ex: 31/02/2025)
              }
            }

            setFormData({ ...formData, date: value });
          }}
          placeholder="DD/MM/AAAA"
          maxLength={10}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={() => onSave(formData)}>Salvar</Button>
      </DialogFooter>
    </div>
  )
}
