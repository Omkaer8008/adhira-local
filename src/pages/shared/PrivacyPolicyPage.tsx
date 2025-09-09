import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Privacy policy content coming soon...</p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;