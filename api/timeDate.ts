
async function getTime(timezone: string) {
    const response = await fetch(
        `https://worldtime.timezone.io/api/timezone/${encodeURIComponent(timezone)}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch time: ${response.status}`);
    }

    const data = await response.json();

    return {
        timezone: data.timezone,
        datetime: data.datetime,
        utcOffset: data.utc_offset,
        abbreviation: data.abbreviation,
    };
}

// Test
// console.log(await getTime("Asia/Kolkata"));
// console.log(await getTime("America/New_York"));
export { getTime };
