import _, { multiply } from "lodash";

declare module "lodash"{
	interface lodasher{
		multiply(a : number, b : number) : number;
	}
}
	