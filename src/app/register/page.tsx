import { Metadata } from "next";
import Form from "./_components/Form";

export const metadata: Metadata = {
	title: "Register",
};

export default function Page() {
	return (
		<Form/>
	);
}