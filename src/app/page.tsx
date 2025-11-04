"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Shield } from "lucide-react"
import { useDarkMode } from "@/hooks/use-dark-mode"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (isAdminMode) {
        localStorage.setItem("adminName", username)
        router.push("/admin")
      } else {
        localStorage.setItem("employeeName", username)
        router.push("/dashboard")
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="fixed right-4 top-4">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Alternar modo escuro</span>
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl ${isAdminMode ? "bg-destructive" : "bg-primary"
              } transition-colors`}
          >
            {isAdminMode ? (
              // <Shield className="h-8 w-8 text-primary-foreground" />
              <img src="/greentech_treeonly.svg" alt="Logo Greentech" className="text-primary-foreground" />
            ) : (
              // <span className="text-2xl font-bold text-primary-foreground">CO</span>
              <img src="/greentech_treeonly.svg" alt="Logo Greentech" />

            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isAdminMode ? "Acesso Administrativo" : "Bem-vindo de Volta"}
          </CardTitle>
          <CardDescription>
            {isAdminMode ? "Entre com suas credenciais de administrador" : "Entre para acessar seu painel da empresa"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary"
              />
            </div>

            {
              isAdminMode ? <Button type="submit" className="w-full bg-[#bb0a14]" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

                :

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
            }

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-transparent"
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              <Shield className="h-4 w-4" />
              {isAdminMode ? "Voltar ao Login de Usuário" : "Ir para Login Administrativo"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
