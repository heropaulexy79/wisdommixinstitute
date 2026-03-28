import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Wisdommix Institute',
  description: 'Learn about our mission to raise transformed leaders for lasting impact through a proven transformation system.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
