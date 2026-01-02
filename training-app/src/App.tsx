import { useState, useEffect } from 'react'
import {useWorkouts} from './hooks/useWorkouts.tsx'
import './App.css'

function App() {
    const {items,loading,create,remove} = useWorkouts()
    const [note,setNote] = useState('')

    const add = async () => {
        await create({
            date: new Date().toISOString().slice(0,10),
            notes: note || undefined,
        })
        setNote('')
    }
    return (
        <div>
            <h1>Training App</h1>
            <div>
                <input value={note} onChange = {e => setNote(e.target.value)}/>
                <button onClick={add} disabled ={loading}>Add</button>
            </div>
            <ul>
                {items.map(w=>(
                    <li key = {w.id}>
                        {w.date} {w.notes ?? ''}
                        <button onClick = {() => remove(w.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
