import {db} from './schema.ts'
import type {Workout} from '../domain'

export async function getAllWorkouts(): Promise<Workout[]> {
    return db.workouts.orderBy('date').reverse.toArray()
}

export async function getWorkoutById(id:sting): Promise<Workout | undefined>{
    return db.workouts.get(id)
}

export async function addWorkout(payload: Omit<Workout,'id'|'updatedAt'>): Promise<string>{
    const id = crypto.randomUUID()
    const entry: Workout = {
        ...payload,
        id, 
        updatedAt: Date.now(),
    }
    await db.workouts.add(entry)
    return id
}

export async function updateWorkout(id:string, patch: Partial<Omit<Workout,'id'>>): Promise<void> {
    await db.workouts.update(id, {
        ...patch, 
        updatedAt: Date.now(),
    }as Partial<Workout>)
}

export async function deleteWorkout(id:string): Promise<void>{
    await db.workouts.delete(id)
}
