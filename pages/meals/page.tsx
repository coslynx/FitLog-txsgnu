"use client";

import { useStore } from "@/store";
import { MealLog } from "@/components/MealLog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Meals() {
  const { user, meals, getMeals, logMeal, deleteMeal } = useStore();
  const router = useRouter();
  const [selectedMealId, setSelectedMealId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      getMeals();
    }
  }, [user, getMeals]);

  const handleMealSelect = (mealId: number) => {
    setSelectedMealId(mealId);
  };

  const handleMealDelete = async (mealId: number) => {
    await deleteMeal(mealId);
    setSelectedMealId(null);
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meals</h1>
      <MealLog className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="cursor-pointer"
            onClick={() => handleMealSelect(meal.id)}
          >
            <div
              key={meal.id}
              className="flex items-center justify-between rounded-md p-4 bg-gray-100"
            >
              <p className="font-medium">{meal.foodName}</p>
              <span className="text-gray-500">
                {formatDate(meal.date)}
              </span>
              <span className="text-gray-600">
                {meal.foodCalories} calories
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedMealId && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-4"
          onClick={() => handleMealDelete(selectedMealId)}
        >
          Delete Meal
        </button>
      )}
    </div>
  );
}