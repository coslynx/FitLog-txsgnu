"use client";

import { useStore } from "@/store";
import { useState } from "react";
import { formatDate } from "@/utils/helpers";
import { MealLogProps } from "@/types";

export function MealLog({ className }: MealLogProps) {
  const { user, logMeal, meals, getMeals } = useStore();
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await logMeal(foodName, foodCalories, description);
    setFoodName("");
    setFoodCalories(0);
    setDescription("");
  };

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-2xl font-bold">Meal Log</h2>

      {/* Meal Logging Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="foodName" className="font-medium">
            Food Name:
          </label>
          <input
            type="text"
            id="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="foodCalories" className="font-medium">
            Calories:
          </label>
          <input
            type="number"
            id="foodCalories"
            value={foodCalories}
            onChange={(e) => setFoodCalories(parseInt(e.target.value))}
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
          Log Meal
        </button>
      </form>

      {/* Meal Log History */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Meal Log History</h3>
        {meals.length === 0 && (
          <p className="text-gray-500">No meals logged yet.</p>
        )}
        {meals.map((meal) => (
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
        ))}
      </div>
    </div>
  );
}