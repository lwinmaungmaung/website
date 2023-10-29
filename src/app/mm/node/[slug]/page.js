import {Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderSmall from "@/components/HeaderSmall";
import getPosts from "@/lib/GetPosts";
import {notFound} from "next/navigation";

function readingTime(body_text) {
    const wpm = 225;
    const words = body_text.trim().split(/\s+/).length;
    return  Math.ceil(words / wpm);
}

async function getSinglePost(slug){
    const data = await getPosts();
    if(slug!==""){
        const post = data.find(post => post.view_node ===  '/mm/node/'+slug)
        if(!post){
            return null;
        }
        return post
    }
    return null;
}


export async function generateMetadata(props) {
    const post = await getSinglePost(props.params.slug)
    if(!post){
        return null;
    }
    return {
        title: post.title,
        description: post.summary.replace(/(<([^>]+)>)/gi, ""),
        openGraph: {
            sitename: "Lwin Maung Maung - My Notes",
            title: post.title,
            image:  process.env.BACKEND_URL + post.full_image,
            url: "https://www.lwinmaungmaung.com"+post.view_node,
            type: 'article',
            description: post.summary.replace(/(<([^>]+)>)/gi, "")
        }
    }
    // return {
    //     title: product.title,
    //     openGraph: {
    //         images: ['/some-specific-page-image.jpg', ...previousImages],
    //     },
    // }
}
export default async function Post(props) {
    const post = await getSinglePost(props.params.slug);
    if(!post){
        notFound();
    }
    return (
        <main>
            <title>{post.title}</title>
            <meta property="og:sitename" content="Lwin Maung Maung - My Notes"/>
            <meta property="og:title" content={post.title}/>
            <meta property="og:image" content={ process.env.BACKEND_URL + post.full_image}/>
            <meta property={"og:url"} content={post.view_node}/>
            <meta property={"og:type"} content={"article"}/>
            <meta name={"og:description"} content={post.summary.replace(/(<([^>]+)>)/gi, "")}/>
            <meta name="MobileOptimized" content="width"/>
            <meta name="HandheldFriendly" content="true"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content="@lwinmaung_maung" />
            <meta name="twitter:site" content="@lwinmaung_maung"/>
            <meta name={"twitter:description"} content={post.summary.replace(/(<([^>]+)>)/gi, "")}/>
            <meta name={"description"} content={post.summary.replace(/(<([^>]+)>)/gi, "")}/>
            <HeaderSmall />
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Post...</div>}>
                    <div className={"w-3/5"}>
                        <div className="">
                            <Link href={"/"} className="dark:text-white font-bold border-2 border-gray-500 dark:border-white rounded-full absolute px-2 py-1 -mt-10 md:mt-0 -ml-12">
                                &lt;-
                            </Link>
                            <div className="">
                                <h1 className="mt-8 text-4xl dark:text-white">{post.title}</h1>
                                <div className="text-sm my-2 dark:text-gray-300">
                                    Published on &nbsp;
                                    <span dangerouslySetInnerHTML={{__html: post.created}}></span>
                                </div>
                                <div className={"text-gray-500 text-sm"}>
                                    {readingTime(post.body)} mins Read
                                </div>
                            </div>
                        </div>

                        <Image className={"my-3 md:my-6"} src={ process.env.BACKEND_URL +post.full_image} alt={"Field Image"} width={1920} height={1080}/>
                        <div className="my-3 dark:text-white content-body">
                            <div dangerouslySetInnerHTML={{__html: post.body}}></div>
                        </div>
                    </div>
                </Suspense>
            </div>

            <div className={"text-center mb-8"}>
                &copy; lwinmaungmaung MMXXIII. All Rights Reserved.
            </div>
        </main>
    )
}
