"use client"

import { useState } from "react"
import { Users, Edit, Trash2, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Employee = {
  id: string
  name: string
  role: string
  department: string
  email: string
  status: "active" | "inactive"
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Maria Eduarda",
    role: "Atendimento Online",
    department: "Vendas",
    email: "mariaeduarda@empresa.com",
    status: "active",
  },
  {
    id: "2",
    name: "Isabela Maria Pereira",
    role: "Marketing e Faturamento",
    department: "Vendas",
    email: "maria.isabela@empresa.com",
    status: "active",
  },
  {
    id: "3",
    name: "Beatriz Podanosqui",
    role: "Consultora",
    department: "Vendas",
    email: "bia.podanosqui@empresa.com",
    status: "active",
  },
  {
    id: "4",
    name: "Deborah Gabriely",
    role: "Consultora",
    department: "Vendas",
    email: "deh.gaby@empresa.com",
    status: "active",
  },
  {
    id: "5",
    name: "Júllia Alves",
    role: "Atendimento Online",
    department: "Suporte",
    email: "alves.jullia@empresa.com",
    status: "active",
  },
]

export function EmployeeListSection() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSave = (employee: Employee) => {
    if (isAddingNew) {
      setEmployees([...employees, { ...employee, id: Date.now().toString() }])
    } else {
      setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)))
    }
    setEditingEmployee(null)
    setIsAddingNew(false)
  }

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  return (
    <>
      <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Lista de Funcionários
            </CardTitle>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => {
                setIsAddingNew(true)
                setEditingEmployee({
                  id: "",
                  name: "",
                  role: "",
                  department: "",
                  email: "",
                  status: "active",
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
                placeholder="Buscar funcionários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{employee.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {employee.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {employee.role} • {employee.department}
                  </p>
                  <p className="text-xs text-muted-foreground">{employee.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setEditingEmployee(employee)
                      setIsAddingNew(false)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingEmployee} onOpenChange={() => setEditingEmployee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAddingNew ? "Adicionar Funcionário" : "Editar Funcionário"}</DialogTitle>
          </DialogHeader>
          {editingEmployee && (
            <EmployeeForm
              employee={editingEmployee}
              onSave={handleSave}
              onCancel={() => {
                setEditingEmployee(null)
                setIsAddingNew(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function EmployeeForm({
  employee,
  onSave,
  onCancel,
}: {
  employee: Employee
  onSave: (employee: Employee) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(employee)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nome completo"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Cargo</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Cargo"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Departamento</Label>
        <Input
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          placeholder="Departamento"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@empresa.com"
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
