import { Button } from "../components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="tabular text-sm font-semibold text-muted">404</p>
      <h1 className="mt-1 text-[1.75rem] font-extrabold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-[15px] text-muted">Tautannya mungkin salah ketik atau halamannya sudah dihapus.</p>
      <Button to="/" className="mt-6">
        Kembali ke beranda
      </Button>
    </div>
  );
}
