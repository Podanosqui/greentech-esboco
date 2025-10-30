"use client"

import { Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useDarkMode } from "@/hooks/use-dark-mode"

interface HeaderProps {
  userName?: string
  isAdmin?: boolean
}

export function Header({ userName = "Usuário", isAdmin = false }: HeaderProps) {
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const handleLogout = () => {
    localStorage.removeItem("employeeName")
    localStorage.removeItem("adminName")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${isAdmin ? "bg-destructive" : "bg-primary"}`}
          >
            {/* <span className="text-lg font-bold text-primary-foreground">CO</span> */}
            <img src="/greentech_treeonly.svg" alt="Logo Greentech" />
          </div>
          <div className="hidden md:block">
            <span className="text-lg font-semibold">{isAdmin ? "Painel Administrativo" : "Operações da Empresa"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Olá, <span className="font-medium text-foreground">{userName}</span>
          </span>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Alternar modo escuro</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9" title="Sair">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
