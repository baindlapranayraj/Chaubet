import { Search, TrendingUp, Award, Wallet } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Research & Analyze",
      description: "Browse active Indian markets and conduct thorough research. Use data, trends, and your expertise to identify opportunities.",
      step: "01"
    },
    {
      icon: TrendingUp,
      title: "Place Your Prediction",
      description: "Buy shares representing your prediction. Our LMSR system ensures fair pricing and optimal market liquidity.",
      step: "02"
    },
    {
      icon: Award,
      title: "AI Resolution",
      description: "Grok AI accurately resolves markets based on real-world outcomes, ensuring fair and unbiased results.",
      step: "03"
    },
    {
      icon: Wallet,
      title: "Collect Rewards",
      description: "Earn SOL for each winning share you hold. Withdraw your rewards directly to your Solana wallet.",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-accent">Chaubet</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to start earning from your predictions. 
            No complex mechanics, just pure skill-based trading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                
                <div className="mt-8 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;