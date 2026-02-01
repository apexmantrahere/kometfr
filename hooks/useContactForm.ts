"use client";

import { useState, useCallback } from "react";
import { submitContactAction } from "@/app/actions/contact";

const initialFormData = {
  name: "",
  contact: "",
  email: "",
  message: "",
};

export type ContactStatus = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function useContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<ContactStatus>({ type: "idle" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus({ type: "loading" });
      const result = await submitContactAction(formData);
      if (result.ok) {
        setFormData(initialFormData);
        setStatus({ type: "idle" });
        setShowSuccessModal(true);
      } else {
        setStatus({ type: "error", message: result.error });
      }
    },
    [formData]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    status,
    showSuccessModal,
    setShowSuccessModal,
  };
}
