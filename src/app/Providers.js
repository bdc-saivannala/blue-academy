// app/Providers.js
"use client"; // This directive makes this a Client Component

import { useEffect } from "react";

export default function Providers({ children }) {
  // Your client-side logic goes here (e.g., hooks, context)
  useEffect(() => {
    console.log("Client side code running");
  }, []);

  return <>{children}</>;
}
