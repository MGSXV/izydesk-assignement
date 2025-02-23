import { ModeToggle } from "@/components/ui/mode-toggle";
import {
	Footer,
	FooterColumn,
	FooterBottom,
	FooterContent,
} from "@/components/ui/footer";
import logoMax from "@/assets/logo-max.svg";

export default function FooterSection() {
	return (
		<footer className="w-full bg-background px-4">
			<div className="mx-auto max-w-container">
				<Footer>
					<FooterContent>
						<FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
							<div className="flex items-center gap-2">
								<a href="/">
									<img src={logoMax} alt="IZYDESK Store" />
								</a>
							</div>
						</FooterColumn>
						<FooterColumn>
							<h3 className="text-md pt-1 font-semibold">Product</h3>
							<a href="/" className="text-sm text-muted-foreground">
								Home
							</a>
							<a href="#" className="text-sm text-muted-foreground">
								Another page
							</a>
						</FooterColumn>
						<FooterColumn>
							<h3 className="text-md pt-1 font-semibold">Company</h3>
							<a href="#" className="text-sm text-muted-foreground">
								About
							</a>
							<a href="#" className="text-sm text-muted-foreground">
								Careers
							</a>
							<a href="#" className="text-sm text-muted-foreground">
								Blog
							</a>
						</FooterColumn>
						<FooterColumn>
							<h3 className="text-md pt-1 font-semibold">Contact</h3>
							<a href="https://x.com/05soufiane"
								className="text-sm text-muted-foreground">
								X/Twitter
							</a>
							<a href="https://www.linkedin.com/in/elkhamlichi/"
								className="text-sm text-muted-foreground">
								LinkedIn
							</a>
							<a href="https://github.com/MGSXV/"
								className="text-sm text-muted-foreground">
								Github
							</a>
						</FooterColumn>
					</FooterContent>
					<FooterBottom>
						<div>© 2025 Soufiane Elkhamlichi | IZYDESK</div>
						<div className="flex items-center gap-4">
							<a href="#">Privacy Policy</a>
							<a href="#">Terms of Service</a>
							<ModeToggle />
						</div>
					</FooterBottom>
				</Footer>
			</div>
		</footer>
	);
}
