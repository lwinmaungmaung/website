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
            <div className="text-sm my-2 dark:text-gray-300 md:flex">
                <div className={'dark:text-white'}>
                    Published on &nbsp;
                    <span dangerouslySetInnerHTML={{__html: moment(post.created).format('MMM Do, Y')}}></span>
                </div>
                <div className={'md:mx-2 text-gray-600'}>
                Updated: &nbsp;
                    <span dangerouslySetInnerHTML={{__html: moment(post.updated).format('MMM Do, Y')}}></span>
                </div>

            </div>
            <div className={"md:flex md:mx-auto"}>
                <div className="w-fit md:w-4/5 md:pr-3 align-middle">
                    <Link href={ post.path.alias?? '/node/'+post.drupal_internal__nid } className="text-xl font-bold dark:text-white">{post.title}</Link>
                    <p className={"text-sm my-3 dark:text-white"}>{(post.body.summary)?post.body.summary.replace(/(<([^>]+)>)/gi, ""):post.body.processed.replace(/(<([^>]+)>)/gi, "").substring(0,300)+"..."}</p>
                </div>
                <div className="w-fit md:w-1/5 flex justify-center md:aspect-square">
                    { (post.field_image?.uri.url)? <Image className={"object-contain h-auto w-auto"} src={ process.env.BACKEND_URL + post.field_image.uri.url} alt={"none"} width={220} height={220} loading={"lazy"}/> : ""}


                </div>
            </div>
            <div className="text-sm my-2 category-balloon flex">
                { post.field_category && post.field_category.map((category,index)=>(
                    <div key={index} className={"p-2 border border-gray-300 mx-0.5 first:rounded-l-full bg-gray-300"} >{category.name??''}</div>
                ))}

                { post.field_event_category && post.field_event_category.map((category,index)=>(
                    <div key={index} className={"p-2 border border-gray-300 mx-0.5 first:rounded-l-full bg-gray-300"} >{category.name??''}</div>
                ))}

                <div className={"text-gray-500 mx-0.5 p-2 dark:text-gray-300 rounded-r-full border border-gray-300"}>{reading_time} m</div>

            </div>
        </div>

    );
}