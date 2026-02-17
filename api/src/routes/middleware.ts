import type { Context } from "hono";
import z from "zod";

export function parseZodError(
	error: { success: boolean; error?: any },
	c: Context,
) {
	if (!error.success) {
		const formattedErrors: Record<string, string> = {};
		// @ts-ignore
		const errorTree = z.treeifyError(error.error).properties;
		for (let key in errorTree) {
			formattedErrors[key] = errorTree[key].errors[0];
		}
		return c.json(
			{
				error: formattedErrors,
				type: "validation",
			},
			400,
		);
	}
}
