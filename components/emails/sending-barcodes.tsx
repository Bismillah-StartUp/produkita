import Image from "next/image"

interface SendingBarcodesEmailProps {
	productName: string
	companyName: string
	licenseCode: string
	licensePageUrl: string
}

export default function SendingBarcodesEmail({
	productName,
	companyName,
	licenseCode,
	licensePageUrl,
}: SendingBarcodesEmailProps) {
	return (
		<div style={{ backgroundColor: '#f3f4f6', padding: '24px 0' }}>
			<div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', fontFamily: 'Arial, sans-serif' }}>
				<div style={{ padding: '32px', backgroundColor: '#0f172a', color: '#ffffff' }}>
					<p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>
						Barcode & QR Code
					</p>
					<h1 style={{ margin: '8px 0 0', fontSize: '28px', lineHeight: 1.2 }}>
						{productName}
					</h1>
					<p style={{ margin: '12px 0 0', fontSize: '14px', lineHeight: 1.6, opacity: 0.9 }}>
						Barcode dan QR code lisensi untuk {companyName} sudah tersedia.
					</p>
				</div>

				<div style={{ padding: '32px' }}>
					<p style={{ margin: '0 0 20px', fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
						Gunakan kode lisensi berikut untuk membuka halaman verifikasi produk.
					</p>

					<div style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
						<div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
							License Code
						</div>
						<div style={{ marginTop: '8px', fontSize: '24px', fontWeight: 700, letterSpacing: '0.12em', color: '#0f172a' }}>
							{licenseCode}
						</div>
						<div style={{ marginTop: '8px', fontSize: '13px', color: '#475569' }}>
							Buka halaman lisensi di {licensePageUrl}
						</div>
					</div>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
						<div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
							<div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
								Barcode
							</div>
							<Image src="cid:barcode-image" alt={`Barcode ${licenseCode}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
						</div>

						<div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
							<div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
								QR Code
							</div>
							<Image src="cid:qr-code-image" alt={`QR Code ${licenseCode}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
						</div>
					</div>

					<div style={{ marginTop: '24px' }}>
						<a
							href={licensePageUrl}
							style={{ display: 'inline-block', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700 }}
						>
							Buka Halaman Lisensi
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
