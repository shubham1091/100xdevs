import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "signup page",
};
export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="border-b text-center">20% off for the next 3 days</div>
      {children}
    </div>
  );
}
