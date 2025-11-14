import {Link} from 'react-router-dom'
import {Button} from '@/components/ui/button'

export default function List() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">List Page</h1>
            <div className="space-y-4">
                <p>List content will be here</p>
                <Button asChild>
                    <Link to="/item/1">View Item 1</Link>
                </Button>
            </div>
        </div>
    )
}