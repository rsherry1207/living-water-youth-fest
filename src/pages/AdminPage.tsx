import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Pencil, Trash2, Search, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  church: string;
  parent_name: string | null;
  parent_phone: string | null;
  parent_email: string | null;
  created_at: string;
}

const AdminPage = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingReg, setEditingReg] = useState<Registration | null>(null);
  const [deletingReg, setDeletingReg] = useState<Registration | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    } else if (!isLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchRegistrations();
    }
  }, [isAdmin]);

  const fetchRegistrations = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Error",
        description: "Failed to load registrations.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleEdit = (reg: Registration) => {
    setEditingReg({ ...reg });
  };

  const handleSave = async () => {
    if (!editingReg) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("registrations")
        .update({
          first_name: editingReg.first_name,
          last_name: editingReg.last_name,
          email: editingReg.email,
          phone_number: editingReg.phone_number,
          church: editingReg.church,
          parent_name: editingReg.parent_name,
          parent_phone: editingReg.parent_phone,
          parent_email: editingReg.parent_email,
        })
        .eq("id", editingReg.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Registration updated successfully.",
      });
      
      setEditingReg(null);
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating registration:", error);
      toast({
        title: "Error",
        description: "Failed to update registration.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingReg) return;

    try {
      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", deletingReg.id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Registration has been deleted.",
      });
      
      setDeletingReg(null);
      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const search = searchTerm.toLowerCase();
    return (
      reg.first_name.toLowerCase().includes(search) ||
      reg.last_name.toLowerCase().includes(search) ||
      reg.email.toLowerCase().includes(search) ||
      reg.church.toLowerCase().includes(search)
    );
  });

  if (isLoading || (!isAdmin && user)) {
    return (
      <div className="min-h-screen bg-ocean-dark flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sand-light" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-sand-light">
                Admin Dashboard
              </h1>
              <p className="text-sand/80 mt-1">
                Manage conference registrations
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-sand-light text-sand-light hover:bg-sand-light hover:text-ocean-dark"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or church..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={fetchRegistrations}
                variant="outline"
                disabled={loadingData}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loadingData ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              Total registrations: {filteredRegistrations.length}
            </div>

            {loadingData ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-ocean-medium" />
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No registrations found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Church</TableHead>
                      <TableHead>DOB</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">
                          {reg.first_name} {reg.last_name}
                        </TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone_number}</TableCell>
                        <TableCell>{reg.church}</TableCell>
                        <TableCell>
                          {new Date(reg.date_of_birth).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(reg.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(reg)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeletingReg(reg)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Edit Dialog */}
      <Dialog open={!!editingReg} onOpenChange={() => setEditingReg(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Registration</DialogTitle>
          </DialogHeader>
          {editingReg && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={editingReg.first_name}
                    onChange={(e) =>
                      setEditingReg({ ...editingReg, first_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={editingReg.last_name}
                    onChange={(e) =>
                      setEditingReg({ ...editingReg, last_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={editingReg.email}
                  onChange={(e) =>
                    setEditingReg({ ...editingReg, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={editingReg.phone_number}
                  onChange={(e) =>
                    setEditingReg({ ...editingReg, phone_number: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Church</label>
                <Input
                  value={editingReg.church}
                  onChange={(e) =>
                    setEditingReg({ ...editingReg, church: e.target.value })
                  }
                />
              </div>
              {editingReg.parent_name && (
                <>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Parent/Guardian Info
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Parent Name</label>
                    <Input
                      value={editingReg.parent_name || ""}
                      onChange={(e) =>
                        setEditingReg({ ...editingReg, parent_name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Parent Phone</label>
                    <Input
                      value={editingReg.parent_phone || ""}
                      onChange={(e) =>
                        setEditingReg({ ...editingReg, parent_phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Parent Email</label>
                    <Input
                      value={editingReg.parent_email || ""}
                      onChange={(e) =>
                        setEditingReg({ ...editingReg, parent_email: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingReg(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingReg} onOpenChange={() => setDeletingReg(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Registration?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the registration for{" "}
              <strong>
                {deletingReg?.first_name} {deletingReg?.last_name}
              </strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;
