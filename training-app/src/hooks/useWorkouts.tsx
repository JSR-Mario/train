import { useEffect, useState, useCallback } from 'react'
import type { Workout } from '../domain'
import * as workoutsService from '../db/workouts'

export function useWorkouts() {
    const [items, setItems] = useState<Workout[]> ([])
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState<Error | null>(null)

    const load = useCallback(
      async () => {
          try {
              setLoading(true) 
              const all = await workoutsService.getAllWorkouts()
              setItems(all)
          } catch (err) {
              setError(err as Error)
          } finally {
              setLoading(false)
          }
      }, []
    )

    useEffect(()=>{
        load()

        const onChanges = () => {
            void load()
        }

        try{
            const {db} = require('../db/schema.ts')
            db.on('changes',onChanges)
            return () => db.on('changes').unsubscribe && db.on('changes').unsubscribe()
        }catch {
            return () => {}
        }
    }, [load])

    const create = useCallback(async (payload:Omit<Workout, 'id'|'updatedAt'>) => {
        const id = await workoutsService.addWorkout(payload)
        await load()
        return id
    }, [load])

    const remove = useCallback(async (id:string)=>{
        await workoutsService.deleteWorkout(id)
        await load()
    }, [load])

    const modify = useCallback(async (id:string, patch:Partial<Omit<Workout, 'id'>>) => {
        await workoutsService.updateWorkout(id,patch)
        await load()
    }, [load])
    return {items, loading, error, reload: load, create, remove, modify}
}
