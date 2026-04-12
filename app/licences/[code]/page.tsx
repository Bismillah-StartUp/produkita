import { LicenceLayout } from '@/components/pages/licences'

type LicencePageProps = {
  params: Promise<{
    code: string
  }>
}

const LicencePage = async ({ params }: LicencePageProps) => {
  const { code } = await params

  return <LicenceLayout code={code} />
}

export default LicencePage