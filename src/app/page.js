import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import getPosts from "@/lib/GetPosts";
import {notFound} from "next/navigation";

export const revalidate=0

export default async function Home() {
    const posts = await getPosts();
    if(!posts)
        return notFound()
    return (
        <main>
            <Header/>
            <Menu/>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Posts...</div>}>
                    <div className={"m-3 md:m-0 md:w-3/5"}>
                        {posts.map((post,index)=>(
                            <PostGrid key={index} post={post} />
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
