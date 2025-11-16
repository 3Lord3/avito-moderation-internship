import {createContext, useContext, useEffect} from "react"
import {useLocalStorage} from "@/hooks/useLocalStorage"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
                                  children,
                                  defaultTheme = "system"
                              }: {
    children: React.ReactNode
    defaultTheme?: Theme
}) {
    const [theme, setTheme] = useLocalStorage<Theme>("avito-mod-theme", defaultTheme)

    useEffect(() => {
        const root = window.document.documentElement

        const applyTheme = (themeToApply: Theme) => {
            root.classList.remove("light", "dark")

            if (themeToApply === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light"
                root.classList.add(systemTheme)
            } else {
                root.classList.add(themeToApply)
            }
        }

        applyTheme(theme)

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleSystemThemeChange = () => {
            if (theme === "system") {
                applyTheme("system")
            }
        }

        mediaQuery.addEventListener("change", handleSystemThemeChange)
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }, [theme])

    const value = {
        theme,
        setTheme,
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined)
        throw new Error("useTheme must be used within a UseThemeProvider")
    return context
}