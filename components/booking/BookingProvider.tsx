"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import BookingDialog from "./BookingDialog";

type Ctx = { open: (condition?: string) => void };
const BookingContext = createContext<Ctx>({ open: () => {} });

export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({
  children,
  defaultCondition = "General Consultation",
}: {
  children: ReactNode;
  defaultCondition?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [condition, setCondition] = useState(defaultCondition);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(
    (c?: string) => {
      setCondition(c || defaultCondition);
      setFormKey((k) => k + 1);
      setIsOpen(true);
    },
    [defaultCondition]
  );

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <BookingDialog open={isOpen} onClose={() => setIsOpen(false)} condition={condition} formKey={formKey} />
    </BookingContext.Provider>
  );
}
