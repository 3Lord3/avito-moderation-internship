import type {ReactNode} from 'react'
import Header from '@/components/layout/Header'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return (
        <div className="min-h-screen">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}