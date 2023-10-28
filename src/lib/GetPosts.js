import {DrupalClient} from "next-drupal";

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
        throw new Error('Failed to fetch data')
    }
    return articles;

    // const res = await fetch(`${process.env.BACKEND_URL}/api?_format=json`, { cache: 'no-store'})
    // // The return value is *not* serialized
    // // You can return Date, Map, Set, etc.
    //
    // // Recommendation: handle errors
    // if (!res.ok) {
    //     // This will activate the closest `error.js` Error Boundary
    //     throw new Error('Failed to fetch data')
    // }
    //
    // return res.json();
}