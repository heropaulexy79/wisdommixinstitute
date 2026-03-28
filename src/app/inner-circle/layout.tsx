import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inner Circle | Wisdommix Institute',
  description: 'Join our exclusive community of high-achievers committed to excellence and growth.',
}

export default function InnerCircleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
