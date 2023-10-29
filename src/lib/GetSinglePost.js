import {DrupalClient} from "next-drupal";

export default async function GetSinglePost(slug) {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const path = await drupal.translatePath('/' + slug);
    const article = await drupal.getResource('node--article', path.entity.uuid,
        {
            params: {
                // "fields[node--article]" : 'title,created,body,path',
                "include": "field_category,field_image",
            }
        });


    if(!article){
        return null;
    }
    return article;
}