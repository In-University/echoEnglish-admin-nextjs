export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">Trang chủ EchoEnglish Admin</h1>
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline text-lg"
        >
          👉 Đăng nhập
        </a>
      </div>
    </div>
  );
}
