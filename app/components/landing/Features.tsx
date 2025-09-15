import { TrendingUp, Zap, Brain, Shield, Coins, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Research-Driven",
      description: "Success comes from deep analysis and thorough research, not luck. Every prediction is an opportunity to showcase your expertise."
    },
    {
      icon: Zap,
      title: "Built on Solana",
      description: "Lightning-fast transactions with minimal fees. Experience seamless trading on one of the most efficient blockchains."
    },
    {
      icon: TrendingUp,
      title: "LMSR Technology",
      description: "Logarithmic Market Scoring Rule ensures fair pricing and optimal liquidity for all market participants."
    },
    {
      icon: Shield,
      title: "Grok AI Resolution",
      description: "Advanced AI ensures accurate and unbiased resolution of prediction markets, maintaining platform integrity."
    },
    {
      icon: Coins,
      title: "Transparent Rewards",
      description: "Earn SOL based on your winning shares. Clear, transparent reward system with no hidden fees or complex calculations."
    },
    {
      icon: Users,
      title: "Indian Markets Focus",
      description: "Specialized prediction markets tailored for Indian events, politics, business, and cultural moments you understand best."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-accent">Chaubet</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced technology meets sophisticated prediction markets. 
            Built for serious predictors who value skill over chance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-card p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;