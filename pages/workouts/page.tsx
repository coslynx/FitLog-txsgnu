"use client";

import { useStore } from "@/store";
import { WorkoutLog } from "@/components/WorkoutLog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Workouts() {
  const { user, workouts, getWorkouts, logWorkout, deleteWorkout } = useStore();
  const router = useRouter();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      getWorkouts();
    }
  }, [user, getWorkouts]);

  const handleWorkoutSelect = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
  };

  const handleWorkoutDelete = async (workoutId: number) => {
    await deleteWorkout(workoutId);
    setSelectedWorkoutId(null);
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Workouts</h1>
      <WorkoutLog className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="cursor-pointer"
            onClick={() => handleWorkoutSelect(workout.id)}
          >
            <div
              key={workout.id}
              className="flex items-center justify-between rounded-md p-4 bg-gray-100"
            >
              <p className="font-medium">{workout.workoutType}</p>
              <span className="text-gray-500">
                {formatDate(workout.date)}
              </span>
              <span className="text-gray-600">
                {workout.duration} mins,{" "}
                {workout.intensity === "Light"
                  ? "Light Intensity"
                  : workout.intensity === "Moderate"
                  ? "Moderate Intensity"
                  : workout.intensity === "Vigorous"
                  ? "Vigorous Intensity"
                  : "N/A"},{" "}
                {workout.caloriesBurned} calories burned
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedWorkoutId && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4"
          onClick={() => handleWorkoutDelete(selectedWorkoutId)}
        >
          Delete Workout
        </button>
      )}
    </div>
  );
}