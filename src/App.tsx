import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RoomProvider } from './peer/RoomContext'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { NightPage } from './pages/NightPage'
import { PlayPage } from './pages/PlayPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <RoomProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="night" element={<NightPage />} />
            <Route path="c/:categoryId" element={<CategoryPage />} />
            <Route path="play/:gameId" element={<PlayPage />} />
          </Route>
        </Routes>
      </RoomProvider>
    </HashRouter>
  )
}

export default App
