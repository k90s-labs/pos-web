import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductsHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[now.getDay()];

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = String(hours % 12 || 12).padStart(2, "0");

  const dateStr = `${month}/${day} (${dayName})`;
  const timeStr = `${displayHours}:${minutes} ${ampm}`;

  return (
    <header className="flex h-14 items-center justify-end border-b bg-white px-6">
      <div className="flex items-center gap-5">
        <div className="text-right text-sm text-neutral-800">
          <div>{dateStr}</div>
          <div>{timeStr}</div>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-100"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}