import { dbConnect } from "@/app/lib/dbConnect";
import { NextRequest } from "next/server";
import UserModel from "@/app/models/User.model";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
	const { name, email, password } = await request.json();

	await dbConnect();
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new UserModel({
		name,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();

		return Response.json(
			{
				message: "User has been created."
			},
			{
				status: 201,
			}
		);
	} catch (error: any) {
		return Response.json(
			{ message: error.message },
			{ status: 500 }
		);
	}
}