"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Check,
  X,
  Menu,
  MoreHorizontal,
  Home,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

//
// --- Shared Components (for this single file) ---
//
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-soft">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-xl">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="font-bold text-2xl">Adhira</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/admin/dashboard">
                            <Button variant="ghost">Admin Dashboard</Button>
                        </Link>
                    </div>
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border py-4">
                        <Link to="/admin/dashboard" className="block py-2 text-muted-foreground hover:text-primary">
                            Admin Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const Footer = () => (
  <footer className="w-full bg-card border-t border-border mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:flex md:items-center md:justify-between">
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-base text-muted-foreground">
          &copy; 2024 Adhira Marketplace. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

//
// --- Admin Page Components ---
//

const AdminDashboardContent = () => {
  const salesData = [
    { name: "Jan", sales: 8000 }, { name: "Feb", sales: 7000 }, { name: "Mar", sales: 9000 },
    { name: "Apr", sales: 7500 }, { name: "May", sales: 6500 }, { name: "Jun", sales: 8200 },
    { name: "Jul", sales: 9500 },
  ];
  const topSellersData = [
    { name: "ArtisanCrafts", sales: 4000 }, { name: "NaturalSoaps Co", sales: 3500 },
    { name: "TechGuru Store", sales: 2500 }, { name: "LeatherWorks", sales: 2100 },
    { name: "Books 'n' More", sales: 1500 },
  ];
  const recentOrders = [
    { id: "A1001", customer: "Jane Doe", amount: "$250.00", status: "Delivered" },
    { id: "A1002", customer: "John Smith", amount: "$150.00", status: "Shipped" },
    { id: "A1003", customer: "Emily White", amount: "$300.00", status: "Pending" },
  ];
  const overviewData = [
    { title: "Total Revenue", value: "$125,431.22", change: "+15.1% from last month", icon: DollarSign },
    { title: "Total Orders", value: "+9876", change: "+22.5% from last month", icon: ShoppingCart },
    { title: "Active Sellers", value: "85", change: "+5% from last month", icon: Users },
    { title: "Total Products", value: "2,450", change: "+10% from last month", icon: Package },
  ];

  const DashboardCards = () => {
    const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  return (
    <div className="flex-1 space-y-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div className="col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader><CardTitle>Platform Revenue Over Time</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className="col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader><CardTitle>Top Sellers</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]}"><ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSellersData}>
                    <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card>
          <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
          <CardContent>
            <Table><TableHeader><TableRow>
                  <TableHead>Order ID</TableHead> <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead> <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader><TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}><TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Delivered" ? "default" : order.status === "Shipped" ? "outline" : "secondary"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const AdminBannersContent = () => {
  const mockBanners = [
    { id: "banner-1", title: "Summer Sale", imageUrl: "https://placehold.co/150x50/f0f9ff/0c4a6e?text=Summer+Sale", link: "/collections/summer-sale", status: "Active" },
    { id: "banner-2", title: "New Arrivals", imageUrl: "https://placehold.co/150x50/f0f9ff/0c4a6e?text=New+Arrivals", link: "/products/new", status: "Active" },
    { id: "banner-3", title: "Seasonal Promo", imageUrl: "https://placehold.co/150x50/f0f9ff/0c4a6e?text=Seasonal+Promo", link: "/promotions/seasonal", status: "Inactive" },
  ];
  const [banners, setBanners] = useState(mockBanners);
  const [newBanner, setNewBanner] = useState({ title: "", imageUrl: "", link: "", status: "Active" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBanner = (e) => {
    e.preventDefault();
    const newId = `banner-${Date.now()}`;
    setBanners([...banners, { id: newId, ...newBanner }]);
    setNewBanner({ title: "", imageUrl: "", link: "", status: "Active" });
    setIsDialogOpen(false);
  };
  const handleDeleteBanner = (bannerId) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter(banner => banner.id !== bannerId));
    }
  };
  return (
    <div className="space-y-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Banner Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}><DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Banner</Button>
          </DialogTrigger><DialogContent><DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>Create a new banner to display on the marketplace homepage.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBanner} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" value={newBanner.title} onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })} className="col-span-3" required />
              </div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                <Input id="imageUrl" value={newBanner.imageUrl} onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })} className="col-span-3" required />
              </div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="link" className="text-right">Link</Label>
                <Input id="link" value={newBanner.link} onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })} className="col-span-3" required />
              </div><Button type="submit" className="mt-4">Save Banner</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div><Card><CardHeader><CardTitle>Banners</CardTitle></CardHeader><CardContent><Table>
            <TableHeader><TableRow>
                <TableHead>Image</TableHead><TableHead>Title</TableHead>
                <TableHead>Link</TableHead><TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader><TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell><img src={banner.imageUrl} alt={banner.title} className="h-10 w-auto rounded-md" /></TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>{banner.link}</TableCell>
                  <TableCell>
                    <Badge variant={banner.status === "Active" ? "default" : "secondary"}>
                      {banner.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteBanner(banner.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
    </div>
  );
};

const AdminOrdersContent = () => {
  const mockOrders = [
    { id: "#3210", customer: "Liam Johnson", date: "2023-10-18", amount: "$250.00", status: "Delivered" },
    { id: "#3209", customer: "Olivia Smith", date: "2023-10-17", amount: "$150.00", status: "Shipped" },
    { id: "#3208", customer: "Noah Williams", date: "2023-10-16", amount: "$300.00", status: "Pending" },
  ];
  const [orders, setOrders] = useState(mockOrders);
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };
  return (
    <div className="space-y-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
      <Card><CardHeader><CardTitle>All Orders</CardTitle></CardHeader><CardContent>
          <div className="flex justify-between items-center mb-4"><div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search orders..." className="pl-9" />
            </div><Button variant="outline" className="ml-4"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </div><Table><TableHeader><TableRow>
                <TableHead>Order ID</TableHead><TableHead>Customer</TableHead>
                <TableHead>Date</TableHead><TableHead>Amount</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader><TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">{order.status}</Button>
                      </DropdownMenuTrigger><DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Pending")}>Pending</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>Shipped</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Delivered")}>Delivered</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right"><Button variant="outline" size="sm">Details</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
    </div>
  );
};

const AdminSellersContent = () => {
  const mockSellers = [
    { id: "S101", name: "ArtisanCrafts", email: "artisan.crafts@example.com", products: 45, status: "Active" },
    { id: "S102", name: "NaturalSoaps Co", email: "natural.soaps@example.com", products: 32, status: "Active" },
    { id: "S103", name: "LeatherWorks", email: "leather.works@example.com", products: 28, status: "Active" },
    { id: "S104", name: "TechGuru Store", email: "tech.guru@example.com", products: 67, status: "Inactive" },
    { id: "S105", name: "Books 'n' More", email: "books.more@example.com", products: 15, status: "Active" },
  ];
  const [sellers, setSellers] = useState(mockSellers);
  const handleUpdateStatus = (sellerId, newStatus) => {
    setSellers(sellers.map(seller => seller.id === sellerId ? { ...seller, status: newStatus } : seller));
  };
  return (
    <div className="space-y-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Sellers Management</h2>
      <Card><CardHeader><CardTitle>All Sellers</CardTitle></CardHeader><CardContent>
          <div className="flex justify-between items-center mb-4"><div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search sellers..." className="pl-9" />
            </div>
          </div><Table><TableHeader><TableRow>
                <TableHead>Seller ID</TableHead><TableHead>Name</TableHead>
                <TableHead>Email</TableHead><TableHead>Products</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader><TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.id}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.products}</TableCell>
                  <TableCell>
                    <Badge variant={seller.status === "Active" ? "default" : "secondary"}>
                      {seller.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger><DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateStatus(seller.id, "Active")}><Check className="mr-2 h-4 w-4" /> Activate</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(seller.id, "Inactive")}><X className="mr-2 h-4 w-4" /> Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
    </div>
  );
};

const AdminUsersContent = () => {
  const mockUsers = [
    { id: "U001", name: "John Doe", email: "john.doe@example.com", role: "Customer", status: "Active" },
    { id: "U002", name: "Jane Smith", email: "jane.smith@example.com", role: "Customer", status: "Active" },
    { id: "U003", name: "Sarah Connor", email: "sarah.connor@example.com", role: "Customer", status: "Inactive" },
  ];
  const [users, setUsers] = useState(mockUsers);
  const handleUpdateStatus = (userId, newStatus) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
  };
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  return (
    <div className="space-y-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
      <Card><CardHeader><CardTitle>All Users</CardTitle></CardHeader><CardContent>
          <div className="flex justify-between items-center mb-4"><div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search users..." className="pl-9" />
            </div>
          </div><Table><TableHeader><TableRow>
                <TableHead>User ID</TableHead><TableHead>Name</TableHead>
                <TableHead>Email</TableHead><TableHead>Role</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader><TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu><DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger><DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, "Active")}><Check className="mr-2 h-4 w-4" /> Activate</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, "Inactive")}><X className="mr-2 h-4 w-4" /> Deactivate</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}><Trash2 className="mr-2 h-4 w-4 text-red-500" /><span className="text-red-500">Delete</span></DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
    </div>
  );
};

const AdminReportsContent = () => {
  const monthlySalesData = [
    { name: "Jan", sales: 120000 }, { name: "Feb", sales: 150000 }, { name: "Mar", sales: 135000 },
    { name: "Apr", sales: 165000 }, { name: "May", sales: 190000 }, { name: "Jun", sales: 210000 },
    { name: "Jul", sales: 230000 }, { name: "Aug", sales: 205000 }, { name: "Sep", sales: 245000 },
    { name: "Oct", sales: 260000 }, { name: "Nov", sales: 280000 }, { name: "Dec", sales: 300000 },
  ];
  const topCategoriesData = [
    { name: "Fashion", revenue: 55000 }, { name: "Beauty", revenue: 42000 },
    { name: "Jewelry", revenue: 38000 }, { name: "Home Decor", revenue: 31000 },
  ];
  return (
    <div className="space-y-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div className="col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader><CardTitle>Total Sales Report</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className="col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader><CardTitle>Top Categories by Revenue</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCategoriesData}>
                    <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

//
// Main Admin Component with Sidebar
//
export default function AdminMainPage() {
  const location = useLocation();
  const sidebarLinks = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/banners", icon: Zap, label: "Banners" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/sellers", icon: Users, label: "Sellers" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/reports", icon: TrendingUp, label: "Reports" },
  ];
  const renderPageContent = () => {
    switch (location.pathname) {
      case "/admin/dashboard": return <AdminDashboardContent />;
      case "/admin/banners": return <AdminBannersContent />;
      case "/admin/orders": return <AdminOrdersContent />;
      case "/admin/sellers": return <AdminSellersContent />;
      case "/admin/users": return <AdminUsersContent />;
      case "/admin/reports": return <AdminReportsContent />;
      default: return <div className="p-8 text-center text-muted-foreground">Page not found.</div>;
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border p-4">
          <nav className="flex flex-col space-y-2">
            {sidebarLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Link to={link.href}>
                  <Button variant={location.pathname === link.href ? "default" : "ghost"} className="w-full justify-start">
                    <link.icon className="mr-2 h-4 w-4" />{link.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{renderPageContent()}</main>
      </div><Footer />
    </div>
  );
} 
