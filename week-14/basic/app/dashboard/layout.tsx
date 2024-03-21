import { ReactNode } from "react";

export default function Layout({
  children,
  team,
  analytics,
}: {
  children: ReactNode;
  analytics: ReactNode;
  team: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center ">
      {children}
      <div className="flex justify-between mx-auto container">
        {team}
        {analytics}
      </div>
    </div>
  );
}
