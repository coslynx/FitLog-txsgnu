"use client";

import { useStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoalFormProps, Goal } from "@/types";

export function GoalForm({ className, goal }: GoalFormProps) {
  const { user, createGoal, updateGoal, goals } = useStore();
  const router = useRouter();
  const [goalType, setGoalType] = useState(goal?.type || "");
  const [target, setTarget] = useState(goal?.target || 0);
  const [timeline, setTimeline] = useState(goal?.timeline || new Date());
  const [description, setDescription] = useState(goal?.description || "");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (goal) {
      await updateGoal(goal.id, goalType, target, timeline, description);
      router.push("/goals");
    } else {
      await createGoal(goalType, target, timeline, description);
      router.push("/goals");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="goalType" className="font-medium">
          Goal Type:
        </label>
        <select
          id="goalType"
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Weight Loss">Weight Loss</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Exercise">Exercise</option>
          <option value="Nutrition">Nutrition</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="target" className="font-medium">
          Target:
        </label>
        <input
          type="number"
          id="target"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="timeline" className="font-medium">
          Timeline:
        </label>
        <input
          type="date"
          id="timeline"
          value={timeline.toISOString().slice(0, 10)}
          onChange={(e) => setTimeline(new Date(e.target.value))}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
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
        {goal ? "Update Goal" : "Create Goal"}
      </button>
    </form>
  );
}