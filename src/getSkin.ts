export async function getMinecraftSkin(username: string) {
    try {
        // Step 1: Get the player's UUID
        const uuidResponse = await fetch(
            `https://api.mojang.com/users/profiles/minecraft/${username}`
        );
        if (!uuidResponse.ok) {
            throw new Error("Player not found");
        }
        const uuidData = await uuidResponse.json();
        const uuid = uuidData.id;

        // Step 2: Get the skin data using the UUID
        const skinResponse = await fetch(
            `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
        );
        if (!skinResponse.ok) {
            throw new Error("Skin not found");
        }
        const skinData = await skinResponse.json();

        // Get the skin URL
        const skinUrl = `https://textures.minecraft.net/texture/${skinData.properties[0].value}`;

        // Return the skin URL
        return skinUrl;
    } catch (error) {
        return null;
    }
}
