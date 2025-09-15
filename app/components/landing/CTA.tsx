import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start <br />
            <span className="text-accent">Predicting?</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of skilled predictors already earning on Chaubet.
            Your research and analysis can turn into real rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href={"/app"}>

              <Button variant="default" size="lg" className="text-lg px-8 py-6 group cursor-pointer">
                Launch App
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button></Link>
            <Link href={"https://marvelous-thorium-112.notion.site/Chaubet-1bdc5b64461280cfb6efe749d16bf833"} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 cursor-pointer">
                View Documentation
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>
              🔒 Secure • ⚡ Fast • 🎯 Skill-Based • 🇮🇳 Indian Markets
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
    </section>
  );
};

export default CTA;