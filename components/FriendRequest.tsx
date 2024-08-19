"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserProfile } from "./UserProfile";

interface FriendRequestProps {
  friend: {
    id: number;
    name: string;
    image: string;
  };
  className?: string;
}

export function FriendRequest({ friend, className }: FriendRequestProps) {
  const { sendFriendRequest, acceptFriendRequest, declineFriendRequest } =
    useStore();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSendFriendRequest = async () => {
    setIsPending(true);
    await sendFriendRequest(friend.id);
    setIsPending(false);
  };

  const handleAcceptFriendRequest = async () => {
    setIsPending(true);
    await acceptFriendRequest(friend.id);
    setIsPending(false);
    router.refresh();
  };

  const handleDeclineFriendRequest = async () => {
    setIsPending(true);
    await declineFriendRequest(friend.id);
    setIsPending(false);
    router.refresh();
  };

  return (
    <div className={`flex items-center gap-4 rounded-md p-4 bg-gray-100 ${className}`}>
      <UserProfile
        user={friend}
        size="small"
        className="cursor-pointer"
      />
      <div className="flex flex-col">
        <p className="font-medium">{friend.name}</p>
        {isPending ? (
          <p className="text-gray-500">Processing...</p>
        ) : (
          <>
            {/* Display Friend Request Actions */}
          </>
        )}
      </div>
    </div>
  );
}