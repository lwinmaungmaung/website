import {DrupalClient} from "next-drupal";
import {notFound} from "next/navigation";

export default async function getJobs() {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const jobs = await drupal.getResourceCollection(
        "node--job",
        {
            params:{
                "include": "field_category",
                sort: "-created"
            }
        }
    )
    return jobs?? notFound()
}