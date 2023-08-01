import Link from 'next/link'

function Navbar() {
    return (
        <nav>
            <ul className="flex">
                <li className="mr-6">
                    <Link className="nav-links" href="/">Home</Link>
                </li>
                <li className="mr-6">
                    <Link className="nav-links" href="/profile">Profile</Link>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar