"use client";

export default function CheckoutButton({ userId }: { userId: string }) {
  const handleSubmit = async (userId: string) => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const { session } = await res.json();
    console.log(session);
    window.location.assign(session.url);
  };

  return (
    <button
      className="bg-black text-amber-500 text-xl font-medium p-5 w-fit hover:opacity-80"
      onClick={() => handleSubmit(userId)}
    >
      Checkout
    </button>
  );
}
