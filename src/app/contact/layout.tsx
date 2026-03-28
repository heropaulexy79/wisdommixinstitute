import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Wisdommix Institute',
  description: 'Reach out to us for more information on our leadership development and mentorship programs.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
