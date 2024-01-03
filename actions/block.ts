"use server";

import { revalidatePath } from "next/cache";
// import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"

// const roomService = new RoomServiceClient(
//   process.env.LIVEKIT_API_URL!,
//   process.env.LIVEKIT_API_KEY!,
//   process.env.LIVEKIT_API_SECRET!,
// );

export const onBlock = async (id: string) => {

    const self = await getSelf();
  
    //todo: Adapt to disconnect from livestream
    //TODO: allow ability to kick guest


    const blockedUser = await blockUser(id);
    revalidatePath("/");
    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
};

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

    // revalidatePath(`/u/${self.username}/community`);
    revalidatePath("/");
    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`);
    }
    return unblockedUser;
};