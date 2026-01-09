import { Badge, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";
import Button from '@mui/material/Button';
import React from "react";
import { AccountVerificationForm } from "./AccountVerificationForm";
import { useSelector } from "react-redux";

export default function YourInformation() {
    // Access the auth state from the Redux store
    const auth = useSelector(store => store.auth);

    const [openDialog, setOpenDialog] = React.useState(null);

    const handleClickOpen = (type) => {
        setOpenDialog(type);
    };

    const handleClose = () => {
        setOpenDialog(null);
    };

    return (
        <div className="flex justify-center pt-10">
            <div className="w-full lg:w-[45%] space-y-6">

                {/* ================= YOUR INFORMATION CARD ================= */}
                <Card className="bg-transparent border border-gray-800 rounded-xl">
                    <CardContent>
                        <Typography variant="h5" className="text-white font-semibold mb-4">
                            Your Information
                        </Typography>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-lg">
                            {/* ==ERROR FIX: Pass auth as a prop to the child component== */}
                            <InfoColumn auth={auth} />
                            {/* <InfoColumn auth={auth} /> */}
                        </div>
                    </CardContent>
                </Card>

                {/* ================= 2 STEP VERIFICATION CARD ================= */}
                <Card className="bg-transparent border border-gray-800 rounded-xl ">
                    <CardContent className="flex items-center justify-start gap-4">
                        <Typography variant="h5" className="text-white font-medium">
                            2 Step Verification
                        </Typography>

                        <div className="flex items-center gap-3">
                            {/* ==DYNAMIC CHECK: Check if 2FA is enabled in the user object== */}
                            {auth.user?.twoFactorAuth?.enabled ? (
                                <Badge>
                                    <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white text-sm">
                                        <CheckCircle size={16} />
                                        Enabled
                                    </span>
                                </Badge>
                            ) : (
                                <Badge>
                                    <span className="px-3 py-1 rounded-md bg-orange-500 text-white text-sm">
                                        Disabled
                                    </span>
                                </Badge>
                            )}
                        </div>
                    </CardContent>

                    <CardContent>
                        <div>
                            <Button 
                                onClick={() => handleClickOpen("add")} 
                                variant="contained"
                                sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#ddd" } }}
                            >
                                Enable Two Step Verification
                            </Button>

                            <Dialog open={openDialog === "add"} onClose={handleClose} fullWidth maxWidth="sm">
                                <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}> 
                                    Verify your Account 
                                </DialogTitle>
                                <DialogContent>
                                    <AccountVerificationForm onClose={handleClose} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

// ==ERROR FIX: Accept auth as a parameter (Destructured Prop)==
function InfoColumn({ auth }) {
    return (
        <div className="space-y-5 mt-5">
            {/* ==ERROR FIX: Use optional chaining to prevent crashes if user is null== */}
            <InfoRow label="Email" value={auth.user?.email} />
            <InfoRow label="Full Name" value={auth.user?.fullName} />
            <InfoRow label="Date of Birth" value="25/09/1998" />
            <InfoRow label="Nationality" value="Indian" />
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex">
            <p className="w-[9rem] text-gray-300">{label} :</p>
            {/* ==DISPLAY: If value is missing, show a placeholder== */}
            <p className="text-gray-500">{value || "Not Provided"}</p>
        </div>
    );
}