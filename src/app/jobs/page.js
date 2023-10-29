import {Suspense} from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import getJobs from "@/lib/GetJobs";
import JobGrid from "@/components/JobGrid";
import Disclaimer from "@/components/Disclaimer";

export const revalidate = 0
export default async function Home() {
    const posts = await getJobs();
    return (
        <main>
            <Header/>
            <Menu/>
            <Disclaimer/>
            <div className={"md:flex md:justify-center"}>
                <Suspense fallback={<div>Loading Jobs...</div>}>
                    <div className={"m-3 md:m-0 md:w-3/5"}>
                        {posts.map((post,index)=>(
                            // <PostGrid key={index} time={post.created} href={post.nid+'-'+post.view_node.substr('1')} summary={post.summary} title={post.title} image={process.env.BACKEND_URL + post.field_image}/>
                            <JobGrid key={index} post={post}/>
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
