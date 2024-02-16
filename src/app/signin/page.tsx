import { Metadata } from "next";
import Form from "./_components/Form";

export const metadata: Metadata = {
	title: "Sign In",
};

export default function Page() {
	return (
		<Form/>
	);
}