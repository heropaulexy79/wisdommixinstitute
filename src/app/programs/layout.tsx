import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs | NexLeadership Community',
  description: 'Explore our comprehensive programs in leadership, discipleship, and mind transformation.',
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
