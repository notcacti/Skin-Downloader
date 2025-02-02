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

        const valueDetails = JSON.parse(atob(skinData.properties[0].value));

        const skinTextureUrl = valueDetails.textures.SKIN.url;

        console.log(skinTextureUrl);
        // Step 3: Fetch the skin texture and convert it to Base64
        const imageResponse = await fetch(skinTextureUrl);
        if (!imageResponse.ok) {
            throw new Error("Failed to fetch skin texture");
        }
        const imageRes = await imageResponse.arrayBuffer();
        const imageBuffer = Buffer.from(imageRes);

        return imageBuffer;
    } catch (error) {
        console.error(error);
        return null;
    }
}
