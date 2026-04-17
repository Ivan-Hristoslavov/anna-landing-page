"use client";

import { useEffect, useState } from "react";

/**
 * Референтна „днес“ за сравнение на графика — само след mount на клиента,
 * за да няма несъответствие при статичен пре-рендер.
 */
export function useClientScheduleReferenceDate(): Date | null {
  const [d, setD] = useState<Date | null>(null);
  useEffect(() => {
    setD(new Date());
  }, []);
  return d;
}
