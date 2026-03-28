import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentorship | Wisdommix Institute',
  description: 'Receive personalized 1-on-1 guidance from seasoned leaders to accelerate your transformation.',
}

export default function MentorshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
