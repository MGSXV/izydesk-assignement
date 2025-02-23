"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
const categories: { title: string; href: string; description: string }[] = [
	{
		title: "Electronics",
		href: "/categories/electronics",
		description: "Latest gadgets and devices including smartphones, laptops, and more.",
	},
	{
		title: "Fashion",
		href: "/categories/fashion",
		description: "Trendy clothing and accessories for men, women, and children.",
	},
	{
		title: "Home & Kitchen",
		href: "/categories/home-kitchen",
		description: "Essentials and decor for your home and kitchen.",
	},
	{
		title: "Beauty & Personal Care",
		href: "/categories/beauty-personal-care",
		description: "Skincare, haircare, and other personal care products.",
	},
	{
		title: "Sports & Outdoors",
		href: "/categories/sports-outdoors",
		description: "Gear and equipment for sports and outdoor activities.",
	},
	{
		title: "Toys & Games",
		href: "/categories/toys-games",
		description: "Fun and educational toys and games for kids of all ages.",
	},
];

export default function Navigation() {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Categories</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{categories.map((category) => (
								<ListItem
									key={category.title}
									title={category.title}
									href="/"
								>
									{category.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
						Some other page
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
