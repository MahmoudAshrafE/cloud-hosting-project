import { cookies } from 'next/headers'
import Link from 'next/link'
import styles from './header.module.css'
import Navbar from './Navbar'
import { verifyTokenBerPage } from '@/utils/verifyToken'
import HeaderContent from './HeaderContent'

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenBerPage(token)


  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin} />
      <div className={styles.right}>
        {
          payload ? (
            <HeaderContent payload={payload}/>
          ) : (
            <>
              <Link className={styles.btn} href='/login'>Login</Link>
              <Link className={styles.btn} href='/register'>Register</Link>
            </>)
        }
      </div>
    </header>
  )
}

export default Header