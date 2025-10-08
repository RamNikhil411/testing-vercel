import Home from "@/components/home";
import { createFileRoute, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/")({
  component: Home,
});
