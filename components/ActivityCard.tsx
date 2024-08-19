"use client";

import { useStore } from "@/store";
import { useState } from "react";
import { formatDate } from "@/utils/helpers";

interface ActivityCardProps {
  activity: {
    id: number;
    type: string;
    date: Date;
    duration: number;
    caloriesBurned: number;
    description?: string;
    foodId?: number;
    foodName?: string;
    foodCalories?: number;
  };
  className?: string;
}

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const { user } = useStore();
  const [showDetails, setShowDetails] = useState(false);

  const isWorkout = activity.type === "workout";

  return (
    <div
      className={`rounded-md shadow-md bg-white p-4 flex flex-col gap-4 cursor-pointer ${className}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{isWorkout ? "Workout" : "Meal"}</h3>
        <span className="text-gray-500">{formatDate(activity.date)}</span>
      </div>

      <div className="flex items-center justify-between">
        {isWorkout ? (
          <span className="text-gray-600">
            {activity.duration} mins •{" "}
            {activity.caloriesBurned} calories burned
          </span>
        ) : (
          <span className="text-gray-600">
            {activity.foodName} • {activity.foodCalories} calories
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showDetails && (
        <div className="flex flex-col gap-2">
          {activity.description && (
            <p className="text-gray-600">{activity.description}</p>
          )}
        </div>
      )}
    </div>
  );
}