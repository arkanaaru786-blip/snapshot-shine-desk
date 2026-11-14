import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordPage } from "@/components/admin/ResetPasswordPage";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password | Motor Wallah" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});
