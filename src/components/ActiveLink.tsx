'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ActiveLinkProps {
    href: string;
    children: ReactNode;
}

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
    const pathname = usePathname();

    return (
        // <Link href={href}>
        //    <a className={pathname === href ? "text-blue-600" : ""}>{children}</a> 
        // </Link>
        <Link href={href} className={pathname === href ? "text-blue-600" : ""}>
            {children}
        </Link>
    );
};

export default ActiveLink;

