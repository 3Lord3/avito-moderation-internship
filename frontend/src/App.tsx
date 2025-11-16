import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import List from '@/pages/List'
import Stats from '@/pages/Stats'
import Item from '@/pages/Item/[id]'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/list" replace/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/stats" element={<Stats/>}/>
                <Route path="/item/:id" element={<Item/>}/>
            </Routes>
        </Layout>
    )
}

export default App