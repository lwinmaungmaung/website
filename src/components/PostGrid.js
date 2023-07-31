import Image from "next/image";
import Link from "next/link";

function readingTime(body_text) {
    const wpm = 225;
    const words = body_text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}
export default function PostGrid(props) {
    const post = props.post;
    const reading_time = readingTime(props.post.body)
    return (
        <div className={"my-3 md:my-9 pb-5 border-b border-gray-200"}>
            <div className="text-sm my-2 dark:text-gray-300">
                Published on &nbsp;
                <span dangerouslySetInnerHTML={{__html: post.created}}></span>
            </div>
            <div className={"flex"}>
                <div className="w-4/5 pr-3 align-middle">
                    <Link href={ post.view_node } className="text-xl font-bold dark:text-white">{post.title}</Link>
                    <p className={"text-sm my-3 dark:text-white"}>{post.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                </div>
                <div className="w-1/5 flex justify-center">
                    { (props.image)? <Image src={props.image} alt={"none"} width={150} height={102}/> : ""}


                </div>
            </div>
            <div className="text-sm my-2 category-balloon flex">
                <span dangerouslySetInnerHTML={{__html: post.field_category}}></span>
                <span className={"text-gray-500 p-2 dark:text-gray-300"}>{reading_time} mins Read</span>
            </div>
        </div>

    );
}