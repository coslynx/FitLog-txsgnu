"use client";

import { useStore } from "@/store";
import { ProgressChart } from "./ProgressChart";
import { formatDate } from "@/utils/helpers";

interface GoalCardProps {
  goal: {
    id: number;
    type: string;
    target: number;
    progress: number;
    timeline: Date;
    description?: string;
  };
  className?: string;
}

export function GoalCard({ goal, className }: GoalCardProps) {
  const { user } = useStore();

  const progressPercentage =
    (goal.progress / goal.target) * 100 || 0;

  return (
    <div
      className={`rounded-md shadow-md bg-white p-4 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{goal.type}</h3>
        <span className="text-gray-500">
          {formatDate(goal.timeline)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-600">
          {goal.progress} / {goal.target}
        </span>
        <span className="text-gray-500">
          {progressPercentage.toFixed(0)}%
        </span>
      </div>

      {goal.description && (
        <p className="text-gray-600">{goal.description}</p>
      )}

      <ProgressChart
        progress={progressPercentage}
        className="h-4 rounded-full"
      />
    </div>
  );
}