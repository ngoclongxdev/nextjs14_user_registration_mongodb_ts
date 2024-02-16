import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI as string);
		console.log("Connect DB success.");
	} catch (err: any) {
		throw new Error(err);
	}
}