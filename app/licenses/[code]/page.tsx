import { LicenceLayout } from '@/components/pages/licences'
import { getCertificateDetailsByCode } from '@/lib/certificate'

type LicencePageProps = {
  params: Promise<{
    code: string
  }>
}

const LicencePage = async ({ params }: LicencePageProps) => {
  const { code } = await params
  const data = await getCertificateDetailsByCode(code)

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produk Tidak Ditemukan</h1>
          <p className="mt-2 text-gray-600">Kode sertifikat tidak valid atau belum terdaftar</p>
        </div>
      </div>
    )
  }

  return (
    <LicenceLayout code={code} data={data} />
  )
}

export default LicencePage