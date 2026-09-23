import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

type RouteContext = {
	params: Promise<{
		id: string;
	}>;
};

export async function GET(
	request: Request,
	context: RouteContext
) {
	try {
		await connectDB();

		const { id } = await context.params;
		const category = await Category.findOne(
			Types.ObjectId.isValid(id)
				? { _id: id, isActive: true }
				: { slug: id.toLowerCase(), isActive: true }
		).lean();

		if (!category) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			category,
		});
	} catch (error) {
		console.error("GET category error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Unable to fetch category.",
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: Request,
	context: RouteContext
) {
	try {
		await connectDB();

		const { id } = await context.params;

		if (!Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid category ID.",
				},
				{ status: 400 }
			);
		}

		const body = await request.json();

		if (body.slug) {
			body.slug = body.slug.trim().toLowerCase();

			const duplicate = await Category.findOne({
				slug: body.slug,
				_id: { $ne: id },
			});

			if (duplicate) {
				return NextResponse.json(
					{
						success: false,
						message: "A category with this slug already exists.",
					},
					{ status: 409 }
				);
			}
		}

		const category = await Category.findByIdAndUpdate(
			id,
			body,
			{
				new: true,
				runValidators: true,
			}
		).lean();

		if (!category) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			category,
		});
	} catch (error) {
		console.error("UPDATE category error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Unable to update category.",
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	context: RouteContext
) {
	try {
		await connectDB();

		const { id } = await context.params;

		if (!Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid category ID.",
				},
				{ status: 400 }
			);
		}

		const category = await Category.findByIdAndUpdate(
			id,
			{ isActive: false },
			{ new: true }
		);

		if (!category) {
			return NextResponse.json(
				{
					success: false,
					message: "Category not found.",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			message: "Category removed successfully.",
		});
	} catch (error) {
		console.error("DELETE category error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Unable to remove category.",
			},
			{ status: 500 }
		);
	}
}
