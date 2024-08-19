"use client";

import { useStore } from "@/store";
import { UserProfile } from "@/components/UserProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserWithFriends } from "@/types";

export default function Profile() {
  const { user, getFriends, getSocialUpdates, getUser } = useStore();
  const router = useRouter();
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      getUser();
      getFriends();
    }
  }, [user, getUser, getFriends]);

  useEffect(() => {
    if (friends.length > 0) {
      getSocialUpdates();
    }
  }, [friends.length, getSocialUpdates]);

  const handleFriendSelect = (friendId: number) => {
    setSelectedFriendId(friendId);
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      friend.id !== user?.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <UserProfile user={user as UserWithFriends} size="large" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Your Friends</h2>
        {filteredFriends.length === 0 && (
          <p className="text-gray-500">You don't have any friends yet.</p>
        )}
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-4 rounded-md p-4 bg-gray-100 cursor-pointer"
            onClick={() => handleFriendSelect(friend.id)}
          >
            <UserProfile user={friend} size="small" className="cursor-pointer" />
            <div className="flex flex-col">
              <p className="font-medium">{friend.name}</p>
              {/* Add additional information here as needed. */}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Friend Profile */}
      {selectedFriendId && (
        <div className="flex flex-col gap-4">
          {filteredFriends.find((friend) => friend.id === selectedFriendId) && (
            <UserProfile
              user={filteredFriends.find(
                (friend) => friend.id === selectedFriendId
              ) as UserWithFriends}
              size="large"
              className="cursor-pointer"
            />
          )}
        </div>
      )}
    </div>
  );
}