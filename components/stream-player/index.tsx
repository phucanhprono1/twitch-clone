"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";

import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    stream: CustomStream | null;
    imageUrl: string;
    _count: { followedBy: number }
};
type CustomStream = {
    id: string;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    isLive: boolean;
    thumbnailUrl: string | null;
    name: string;
};
interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream
    isFollowing: boolean;
}
export const StreamPlayer = async({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);
    console.log("user: " + user.id  );
    console.log("token: " + token  );
    console.log("name: " + name  );

    if (!token || !name || !identity) {
        return (
            <div>
                <StreamPlayerSkeleton />
            </div>
        )
    };
    return (
        <>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video
                        hostName={user.username}
                        hostIdentity={user.id}
                    />
                </div>
            </LiveKitRoom>

        </>
    );

};
export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />

            </div>
            <div className="col-span-1 bg-background">

            </div>
        </div>
    )
}