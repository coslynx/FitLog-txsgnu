"use client";

import { useStore } from "@/store";
import { UserProfile } from "./UserProfile";
import { useRouter } from "next/navigation";

interface FriendListProps {
  className?: string;
}

export function FriendList({ className }: FriendListProps) {
  const { friends, getFriends } = useStore();
  const router = useRouter();

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-2xl font-bold">Friends</h2>
      {friends.length === 0 && (
        <p className="text-gray-500">
          You don't have any friends yet. Start connecting!
        </p>
      )}
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center gap-4 rounded-md p-4 bg-gray-100 cursor-pointer"
          onClick={() => router.push(`/friends/${friend.id}`)}
        >
          <UserProfile
            user={friend}
            size="small"
            className="cursor-pointer"
          />
          <div className="flex flex-col">
            <p className="font-medium">{friend.name}</p>
            {/* Add additional information here as needed. */}
          </div>
        </div>
      ))}
    </div>
  );
}