"use client";

import { useStore } from "@/store";
import { ActivityCard } from "@/components/ActivityCard";
import { GoalCard } from "@/components/GoalCard";
import { SocialFeed } from "@/components/SocialFeed";
import { ProgressChart } from "@/components/ProgressChart";

export default function Dashboard() {
  const { user, getRecentActivities, recentActivities, goals, getGoals, getSocialUpdates } =
    useStore();

  useEffect(() => {
    if (user) {
      getRecentActivities();
      getGoals();
      getSocialUpdates();
    }
  }, [user, getRecentActivities, getGoals, getSocialUpdates]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recentActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Goal Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Social Feed */}
      <SocialFeed />
    </div>
  );
}