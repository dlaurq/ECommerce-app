import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-[80vh] flex justify-center items-center bg-gray-200">
      <SignIn />
    </section>
  );
}
