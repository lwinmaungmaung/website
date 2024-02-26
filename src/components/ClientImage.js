'use client'

import {useWindowSize} from 'react-use'
import Image from "next/image";

export default function ClientImage(props) {
    const {width} = useWindowSize()
    if (props.field_image === undefined) return null;
    return (
        <div>
            {width <= 800 &&
                <Image className={"my-3 md:my-6 w-full lg:hidden"}
                       src={props.field_image}
                       alt={"Field Image"} width={320} height={180} loading={'lazy'}/>}
            {width > 800 &&
                <Image className={"my-3 md:my-6 w-full hidden lg:block"}
                       src={props.field_image}
                       alt={"Field Image"} width={1920} height={1080} loading={'lazy'}/>}
        </div>
    )
}