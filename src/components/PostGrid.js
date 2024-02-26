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
                    <span>{moment(post.created).format('MMM Do, Y')}</span>
                </div>
                {
                    (post.changed && moment(post.created).format('MMM Do, Y') !== moment(post.changed).format('MMM Do, Y')) &&
                    <div className={'md:mx-2 text-gray-600'}> |
                        Updated: &nbsp;
                        <span>{moment(post.changed).format('MMM Do, Y')}</span>
                    </div>
                }


            </div>
            <div className={"md:flex md:mx-auto"}>
                <div className="w-fit md:w-4/5 md:pr-3 align-middle">
                    <Link href={ post.path.alias?? '/node/'+post.drupal_internal__nid } className="text-xl font-bold dark:text-white">{post.title}</Link>
                    <p className={"text-sm my-3 dark:text-white"}>{(post.body.summary)?post.body.summary.replace(/(<([^>]+)>)/gi, ""):post.body.processed.replace(/(<([^>]+)>)/gi, "").substring(0,300)+"..."}</p>
                </div>
                <div className="w-fit md:w-1/5 flex justify-center md:aspect-square">
                    { (post.field_image?.uri.url)? <Image className={"object-contain h-auto hidden lg:block w-full"} src={ process.env.BACKEND_URL + post.field_image.uri.url} alt={"none"} width={100} height={100} loading={"lazy"}/> : ""}


                </div>
            </div>
            <div className="text-sm my-2 category-balloon flex">
                { post.field_category && post.field_category.map((category,index)=>(
                    <div key={index} className={"p-2 border uppercase text-l pt-2.5 border-gray-300 mx-0.5 first:rounded-l-full bg-gray-300"} >{category.name??''}</div>
                ))}

                <div className={"flex text-gray-500 mx-0.5 p-2 dark:text-gray-300 rounded-r-full border border-gray-300"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    <b>{reading_time}</b>m
                </div>

            </div>
        </div>

    );
}