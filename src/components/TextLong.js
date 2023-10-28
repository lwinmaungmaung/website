import parse from "html-react-parser"
import Image from "next/image"

const options = {
    replace: (domNode) => {
        // Look for an img tag and replace it with Image.
        if (domNode instanceof Element && domNode.name === "img") {
            const { src, alt, width, height } = domNode.attribs

            return (
                <Image
                    src={`${process.env.BACKEND_URL}/${src}`}
                    width={`${width}px`}
                    height={`${height}px`}
                    alt={alt}
                    layout="intrinsic"
                    objectFit="cover"
                />
            )
        }
    },
}

export function TextLong(value) {
    return <>{parse(value, options)}</>
}