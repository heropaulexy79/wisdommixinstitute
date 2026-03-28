import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events | Wisdommix Institute',
  description: 'Join our upcoming life-transforming sessions, seminars, and training programs.',
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
