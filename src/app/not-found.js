import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
    const headersList = headers()
    const domain = headersList.get('host')
    return (
        <div className={"border-2 h-screen text-center align-middle"}>
            <h2 className={"dark:text-white text-3xl"}>Not Found</h2>
            <p className={"dark:text-white"}>Could not find requested resource</p>
        </div>
    )
}