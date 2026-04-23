import Link from 'next/link';
import css from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Eugene Mukhin</p>
                    <p>
                        Contact us:
                        <Link href="mailto:eug.muhin@gmail.com"> Notehub.app</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;


