import { Link } from "../lib/router";
import { Button, SectionTitle } from "../components/ui";
import { ProjectRow } from "../components/ProjectRow";
import { greeting } from "../lib/format";
import { useProjects } from "../store/AppProviders";

const PRINCIPLES = [
  { title: "Satu fokus per hari", detail: "Pilih satu proyek prioritas tinggi dan selesaikan langkah berikutnya." },
  { title: "Catat keputusan", detail: "Tulis alasan singkat di catatan proyek agar tim tidak menebak." },
  { title: "Tutup yang selesai", detail: "Tandai proyek selesai supaya daftar tetap pendek." },
];

function Hero() {
  return (
    <section aria-labelledby="hero-judul" className="motif-stick motif-wing rounded-[2.25rem] p-2.5 shadow-[0_18px_40px_-24px_rgba(120,86,20,0.5)] sm:rounded-[3rem] sm:p-3">
      <div className="motif-pad mx-5 rounded-[1.4rem] px-5 py-7 sm:mx-14 sm:rounded-[2rem] sm:px-10 sm:py-11">
        <h1 id="hero-judul" className="max-w-md text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem]">
          Apa yang mau Anda kerjakan?
        </h1>
        <p className="mt-3 max-w-md text-[16px] text-ink-soft sm:text-[17px]">
          Buat proyek dalam tiga langkah singkat, lalu pantau kemajuannya dari satu tempat.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button to="/mulai" size="lg">
            Buat proyek
          </Button>
          <span className="text-sm text-ink-soft">Tanpa akun, kurang dari 1 menit</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { projects } = useProjects();
  const active = projects.filter((p) => p.status === "aktif");

  return (
    <div>
      <p className="mb-4 text-[15px] font-semibold text-muted">{greeting()}</p>
      <Hero />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <section aria-labelledby="berjalan">
          <SectionTitle
            id="berjalan"
            action={
              active.length > 0 && (
                <Link to="/proyek" className="text-sm font-semibold text-primary">
                  Lihat semua
                </Link>
              )
            }
          >
            Sedang berjalan
          </SectionTitle>
          {active.length ? (
            <div className="divide-y divide-line rounded-[1.5rem] border border-line bg-surface px-4">
              {active.slice(0, 3).map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-line px-5 py-6">
              <p className="text-[15px] text-ink-soft">
                Belum ada proyek berjalan. Buat proyek pertama Anda, atau buka halaman Proyek untuk mencoba data contoh.
              </p>
            </div>
          )}
        </section>

        <aside aria-labelledby="cara-kerja" className="self-start rounded-[1.75rem] bg-surface p-5 ring-1 ring-line sm:p-6">
          <h2 id="cara-kerja" className="text-lg font-extrabold">
            Cara kerja yang tenang
          </h2>
          <p className="mt-1 text-sm text-muted">Tiga kebiasaan kecil agar daftar tetap rapi.</p>
          <ul className="mt-4 space-y-4">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-[15px] font-bold">{p.title}</span>
                  <span className="block text-sm text-muted">{p.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
