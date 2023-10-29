import {Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderSmall from "@/components/HeaderSmall";
import GetSinglePost from "@/lib/GetSinglePost";
import {notFound} from "next/navigation";
import moment from "moment";

export const revalidate = 0
function readingTime(body_text) {
    const wpm = 225;
    const words = body_text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}

export async function generateMetadata(props) {
    // read route params
    const post = await GetSinglePost(props.params.slug.join('/'))
    if (post === null) return {title: 'lwinmaungmaung'};
    return {
        title: post.title,
        // description: post.summary.replace(/(<([^>]+)>)/gi, ""),
        openGraph: {
            sitename: "Lwin Maung Maung - My Notes",
            title: post.title,
            image: process.env.BACKEND_URL + post.full_image,
            url: "https://www.lwinmaungmaung.com" + post.view_node,
            type: 'article',
            // description: post.summary.replace(/(<([^>]+)>)/gi, "")
        }
    }

}

export default async function Post(props) {
    const post = await GetSinglePost(props.params.slug.join('/'));
    if (post === null) return notFound();

    return (
        <main>
            <title>{post.title}</title>
            <meta name={"og:image"} content={process.env.BACKEND_URL + post.full_image}/>
            <meta name="MobileOptimized" content="width"/>
            <meta name="HandheldFriendly" content="true"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content="@lwinmaung_maung"/>
            <meta name="twitter:site" content="@lwinmaung_maung"/>
            {/*<meta name={"twitter:description"} content={post.summary.replace(/(<([^>]+)>)/gi, "")}/>*/}
            {/*<meta name={"description"} content={post.summary.replace(/(<([^>]+)>)/gi, "")}/>*/}
            <HeaderSmall/>
            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Post...</div>}>
                    <div className={"m-3 md:m-0 md:w-3/5"}>
                        <div className="">
                            <Link href={"/"}
                                  className="dark:text-white font-bold border-2 border-gray-500 dark:border-white rounded-full absolute px-2 py-1 -mt-10 md:mt-0 md:-ml-12">
                                &lt;-
                            </Link>
                            <div className="">
                                <h1 className="mt-12 md:mt-8 text-4xl dark:text-white">{post.title}</h1>
                                <div className="text-sm my-2 dark:text-gray-300">
                                    Published on &nbsp;
                                    <span
                                        dangerouslySetInnerHTML={{__html: moment(post.created).format('MMM Do, Y')}}></span>
                                    <span className={'mx-2 text-gray-600'}>
                                        Updated: &nbsp;
                                        <span
                                            dangerouslySetInnerHTML={{__html: moment(post.updated).format('MMM Do, Y')}}></span>
                                    </span>
                                </div>
                                <div className={"text-gray-500 text-sm"}>
                                    {readingTime(post.body.processed)} mins Read
                                </div>
                            </div>
                        </div>

                        <div>{(post.field_url)? <div className="my-4 text-white text-xl bg-red-500 p-2">Live Now : <a href={post.field_url.uri}>{post.field_url.title}</a></div> :''}</div>

                        <Image className={"my-3 md:my-6"} src={process.env.BACKEND_URL + post.field_image.uri.url}
                               alt={"Field Image"} width={1920} height={1080} loading={"lazy"}/>
                        <div className="my-3 dark:text-white content-body">
                            <div dangerouslySetInnerHTML={{__html: post.body.processed}}></div>
                            {/*<TextLong value={post.body.processed}/>*/}
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
