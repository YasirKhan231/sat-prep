import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="container max-w-6xl mx-auto px-8">
      {/* Hero Section */}
      <section className="hero text-center py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
          Revolutionize Your SAT Prep
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-[var(--text-secondary)] mb-10">
          Unlock your potential with AI-powered learning. Personalized
          strategies, intelligent insights, and adaptive study plans tailored
          just for you.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/study-plan-onboard" className="btn btn-primary">
            <i className="fas fa-rocket mr-2"></i>
            Get Started
          </a>
          <a href="#features" className="btn btn-secondary">
            <i className="fas fa-info-circle mr-2"></i>
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="chart-line"
            title="AI Study Plan"
            description="Dynamically generated roadmap that adapts to your unique learning style and performance."
          />
          <FeatureCard
            icon="robot"
            title="Smart Tutoring"
            description="24/7 AI-powered tutor providing instant, contextual explanations and personalized support."
          />
          <FeatureCard
            icon="analytics"
            title="Performance Analytics"
            description="Comprehensive insights and predictive analytics to track and boost your SAT preparation progress."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="my-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Flexible Pricing Plans
        </h2>
        <p className="text-lg text-center text-[var(--text-secondary)] mb-12">
          Choose the perfect plan for your SAT preparation journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="$9.99/month"
            features={[
              "Basic Study Materials",
              "Limited Practice Tests",
              "Standard AI Tutor",
            ]}
            ctaText="Get Started"
          />
          <PricingCard
            title="Pro"
            price="$19.99/month"
            features={[
              "Comprehensive Study Materials",
              "Unlimited Practice Tests",
              "Advanced AI Tutor",
              "Performance Analytics",
            ]}
            ctaText="Get Started"
          />
          <PricingCard
            title="Enterprise"
            price="$49.99/month"
            features={[
              "All Pro Features",
              "Personal Mentor",
              "Priority Support",
              "Custom Learning Path",
            ]}
            ctaText="Contact Sales"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="my-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          What Our Students Say
        </h2>
        <p className="text-lg text-center text-[var(--text-secondary)] mb-12">
          Real stories from students who transformed their SAT scores
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            initials="JS"
            name="John Smith"
            role="High School Senior"
            quote="StudyPro's AI tutor helped me improve my SAT score by 200 points. The personalized study plan was a game-changer!"
          />
          <TestimonialCard
            initials="EM"
            name="Emma Martinez"
            role="College Prep Student"
            quote="I was struggling with math, but the adaptive learning technology made complex problems feel manageable."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
