import {Link, useLocation} from 'react-router-dom'
import {Button} from '@/components/ui/button'

export default function Navigation() {
    const location = useLocation()

    return (
        <header className="border-b bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex gap-4 items-center">
                    <Link to="/" className="font-bold text-xl text-blue-600">
                        MyApp
                    </Link>
                    <div className="flex gap-2">
                        <Button
                            asChild
                            variant={location.pathname === '/list' ? 'default' : 'ghost'}
                        >
                            <Link to="/list">List</Link>
                        </Button>
                        <Button
                            asChild
                            variant={location.pathname === '/stats' ? 'default' : 'ghost'}
                        >
                            <Link to="/stats">Stats</Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}