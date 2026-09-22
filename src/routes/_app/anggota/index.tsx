import { createFileRoute } from "@tanstack/react-router";
import { PeopleView } from "@/components/people-view";

export const Route = createFileRoute("/_app/anggota/")({
  component: () => <PeopleView locale="id" />,
  head: () => ({
    meta: [{ title: "Anggota · KK KMI FTSL ITB" }],
  }),
});
