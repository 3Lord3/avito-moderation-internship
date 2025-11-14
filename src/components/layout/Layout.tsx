import type {ReactNode} from 'react'
import Navigation from '@/components/layout/Navigation'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <div className="min-h-screen">
            <Navigation/>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}