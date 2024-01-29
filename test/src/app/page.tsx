import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Link href="/base">Base</Link>
      <Link href="/scaled-background">Scaled background</Link>
      <Link href="/overlay">Overlay</Link>
      <Link href="/snap-points">Snap points</Link>
      <Link href="/non-dismissible">Non dismissible</Link>
      <Link href="/non-modal">Non modal</Link>
    </>
  )
}

export default Page
