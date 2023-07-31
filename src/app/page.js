import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";

async function fetchMainMenu()    {
    const res = await fetch(`${process.env.MAIN_MENU_URL}`,{cache: "no-store"});
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}
async function getMainMenu(){
    const mainMenuRec = await fetchMainMenu();
    const linkset = mainMenuRec.linkset[0];
    return linkset.item;
}
async function getData() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/?_format=json`, {cache: "no-store"})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}



export default async function Home() {
    const mainMenu = await getMainMenu();
    const posts = await getData();
    return (
        <main>
            <div className={"mt-3 md:mt-8 dark:text-white"}>
                <h1 className="text-5xl text-center font-Montserrat-header">Lwin Maung Maung</h1>
                <h2 className="text-3xl text-center text-gray-500">My Notes and Blogs</h2>
            </div>
            <div className={"border-t-2 border-b-2 border-gray-300 my-3 md:my-6 py-3 flex justify-center"}>
                {mainMenu.map((menu_item,index) => (
                    <Link href={menu_item.href} key={index} className={"mx-6 dark:text-white"}>{menu_item.title} </Link>
                ))}
            </div>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Posts...</div>}>
                    <div className={"w-3/5"}>
                        {posts.map((post,index)=>(
                            // <PostGrid key={index} time={post.created} href={post.nid+'-'+post.view_node.substr('1')} summary={post.summary} title={post.title} image={process.env.BACKEND_URL + post.field_image}/>
                            <PostGrid key={index} post={post} image={process.env.BACKEND_URL + post.field_image}/>
                        ))}
                    </div>
                </Suspense>
            </div>

            <div className={"text-center dark:text-white"}>
                &copy; lwinmaungmaung MMXXIII. All Rights Reserved.
            </div>
        </main>
    )
}
