import Link from "next/link";
import {DrupalClient} from "next-drupal";

export default async function Menu(){
    const mainMenu = await getMainMenu();
    return (
        <div className={"border-t-2 border-b-2 border-gray-300 my-3 md:my-6 py-3 flex justify-center"}>
            {mainMenu.map((menu_item,index) => (
                <Link href={menu_item.url} key={index} className={"mx-6 dark:text-white"}>{menu_item.title} </Link>
            ))}
        </div>
    );
}

async function fetchMainMenu()    {
    const drupal = new DrupalClient(process.env.BACKEND_URL);
    const { menu, items } = await drupal.getMenu("main")
    if (!items) {
        throw new Error('Failed to fetch data')
    }
    return items;
}
async function getMainMenu(){
    const mainMenuRec = await fetchMainMenu();
    return mainMenuRec;
}