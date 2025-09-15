import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text leading-tight">
            Predict. Analyze. <br />
            <span className="text-accent">Earn.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join India&apos;s most sophisticated prediction market. Built on Solana with LMSR technology,
            where research and analysis drive rewards, not luck.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={"/app"}>
              <Button variant="default" size="lg" className="text-lg px-8 py-6 cursor-pointer">
                Start Predicting
              </Button>
            </Link>
            <Link href={"https://marvelous-thorium-112.notion.site/Chaubet-1bdc5b64461280cfb6efe749d16bf833"} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 cursor-pointer">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">₹10L+</div>
              <div className="text-muted-foreground">Total Volume Traded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5000+</div>
              <div className="text-muted-foreground">Active Predictors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-pulse" />
    </section>
  );
};

export default Hero;