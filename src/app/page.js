import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";
import Header from "@/components/Header";
import Menu from "@/components/Menu";


async function getData() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/?_format=json`, {next:{tags:['posts']}})
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
    const posts = await getData();
    return (
        <main>
            <Header/>
            <Menu/>
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
