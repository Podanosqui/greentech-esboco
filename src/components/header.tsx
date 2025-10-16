"use client"

import { Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface HeaderProps {
  employeeName?: string
  onToggleDarkMode?: () => void
  isDarkMode?: boolean
}

export function Header({ employeeName = "Funcionário", onToggleDarkMode, isDarkMode }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("employeeName")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">CO</span>
          </div>
          <span className="hidden text-lg font-semibold md:inline-block">Grenn Tech</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Olá, <span className="font-medium text-foreground">{employeeName}</span>
          </span>
          {onToggleDarkMode && (
            <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="h-9 w-9">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Alternar modo escuro</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9" title="Sair">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
