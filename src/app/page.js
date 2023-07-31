import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import getPosts from "@/lib/GetPosts";


export default async function Home() {
    const posts = await getPosts();
    return (
        <main>
            <Header/>
            <Menu/>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Posts...</div>}>
                    <div className={"m-3 md:m-0 md:w-3/5"}>
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
