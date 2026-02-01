"use server";

import { submitContact } from "@/lib/api";

export type ContactFormData = {
  name: string;
  contact: string;
  email: string;
  message: string;
};

export async function submitContactAction(formData: ContactFormData): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.contact,
      message: formData.message,
    });
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Submission failed";
    return { ok: false, error: message };
  }
}
