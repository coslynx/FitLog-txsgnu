"use client";

import { useStore } from "@/store";
import { GoalCard } from "@/components/GoalCard";
import { GoalForm } from "@/components/GoalForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Goals() {
  const { user, goals, getGoals, createGoal, updateGoal, deleteGoal } =
    useStore();
  const router = useRouter();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      getGoals();
    }
  }, [user, getGoals]);

  const handleGoalSelect = (goalId: number) => {
    setSelectedGoalId(goalId);
  };

  const handleGoalDelete = async (goalId: number) => {
    await deleteGoal(goalId);
    setSelectedGoalId(null);
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Goals</h1>
      {selectedGoalId ? (
        <GoalForm
          className="mb-8"
          goal={goals.find((goal) => goal.id === selectedGoalId)}
        />
      ) : (
        <GoalForm className="mb-8" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="cursor-pointer" onClick={() => handleGoalSelect(goal.id)}>
            <GoalCard goal={goal} />
          </div>
        ))}
      </div>
      {selectedGoalId && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4"
          onClick={() => handleGoalDelete(selectedGoalId)}
        >
          Delete Goal
        </button>
      )}
    </div>
  );
}