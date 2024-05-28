import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
// import CTA from '../components/CTA';
// import Logo from '../components/Logo';
// import HomeFeatures from '../components/HomeFeatures';
// import HeroSection from '../components/HeroSection';
// import FAQ from '../components/FAQ';
// import FeaturedProjects from '../components/FeaturedProjects';
// import CarbonFootprintCalculator from '../components/CarbonFootprintCalculator';

// const features = [
//   { name: 'Transparent Transactions' },
//   { name: 'Global Impact' },
//   { name: 'Community Driven' },
// ];

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      {/* <CTA />
      <Logo />
      <HomeFeatures />
      <HeroSection
        title={'You need seamless carbon offsetting with impact'}
        subtitle={
          "Whether you're seeking to enhance project control with real-time awareness, explore seamless carbon credit transactions, or contribute to impactful projects in agroforestry, biochar, and clean energy, Dorewa is your go-to solution for simplifying carbon offsetting and making a positive impact on the environment. "
        }
        background={'#f3f8f5'}
        features={features}
      />
      <FeaturedProjects /> */}
      {/* <CarbonFootprintCalculator /> */}
      {/* <FAQ /> */}
      <Footer />
    </div>
  );
};

export default Homepage;
