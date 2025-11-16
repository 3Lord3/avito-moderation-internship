import {Link, useLocation} from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {ModeToggle} from '@/components/ModeToggle'
import {cn} from '@/lib/utils'

export default function Header() {
    const location = useLocation()

    return (
        <header className="border-b bg-background shadow-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex gap-8 items-center justify-between">
                    <div className="flex gap-8 items-center">
                        <Link to="/" className="font-bold text-xl text-primary">
                            AvitoMod
                        </Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            'px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 rounded-md',
                                            location.pathname === '/list'
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'bg-transparent'
                                        )}
                                    >
                                        <Link to="/list">Список</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            'px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 rounded-md',
                                            location.pathname === '/stats'
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'bg-transparent'
                                        )}
                                    >
                                        <Link to="/stats">Статистика</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <ModeToggle/>
                </div>
            </nav>
        </header>
    )
}