import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import getEvents from "@/lib/GetEvents";

export const revalidate = 180
export default async function Home() {
    const posts = await getEvents();
    return (
        <main>
            <Header/>
            <Menu/>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Posts...</div>}>
                    <div className={"m-3 md:m-0 md:w-3/5"}>
                        {posts.map((post,index)=>(
                            // <PostGrid key={index} time={post.created} href={post.nid+'-'+post.view_node.substr('1')} summary={post.summary} title={post.title} image={process.env.BACKEND_URL + post.field_image}/>
                            <PostGrid key={index} post={post}/>
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
