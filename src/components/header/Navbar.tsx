'use client'
import Link from 'next/link'
import styles from './header.module.css'
import { useState } from 'react'
import { IoClose, IoCloudCircle } from 'react-icons/io5'
import { MdMenu } from 'react-icons/md'

interface NavbarProps{
  isAdmin: boolean | undefined
}
const Navbar = ({isAdmin}: NavbarProps) => {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
        <IoCloudCircle/>
          CLOUD
          HOSTING
        </Link>
        <div className={styles.menu} onClick={() => setToggle(prev => !prev)}>
          {toggle ? (<IoClose/>) : (<MdMenu/>)}
        </div>
      </div>

      <div className={styles.navLinksWrapper}
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || " "
        }}
      >
        <ul className={styles.navLinks}>
          <Link className={styles.navLink} onClick={() => setToggle(false)} href='/'>Home</Link>
          <Link className={styles.navLink} onClick={() => setToggle(false)} href='/articles?pageNumber=1'>Articles</Link>
          <Link className={styles.navLink} onClick={() => setToggle(false)} href='/about'>About</Link>
          {
            isAdmin && (<Link className={styles.navLink} onClick={() => setToggle(false)} href='/admin'>Admin Dashboard</Link> )
          }
        </ul>
      </div>

    </nav>
  )
}

export default Navbar