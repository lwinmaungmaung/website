export default async function getPosts() {
    const res = await fetch(`${process.env.BACKEND_URL}/api?_format=json`, { cache: 'no-store'})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}