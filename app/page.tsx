import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Sign in</p>

      <Link href="/signup">Signup</Link>
    </div>
  );
}
