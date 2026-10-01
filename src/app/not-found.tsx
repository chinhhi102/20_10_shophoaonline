import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-wine px-6 text-center text-pearl-bright">
      <p className="font-script text-5xl">Ơ…</p>
      <h1 className="mt-4 font-display text-2xl">Trang này không tồn tại hoặc chưa được gửi đi.</h1>
      <p className="mt-3 max-w-sm text-sm text-petal-soft/80">
        Kiểm tra lại đường link trên thiệp, hoặc nhắn cho người đã tặng bạn nhé.
      </p>
      <Link href="/" className="mt-8 text-sm underline underline-offset-4">
        Về trang chủ
      </Link>
    </main>
  );
}
