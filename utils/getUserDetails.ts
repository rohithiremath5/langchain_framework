
type UserDetails = {
    userId: string;
    name: string;
    city: string;
    country: string;
    timezone: string;
};

const users: Record<string, UserDetails> = {
    user_101: {
        userId: "user_101",
        name: "Rohit",
        city: "Bengaluru",
        country: "India",
        timezone: "Asia/Kolkata",
    },
    user_102: {
        userId: "user_102",
        name: "John",
        city: "New York",
        country: "United States",
        timezone: "America/New_York",
    },
};

function getDetails(userId: string): UserDetails {
    const user = users[userId];

    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }
    console.log(`User details for ${userId}:`, user);

    return user;
}

export { getDetails };