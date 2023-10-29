import {DrupalClient} from "next-drupal";
import {notFound} from "next/navigation";

export default async function getPosts() {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const articles = await drupal.getResourceCollection(
        "node--article",
        {
            params:{
                // "fields[node--article]" : 'title,created,body,path',
                "include": "field_category,field_image",
                sort: "-created"
            }
        }
    )

    if(!articles){
        return notFound()
    }
    return articles;
}