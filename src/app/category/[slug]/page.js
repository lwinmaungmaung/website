import {Suspense} from "react";
import PostGrid from "@/components/PostGrid";
import Link from "next/link";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import {DrupalClient} from "next-drupal";
import {notFound} from "next/navigation";

async function getData(slug) {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const path = await drupal.translatePath('/category/' + slug);
    if(!path) return notFound()
    const articles = await drupal.getResourceCollection('node--article',
        {
            params: {
                "include": "field_category,field_image",
                sort : '-created',
                'filter[field_category.id][value]': path.entity.uuid
                // 'filter[taxonomy_term--field_category][condition][value]' : path.entity.uuid
            }
        });
    if(!articles){
        return notFound()
    }
    return articles;
}



export default async function Category(props) {
    const posts = await getData(props.params.slug);
    return (
        <main>
            <Header/>
            <Menu/>
            <div className="flex justify-center">
                <div className="w-3/5">
                    <Link href={"/"} className="mt-2 dark:text-white font-bold border-2 border-gray-500 dark:border-white rounded-full absolute px-2 py-1 -ml-12">
                        &lt;-
                    </Link>
                    <h1 className=" text-4xl dark:text-white">{props.params.slug}</h1>
                </div>
            </div>

            <div className={"flex justify-center"}>
                <Suspense fallback={<div>Loading Posts...</div>}>
                    <div className={"w-3/5"}>
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
