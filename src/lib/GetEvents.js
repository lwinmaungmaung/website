import {DrupalClient} from "next-drupal";
import {notFound} from "next/navigation";

export default async function getEvents() {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const events = await drupal.getResourceCollection(
        "node--event",
        {
            params:{
                "include": "field_event_category,field_image",
                sort: "-created"
            }
        }
    )

    if(!events){
        return notFound()
    }
    return events;
}