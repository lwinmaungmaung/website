import Image from "next/image";
import Link from "next/link";
import moment from "moment";

function readingTime(body_text) {
    const wpm = 225;
    const words = body_text.trim().split(/\s+/).length;
    return  Math.ceil(words / wpm);
}
export default function PostGrid(props) {
    const post = props.post;
    const reading_time = readingTime(props.post.body.value)
    return (
        <div className={"my-3 md:my-9 pb-5 border-b border-gray-200"}>
            <div className="text-sm my-2 dark:text-gray-300">
                Published on &nbsp;
                <span dangerouslySetInnerHTML={{__html: moment(post.created).format('MMM Do, Y')}}></span>
                <span className={'mx-2 text-gray-600'}>
                Updated: &nbsp;
                    <span dangerouslySetInnerHTML={{__html: moment(post.updated).format('MMM Do, Y')}}></span>
                </span>

            </div>
            <div className={"flex "}>
                <div className="w-fit md:w-4/5 pr-3 align-middle">
                    <Link href={ post.path.alias?? '/node/'+post.drupal_internal__nid } className="text-xl font-bold dark:text-white">{post.title}</Link>
                    <p className={"text-sm my-3 dark:text-white"}>{post.body.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                </div>
                <div className="w-fit md:w-1/5 flex justify-center aspect-square">
                    { (post.field_image.uri.url)? <Image className={"object-contain h-auto w-auto"} src={ process.env.BACKEND_URL + post.field_image.uri.url} alt={"none"} width={220} height={220} loading={"lazy"}/> : ""}


                </div>
            </div>
            <div className="text-sm my-2 category-balloon flex">
                {/*{post.field_category.map((category,index)=>(*/}
                {/*    <span key={index} >{category.resourceIdObjMeta}</span>*/}
                {/*))}*/}
                <span className={"text-gray-500 p-2 dark:text-gray-300"}>{reading_time} mins Read</span>
            </div>
        </div>

    );
}