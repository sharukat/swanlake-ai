import { Separator } from '@/components/ui/separator'

type Props = {
  header: string
}

export function SubHeader({ header }: Props) {
  return (
    <header className="sticky flex shrink-0 top-5 z-0 items-center gap-2 px-6 lg:gap-2 lg:px-8 justify-center mb-5">
        <h1 className="bg-gradient-to-b from-neutral-400 to-neutral-900 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl mb-5">{header}</h1>
    </header>
  )
}