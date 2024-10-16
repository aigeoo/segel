import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            // {...props}
            src="/images/logo.png"
            className="block h-24 w-auto fill-current text-gray-800 dark:text-gray-200"
        >
        </img>
    );
}
