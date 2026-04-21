import { redirect } from 'next/navigation'

type LicenceAliasPageProps = {
  params: Promise<{
    code: string
  }>
}

export default async function LicenceAliasPage({ params }: LicenceAliasPageProps) {
  const { code } = await params
  redirect(`/licenses/${code}`)
}