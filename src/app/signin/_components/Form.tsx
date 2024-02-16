"use client";

import Link from "next/link";

const Form = () => {
	return (
		<div className="max-w-sm mx-auto card bg-base-300">
			<div className="card-body">
				<h1 className="card-title">Sign In</h1>
				<form>
					<div className="my-2">
						<label className="label" htmlFor="email">Email</label>
						<input type="text" id="email" className="input input-bordered w-full max-w-xs"/>
					</div>
					<div className="my-2">
						<label className="label" htmlFor="password">Password</label>
						<input type="text" id="password" className="input input-bordered w-full max-w-xs"/>
					</div>
					<div className="my-4">
						<button type="submit" className="btn btn-primary w-full">Submit</button>
					</div>
				</form>
				<div>
					<Link href="/register" className="link">Register</Link>
				</div>
			</div>
		</div>
	);
}

export default Form;