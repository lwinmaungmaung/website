import {Suspense} from "react";
import Image from "next/image";
import Link from "next/link";

function readingTime(body_text) {
    const wpm = 225;
    const words = body_text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}
async function getData() {
    const res = await fetch(`${process.env.BACKEND_URL}/api?_format=json`, {cache: "no-store"})
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

async function getSinglePost(slug){
    const data = await getData();
    if(slug!=""){
        const post = data.find(post => post.view_node ===  '/'+slug)
        if(!post){
            return null;
        }
        return post
    }
    return null;
}


export function generateMetadata() {
    // read route params
    return {
        title : "Lwin Maung Maung"
    }

    // const id = params.id
    //
    // // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())
    //
    // // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    //
    // return {
    //     title: product.title,
    //     openGraph: {
    //         images: ['/some-specific-page-image.jpg', ...previousImages],
    //     },
    // }
}
export default async function Post(props) {
    const post = await getSinglePost(props.params.slug);
    return (
        <main>
            <title>{post.title}</title>
            <div className={"mt-3 mx-3 md:mx-8 md:mt-8 dark:text-white flex"}>
                <h1 className="w-1/2  text-3xl text-left font-Montserrat-header text-left">Lwin Maung Maung</h1>
                <h2 className="w-1/2 pt-1.5 text-xl text-right text-gray-500">My Notes and Blogs</h2>
            </div>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Post...</div>}>
                    <div className={"w-3/5"}>
                        <div className="">
                            <Link href={"/"} className="dark:text-white font-bold border-2 border-gray-500 dark:border-white rounded-full absolute px-2 py-1 -ml-12">
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
