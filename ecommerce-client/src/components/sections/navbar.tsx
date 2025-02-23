import Navigation from "@/components/sections/navigation/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Navbar as NavbarComponent,
	NavbarLeft,
	NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logMax from "@/assets/logo-max.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
			<div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
			<div className="relative mx-auto max-w-container">
				<NavbarComponent>
					<NavbarLeft>
						<a href="/" className="flex items-center gap-2 text-xl font-bold max-w-sm">
							<img src={logMax} alt="IZYDESK Store" />
						</a>
						<Navigation />
					</NavbarLeft>
					<NavbarRight>

						<div className="hidden md:flex gap-2">
							<a rel="noreferrer noopener" href="https://github.com/MGSXV" target="_blank"
								className={`border ${buttonVariants({ variant: "secondary" })}`} >
								<GitHubLogoIcon className="mr-2 w-5 h-5" />
								Github
							</a>
							<ModeToggle />
						</div>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="shrink-0 md:hidden"
								>
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<nav className="grid gap-6 text-lg font-medium">
									<a
										href="/"
										className="flex items-center gap-2 text-xl font-bold"
									>
										<span>Launch UI</span>
									</a>
									<a
										href="/"
										className="text-muted-foreground hover:text-foreground"
									>
										Getting Started
									</a>
									<a
										href="/"
										className="text-muted-foreground hover:text-foreground"
									>
										Components
									</a>
									<a
										href="/"
										className="text-muted-foreground hover:text-foreground"
									>
										Documentation
									</a>
								</nav>
							</SheetContent>
						</Sheet>
					</NavbarRight>
				</NavbarComponent>
			</div>
		</header>
	);
}
