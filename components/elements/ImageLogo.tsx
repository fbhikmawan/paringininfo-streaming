import Image from 'next/image'
import Link from 'next/link'

import imgLogo from '../../assets/img/logo/logo.png'

export default function ImageLogo() {
  return (
    <Link href="/">
      <Image src={imgLogo} alt="Logo"/>
    </Link>
  )
}