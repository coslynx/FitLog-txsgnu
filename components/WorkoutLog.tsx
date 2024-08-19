"use client";

import { useStore } from "@/store";
import { useState } from "react";
import { formatDate } from "@/utils/helpers";
import { WorkoutLogProps } from "@/types";

export function WorkoutLog({ className }: WorkoutLogProps) {
  const { user, logWorkout, workouts, getWorkouts } = useStore();
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState(0);
  const [intensity, setIntensity] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await logWorkout(
      workoutType,
      duration,
      intensity,
      caloriesBurned,
      description
    );
    setWorkoutType("");
    setDuration(0);
    setIntensity("");
    setCaloriesBurned(0);
    setDescription("");
  };

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-2xl font-bold">Workout Log</h2>

      {/* Workout Logging Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="workoutType" className="font-medium">
            Workout Type:
          </label>
          <select
            id="workoutType"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Yoga">Yoga</option>
            {/* Add more workout types as needed */}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="duration" className="font-medium">
            Duration (mins):
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="intensity" className="font-medium">
            Intensity:
          </label>
          <select
            id="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Intensity</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Vigorous">Vigorous</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="caloriesBurned" className="font-medium">
            Calories Burned:
          </label>
          <input
            type="number"
            id="caloriesBurned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="description" className="font-medium">
            Description (optional):
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Log Workout
        </button>
      </form>

      {/* Workout Log History */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Workout Log History</h3>
        {workouts.length === 0 && (
          <p className="text-gray-500">No workouts logged yet.</p>
        )}
        {workouts.map((workout) => (
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
        ))}
      </div>
    </div>
  );
}