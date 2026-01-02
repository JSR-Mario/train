import Dexie from 'dexie'
import type {Table} from 'dexie'
import type { Workout, Exercise, Set } from '../domain'

export class TrainingDB extends Dexie {
    workouts!: Table<Workout, string>
    exercises!: Table<Exercise, string>
    sets!: Table<Set, string>

    constructor(){
        super('training-db')

        this.version(1).stores({
            workouts: 'id,date,updatedAt',
            exercises: 'id,name',
            sets: 'id,workoutId,exerciseId,updatedAt',
        })
    }
}

export const db = new TrainingDB()
