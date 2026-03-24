"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContactState {
  isOpen: boolean;
  course: string;
  city: string;
  date: string;
}

interface ContactContextType {
  state: ContactState;
  openContact: (course?: string, city?: string, date?: string) => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContactState>({
    isOpen: false,
    course: "",
    city: "",
    date: "",
  });

  const openContact = (course = "", city = "", date = "") =>
    setState({ isOpen: true, course, city, date });

  const closeContact = () =>
    setState((s) => ({ ...s, isOpen: false }));

  return (
    <ContactContext.Provider value={{ state, openContact, closeContact }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside ContactProvider");
  return ctx;
}
