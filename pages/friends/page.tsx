"use client";

import { useStore } from "@/store";
import { FriendRequest } from "@/components/FriendRequest";
import { FriendList } from "@/components/FriendList";
import { UserProfile } from "@/components/UserProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, UserWithFriends } from "@/types";

export default function Friends() {
  const { user, friends, getFriends, sendFriendRequest, getFriendRequests, friendRequests, acceptFriendRequest, declineFriendRequest, getSocialUpdates } = useStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  useEffect(() => {
    if (user) {
      getFriends();
      getFriendRequests();
    }
  }, [user, getFriends, getFriendRequests]);

  useEffect(() => {
    if (friends.length > 0) {
      getSocialUpdates();
    }
  }, [friends.length, getSocialUpdates]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFriendSelect = (friendId: number) => {
    setSelectedFriendId(friendId);
  };

  const handleSendFriendRequest = async (userId: number) => {
    await sendFriendRequest(userId);
    router.refresh();
  };

  const handleAcceptFriendRequest = async (friendId: number) => {
    await acceptFriendRequest(friendId);
    router.refresh();
  };

  const handleDeclineFriendRequest = async (friendId: number) => {
    await declineFriendRequest(friendId);
    router.refresh();
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFriendRequests = friendRequests.filter(
    (friendRequest) =>
      friendRequest.receiverId === user?.id &&
      friendRequest.sender.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Friends</h1>

      {/* Search Bar */
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for friends..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Friend List */
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

      {/* Friend Requests */
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Friend Requests</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          onClick={() => setShowFriendRequests(!showFriendRequests)}
        >
          {showFriendRequests ? "Hide Requests" : "View Requests"}
        </button>
        {showFriendRequests && (
          <div>
            {filteredFriendRequests.length === 0 && (
              <p className="text-gray-500">You have no pending friend requests.</p>
            )}
            {filteredFriendRequests.map((friendRequest) => (
              <div
                key={friendRequest.id}
                className="flex items-center gap-4 rounded-md p-4 bg-gray-100"
              >
                <FriendRequest
                  friend={friendRequest.sender}
                  className="cursor-pointer"
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    onClick={() => handleAcceptFriendRequest(friendRequest.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeclineFriendRequest(friendRequest.id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Friend Profile */
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

      {/* Friend Search and Request */
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Find Friends</h2>
        <input
          type="text"
          placeholder="Search for users to add..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFriends
            .filter(
              (friend) =>
                !friend.friends?.some(
                  (f) => f.id === user?.id && friend.id !== user?.id
                ) && friend.id !== user?.id
            )
            .map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-4 rounded-md p-4 bg-gray-100 cursor-pointer"
              >
                <UserProfile user={friend} size="small" className="cursor-pointer" />
                <div className="flex flex-col">
                  <p className="font-medium">{friend.name}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    onClick={() => handleSendFriendRequest(friend.id)}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}