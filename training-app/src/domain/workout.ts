export type WorkoutId = string

export interface Workout {
    id: WorkoutId
    date: string
    notes?: string
    updatedAt: number
}
