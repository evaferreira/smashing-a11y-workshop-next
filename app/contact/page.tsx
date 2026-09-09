import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Smashing Workshop",
  description: "Example contact page",
};

const FIELDS = [
  { id: "name", label: "Name", type: "text", autoComplete: "name" },
  { id: "email", label: "Email address", type: "email", autoComplete: "email" },
] as const;

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-8">
      <Link href="/">Back to home</Link>

      <h1 className="text-3xl font-semibold">Contact us</h1>
      <p>Questions? Send a message and we'll reply soon.</p>

      <form className="flex flex-col gap-4">
        {FIELDS.map(({ id, label, type, autoComplete }) => (
          <div key={id} className="flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} type={type} autoComplete={autoComplete} className="border p-2" />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} className="border p-2" />
        </div>

        <button type="submit" className="self-start border px-4 py-2">
          Send message
        </button>
      </form>
    </main>
  );
}
