"use client";

import { useStore } from "@/store";
import { UserProfile } from "./UserProfile";
import { useRouter } from "next/navigation";

interface SocialFeedProps {
  user: {
    id: number;
    name: string;
    image: string;
  };
  className?: string;
}

export function SocialFeed({ user, className }: SocialFeedProps) {
  const { friends, getFriends, getSocialUpdates } = useStore();
  const router = useRouter();
  const [socialUpdates, setSocialUpdates] = useState([]);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  useEffect(() => {
    if (friends.length > 0) {
      getSocialUpdates();
    }
  }, [friends.length, getSocialUpdates]);

  useEffect(() => {
    setSocialUpdates(user?.socialUpdates || []);
  }, [user?.socialUpdates]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-2xl font-bold">Social Feed</h2>
      {socialUpdates.length === 0 && (
        <p className="text-gray-500">
          No social updates yet. Connect with friends to see their achievements!
        </p>
      )}
      {socialUpdates.map((update) => {
        const friend = friends.find((friend) => friend.id === update.userId);
        if (friend) {
          return (
            <div
              key={update.id}
              className="flex items-center gap-4 rounded-md p-4 bg-gray-100"
              onClick={() => router.push(`/friends/${friend.id}`)}
            >
              <UserProfile
                user={friend}
                size="small"
                className="cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="font-medium">{friend.name}</p>
                <p className="text-gray-600">{update.content}</p>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}