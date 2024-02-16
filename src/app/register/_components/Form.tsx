"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
	name: string,
	email: string,
	password: string,
	confirmPassword: string,
}

const Form = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, disabled, isSubmitting }
	} = useForm<Inputs>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
	});
	const router = useRouter();
	const params = useSearchParams();
	let callbackUrl = params.get("callbackUrl") || "/";

	const formSubmit:SubmitHandler<Inputs> = async (form) => {
		const { name, email, password } = form;

		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (res.ok) {
				return router.push(`/signin?callbackUrl=${callbackUrl}&success=account has been created`);
			} else {
				const data = await res.json();
				throw new Error(data.message);
			}
		} catch (err: any) {
			const error = err.message && err.message.indexOf("E11000") === 0
							? "Email is duplicate"
							: err.message
			toast.error(error || "Error");
		}
	}

	return (
		<div className="mx-auto max-w-2xl lg:max-w-7xl">
			<div className="flex justify-between items-center">
				<h1 className="font-bold py-10 text-2xl">Next.js 14 MongoDB User Registration</h1>
			</div>
			<div className="max-w-sm mx-auto card bg-base-300 my-4">
				<div className="card-body">
					<h1 className="card-title">Register</h1>
					<form onSubmit={handleSubmit((formSubmit))}>
						<div className="my-2">
							<label className="label" htmlFor="name">Name</label>
							<input 
								type="text"
								id="name"
								{
									...register("name", {
										required: "Name is required."
									})
								}
								className="input input-bordered w-full max-w-sm"
							/>
							{
								errors.name?.message && (
									<div className="text-error">{errors.name.message}</div>
								)
							}
						</div>
						<div className="my-2">
							<label className="label" htmlFor="email">Email</label>
							<input 
								type="text" 
								id="email"
								{
									...register("email", {
										required: "Email is required.",
										pattern: {
											value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
											message: "Email is invalid."
										}
									})
								}
								className="input input-bordered w-full max-w-sm"
							/>
							{
								errors.email?.message && (
									<div className="text-error">{errors.email.message}</div>
								)
							}
						</div>
						<div className="my-2">
							<label className="label" htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								{
									...register("password", {
										required: "Password is required.",
									})
								}
								className="input input-bordered w-full max-w-sm"
							/>
							{
								errors.password?.message && (
									<div className="text-error">{errors.password.message}</div>
								)
							}
						</div>
						<div className="my-2">
							<label className="label" htmlFor="confirmPassword">Confirm password</label>
							<input
								type="password"
								id="confirmPassword"
								{
									...register("confirmPassword", {
										required: "Confirm password is required",
										validate: (value) => {
											const { password } = getValues();
											return password === value || "Password should match."
										}
									})
								}
								className="input input-bordered w-full max-w-sm"
							/>
							{
								errors.confirmPassword?.message && (
									<div className="text-error">{errors.confirmPassword.message}</div>
								)
							}
						</div>
						<div className="my-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="btn btn-primary w-full"
							>
								{
									isSubmitting && (
										<span className="loading loading-spinner"></span>
									)
								}
								Register
							</button>
						</div>
					</form>
					<div className="divider"></div>
					<div>
						Already have an account?{" "}
						<Link className="link" href="/signin">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Form;