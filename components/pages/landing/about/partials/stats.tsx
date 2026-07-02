export const Stats = () => {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-10 md:p-14 shadow-xl shadow-blue-900/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-500/50">
            <div className="text-center pt-8 md:pt-0">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                1.000+
              </h4>
              <p className="text-[13px] font-semibold text-blue-100 mb-1">
                UMKM Terdaftar
              </p>
              <p className="text-[11px] text-blue-200/80">
                Di seluruh Indonesia
              </p>
            </div>

            <div className="text-center pt-8 md:pt-0">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                50.000+
              </h4>
              <p className="text-[13px] font-semibold text-blue-100 mb-1">
                Produk Aktif
              </p>
              <p className="text-[11px] text-blue-200/80">
                Terdaftar & tersertifikasi
              </p>
            </div>

            <div className="text-center pt-8 md:pt-0">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                2 Juta+
              </h4>
              <p className="text-[13px] font-semibold text-blue-100 mb-1">
                QR Scan / Bulan
              </p>
              <p className="text-[11px] text-blue-200/80">
                Interaksi konsumen langsung
              </p>
            </div>

            <div className="text-center pt-8 md:pt-0">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                99.9%
              </h4>
              <p className="text-[13px] font-semibold text-blue-100 mb-1">
                Uptime Sistem
              </p>
              <p className="text-[11px] text-blue-200/80">
                Server aktif sepanjang waktu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
