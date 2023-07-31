import Link from "next/link";

export default async function Menu(){
    const mainMenu = await getMainMenu();
    return (
        <div className={"border-t-2 border-b-2 border-gray-300 my-3 md:my-6 py-3 flex justify-center"}>
            {mainMenu.map((menu_item,index) => (
                <Link href={menu_item.href} key={index} className={"mx-6 dark:text-white"}>{menu_item.title} </Link>
            ))}
        </div>
    );
}

async function fetchMainMenu()    {
    const res = await fetch(`${process.env.MAIN_MENU_URL}`,{ cache: "no-store"});
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json();
}
async function getMainMenu(){
    const mainMenuRec = await fetchMainMenu();
    const linkset = mainMenuRec.linkset[0];
    return linkset.item;
}