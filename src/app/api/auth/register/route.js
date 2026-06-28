import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Register Error:", error);
    return Response.json({ message: "Registration failed. " + error.message }, { status: 500 });
  }
}
