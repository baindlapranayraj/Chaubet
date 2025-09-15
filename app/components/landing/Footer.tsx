import { Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">Chau</span>
              <span className="text-accent">bet</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              India&apos;s premier decentralized prediction market built on Solana. 
              Where research meets rewards.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/pranayraj069" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/baindlapranayraj/chaubet" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/pranayraj069" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/app" className="hover:text-foreground transition-colors">Markets</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="https://marvelous-thorium-112.notion.site/Chaubet-1bdc5b64461280cfb6efe749d16bf833" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="https://marvelous-thorium-112.notion.site/Chaubet-1bdc5b64461280cfb6efe749d16bf833" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Chaubet. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Built on Solana • Powered by LMSR • Resolved by Grok AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;