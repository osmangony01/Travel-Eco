'use client'

import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation'
import ActiveLink from './ActiveLink';

const Navbar = () => {

    const router = useRouter();

    const handleLogOut = async () => {

    }
    

    return (
        <nav className="flex justify-between items-center py-5 px-5 container mx-auto">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <ul className="flex items-center justify-center">
                {/* {
                    navItems.map(({ path, title }) => <li key={path} className="mx-2">
                        <Link href={path}>{title}</Link>
                    </li>)
                } */}
                <li className="mx-2"><ActiveLink href="/">Home</ActiveLink></li>
                <li className="mx-2"><ActiveLink href="/contact">Contact</ActiveLink></li>
                <li className="mx-2"><ActiveLink href="/sign-in">Sign in</ActiveLink></li>
                <li className="mx-2"><ActiveLink href="/sign-up">Sign up</ActiveLink></li>
                {/* <li className="mx-2"><Link href="/profile">Profile</Link></li> */}
                {/* {user && <li className="mx-2"><button onClick={handleLogOut}>Sign Out</button></li>} */}

            </ul>
        </nav>
    );
};

export default Navbar;
