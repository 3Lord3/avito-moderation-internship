import {Monitor, Moon, Sun} from "lucide-react"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useTheme} from "@/providers/theme-provider"

export function ModeToggle() {
    const {theme, setTheme} = useTheme()

    return (
        <Tabs value={theme} onValueChange={(value) => setTheme(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="light" title="Светлая тема">
                    <Sun className="h-4 w-4"/>
                </TabsTrigger>
                <TabsTrigger value="system" title="Системная тема">
                    <Monitor className="h-4 w-4"/>
                </TabsTrigger>
                <TabsTrigger value="dark" title="Тёмная тема">
                    <Moon className="h-4 w-4"/>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}