import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Reports</h1>
        <p className="text-muted-foreground">Reports and analytics coming soon...</p>
      </div>
      <Footer />
    </div>
  );
};

export default ReportsPage;