import { useState } from "react";
import { Badge, Banner, Button, ChoiceGroup, Field, PageHeader, QtyStepper, SectionTitle, Sheet, Toggle } from "../components/ui";
import { useToast } from "../store/AppProviders";

const VARIANTS = ["primary", "secondary", "soft", "ghost", "danger", "danger-soft", "danger-ghost"];
const SWATCHES = ["canvas", "surface", "sunken", "line", "primary", "primary-soft", "accent", "accent-soft", "alert", "caution", "success"];

function Block({ id, title, children }) {
  return (
    <section aria-labelledby={id}>
      <SectionTitle id={id}>{title}</SectionTitle>
      <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default function Components() {
  const toast = useToast();
  const [choice, setChoice] = useState("sedang");
  const [on, setOn] = useState(true);
  const [qty, setQty] = useState(1);
  const [sheet, setSheet] = useState(false);

  return (
    <div>
      <PageHeader title="Komponen" lead="Semua komponen dasar Delvos dari skill minimalist. Pakai ulang sebelum membuat yang baru." />
      <div className="space-y-10">
        <Block id="warna" title="Token warna">
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {SWATCHES.map((s) => (
              <li key={s}>
                <span className="block h-12 rounded-2xl ring-1 ring-line" style={{ background: `var(--dv-${s})` }} />
                <span className="mt-1.5 block truncate text-[13px] font-semibold text-muted">{s}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="tombol" title="Tombol">
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm">Kecil</Button>
            <Button>Sedang</Button>
            <Button size="lg">Besar</Button>
            <Button disabled>Nonaktif</Button>
          </div>
        </Block>

        <Block id="form" title="Form">
          <div className="space-y-7">
            <Field label="Nama" placeholder="Tulis nama" hint="Dipakai di halaman akun." />
            <Field label="Email" defaultValue="contoh@" error="Format email belum lengkap. Contoh: nama@domain.com" />
            <ChoiceGroup label="Prioritas" options={[{ id: "rendah", label: "Rendah" }, { id: "sedang", label: "Sedang" }, { id: "tinggi", label: "Tinggi" }]} value={choice} onChange={setChoice} />
            <Toggle label="Pengingat harian" description="Kirim ringkasan proyek setiap pagi." checked={on} onChange={setOn} />
            <QtyStepper value={qty} onChange={(v) => setQty(Math.max(0, v))} label="contoh" />
          </div>
        </Block>

        <Block id="status" title="Status">
          <div className="flex flex-wrap gap-2">
            <Badge>Netral</Badge>
            <Badge tone="primary">Berjalan</Badge>
            <Badge tone="success">Selesai</Badge>
            <Badge tone="caution">Prioritas tinggi</Badge>
            <Badge tone="alert">Terlambat</Badge>
          </div>
          <div className="mt-5 space-y-3">
            <Banner title="Info">Penjelasan netral tanpa tekanan.</Banner>
            <Banner tone="success" title="Tersimpan">Perubahan Anda sudah disimpan.</Banner>
            <Banner tone="caution" title="Perlu dicek">Dua proyek belum diperbarui minggu ini.</Banner>
            <Banner tone="alert" title="Gagal menyimpan">Koneksi terputus. Periksa internet Anda, lalu coba lagi.</Banner>
          </div>
        </Block>

        <Block id="melayang" title="Dialog dan toast">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setSheet(true)}>
              Buka sheet
            </Button>
            <Button variant="secondary" onClick={() => toast("Ini contoh toast")}>
              Tampilkan toast
            </Button>
          </div>
        </Block>
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Contoh sheet" footer={<Button block onClick={() => setSheet(false)}>Mengerti</Button>}>
        <p className="text-[15px] text-ink-soft">Muncul dari bawah di mobile dan di tengah di desktop. Tekan Escape untuk menutup.</p>
      </Sheet>
    </div>
  );
}
