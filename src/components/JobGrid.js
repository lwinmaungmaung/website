import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default function JobGrid(props) {
    const post = props.post;
    return (
        <div className={"my-3 md:my-9 min-w-full border-b border-gray-200"}>
            <div className={"flex md:mx-auto"}>
                <div className="w-4/5 md:pr-3 align-middle my-3">
                    <div className={"dark:text-gray-300 text-gray-700 my-2"} >{post.field_company}</div>
                    <Link href={ post.path.alias?? '/node/'+post.drupal_internal__nid } className="text-xl font-bold dark:text-white">{post.title}</Link>
                    <div className={"dark:text-gray-300 text-gray-700 my-2"} >{post.field_job_type}</div>
                </div>
                <div className="flex items-center my-3 justify-center">
                    <Link href={ post.path.alias?? '/node/'+post.drupal_internal__nid } className={"dark:bg-gray-300 border border-gray-800 my-2 p-4 rounded mr-3"}>View</Link>
                    <Link target={"_blank"} href={post.field_url.uri} className={"dark:bg-gray-300 border border-gray-800 my-2 p-4 rounded"}>Source</Link>
                </div>

            </div>

        </div>

    );
}